import { app, BrowserWindow, ipcMain } from 'electron'; // Import ipcMain
import path from 'path';
import Store from 'electron-store';
import { Pet } from './src/models/Pet';
import { UserSession } from './src/models/UserSession';
import { PetOwner } from './src/models/PetOwner';
import { signIn, registerVet, getAllPets, RegisterVetPayload, getAllOwners, registerOwner, RegisterOwnerPayload, createPet } from './src/services/api'; // Added createPet import
import { jwtDecode } from 'jwt-decode';

// schema for the store - only currentUser is needed now
const schema = {
  currentUser: {
    type: ['object', 'null'],
    properties: {
      id: { type: 'number' },
      fullname: { type: 'string' },
      email: { type: 'string' },
      token: { type: 'string' },
      position: { type: 'string' },
      clinic_number: { type: 'string' },
      phone: { type: 'string' },
      // picSource is optional and might not be stored
    },
    default: null
  }
} as const;

// type for the store data - only currentUser
interface StoreType {
  currentUser: UserSession | null;
}

// expected structure of the JWT payload
interface JwtPayload {
  exp: number;
  iat: number;
  UserId: number;
  FullName: string;
  Role: number; // 1 is for Vet
}

const store = new Store<StoreType>({ schema });

function createWindow() {
    const mainWindow = new BrowserWindow({
    width: 1440,
    height: 1024,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the index.html of the app.
  // In development, load from Vite dev server. In production, load the built file.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173'); // Default Vite port
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    // 'build/index.html' assumes Vite builds into a 'build' directory in the root
    // Note: Vite builds into 'dist/renderer' by default with our setup, Electron main/preload into 'dist'
    // Adjust path if needed based on actual build output structure
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html')); // Adjusted path assuming renderer builds into 'dist/renderer'
  }

  mainWindow.setMenuBarVisibility(false);
  mainWindow.maximize();
}

app.whenReady().then(() => {
  createWindow();

  // --- IPC Handlers for Pet Data (using API service) ---
  ipcMain.handle('load-all-pets', async (): Promise<Pet[]> => {
    const currentUser = store.get('currentUser');
    if (!currentUser?.token) {
      console.error('load-all-pets: No token found.');
      throw new Error('User not authenticated.'); // Throw error to be caught by renderer
    }
    try {
      // TODO: Add pagination/filtering parameters if needed by API/UI
      const pets = await getAllPets(currentUser.token);
      return pets;
    } catch (error) {
      console.error('Failed to load pets via API:', error);
      throw error; // Re-throw to let preload script handle promise rejection
    }
  });

  ipcMain.handle('add-pet', async (event, { petData, ownerId }: { petData: Omit<Pet, 'id'>, ownerId: number }) => {
    const currentUser = store.get('currentUser');
    if (!currentUser?.token || !currentUser?.id) {
       console.error('add-pet: No token or user ID found.');
       return { success: false, error: 'User not authenticated.' };
    }
    try {
      const vetId = currentUser.id;

      // Construct the payload for the createPet API call
      // Ensure property names match CreatePetPayloadDTO in api.ts
      const payload = {
        ...petData, // Spread fields like name, age, weight, etc.
        animal_type: petData.animal_type, // Explicitly map if names differ
        gender: petData.gender,
        owner_id: ownerId, // Use ownerId passed from renderer
        vet_id: vetId,
        // Add breed if it's part of the DTO
      };

      // Call the actual API service function
      const result = await createPet(currentUser.token, payload); // Assuming createPet returns { id: number }

      console.log('Pet created via API with ID:', result.id);
      return { success: true, newId: result.id }; // Return success and the real ID

    } catch (error) {
      console.error('Failed to add pet via API:', error);
      const message = error instanceof Error ? error.message : String(error);
      return { success: false, error: message };
    }
  });

  // TODO: Add handlers for update-pet, delete-pet, get-pet-by-id, get-medical-entries, add-medical-entry etc. using API calls

  // --- End Pet Data IPC Handlers ---


  // --- IPC Handlers for Session Data (using API service + store for persistence) ---
  ipcMain.handle('get-current-user', async (): Promise<UserSession | null> => {
    // Reads from store
    const userData = store.get('currentUser');
    if (typeof userData === 'object' && userData !== null) {
       return userData as UserSession;
    }
    return null;
  });

  ipcMain.handle('login', async (event, { email, password }: { email: string, password: string }): Promise<UserSession | null> => {
    try {
      const response = await signIn(email, password);
      const token = response.token;
      const decodedPayload = jwtDecode<JwtPayload>(token);

      const userSession: UserSession = {
        id: decodedPayload.UserId,
        fullname: decodedPayload.FullName,
        email: email, // email is not in token, used the one provided for login
        token: token,
        position: decodedPayload.Role === 1 ? 'Vet' : undefined,
        clinic_number: undefined, // Not in token
        phone: undefined, // Not in token
        picSource: undefined, // Not in token
      };

      store.set('currentUser', userSession); // Persist the full session
      return userSession; // Return session to renderer
    } catch (error) {
      console.error('Failed to login via API:', error);
      store.set('currentUser', null); // Clear session on login failure
      throw error;
    }
  });

   ipcMain.handle('register-vet', async (event, payload: RegisterVetPayload): Promise<UserSession | null> => {
     try {
       // Ensure password is included in the payload if required by API
       const response = await registerVet(payload); // Call API service
       const token = response.token;
       const decodedPayload = jwtDecode<JwtPayload>(token);

       const userSession: UserSession = {
         id: decodedPayload.UserId,
         fullname: payload.fullname,
         email: payload.email,
         token: token,
         position: payload.position,
         clinic_number: payload.clinic_number,
         phone: payload.phone,
         picSource: undefined, // not available from backend
       };

       store.set('currentUser', userSession); // Persist session
       return userSession; // Return session to renderer
     } catch (error) {
       console.error('Failed to register vet via API:', error);
       store.set('currentUser', null); // Clear session on registration failure
       throw error;
     }
  });


  ipcMain.handle('clear-current-user', async () => {
     try {
      store.set('currentUser', null);
      return { success: true };
    } catch (error) {
      console.error('Failed to clear current user:', error);
      const message = error instanceof Error ? error.message : String(error);
      return { success: false, error: message };
    }
  });
  // --- End Session Data IPC Handlers ---


  // --- IPC Handlers for Owner Data ---
  ipcMain.handle('get-all-owners', async (): Promise<PetOwner[]> => {
    const currentUser = store.get('currentUser');
    if (!currentUser?.token) {
      console.error('get-all-owners: No token found.');
      throw new Error('User not authenticated.');
    }
    try {
      // TODO: Add pagination/filtering parameters if needed
      const owners = await getAllOwners(currentUser.token);
      return owners;
    } catch (error) {
      console.error('Failed to load owners via API:', error);
      throw error;
    }
  });

  ipcMain.handle('register-owner', async (event, payload: RegisterOwnerPayload): Promise<{ success: boolean; owner?: PetOwner; error?: string }> => {
    const currentUser = store.get('currentUser'); // Need token for auth? API spec doesn't show security for owner signup. Assuming not needed.
    // if (!currentUser?.token) {
    //   console.error('register-owner: No token found.');
    //   return { success: false, error: 'User not authenticated.' };
    // }
    try {
      // Assuming registerOwner returns the token, but we might need the created owner object instead.
      // Let's modify the expected return or add another API call if necessary.
      // For now, assume it returns the token and we decode it to get ID/Name.
      const response = await registerOwner(payload);
      const token = response.token; // Assuming token is returned
      const decoded = jwtDecode<{ UserId: number; FullName: string }>(token); // Assuming similar payload

      // Construct PetOwner object (might need adjustment based on actual API response)
      const newOwner: PetOwner = {
        id: decoded.UserId,
        fullname: payload.fullname, // Use payload fullname as it's likely correct
        email: payload.email,
        phone: payload.phone,
      };
      return { success: true, owner: newOwner }; // Return the created owner object
    } catch (error) {
      console.error('Failed to register owner via API:', error);
      const message = error instanceof Error ? error.message : String(error);
      return { success: false, error: message };
    }
  });
  // --- End Owner Data IPC Handlers ---


  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// For example, setting up IPC handlers.
