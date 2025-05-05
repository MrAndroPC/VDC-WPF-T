// Define the shape of the APIs exposed via contextBridge in preload.ts
// This makes TypeScript aware of them in the renderer process (window object).

// Import necessary types used by the APIs
import { Pet } from './models/Pet';
import { UserSession } from './models/UserSession';
import { PetOwner } from './models/PetOwner';
import { RegisterVetPayload, RegisterOwnerPayload } from './services/api';

declare global {
  interface Window {
    petAPI: {
      loadAll: () => Promise<Pet[]>;
      addPet: (data: { petData: Omit<Pet, 'id'>, ownerId: number }) => Promise<{ success: boolean; newId?: number; error?: string }>; // Update signature
      // TODO: Add updatePet, deletePet, getPetById, getMedicalEntries, addMedicalEntry signatures later
    };
    ownerAPI: {
      getAll: () => Promise<PetOwner[]>;
      register: (payload: RegisterOwnerPayload) => Promise<{ success: boolean; owner?: PetOwner; error?: string }>;
    };
    sessionAPI: {
      getCurrentUser: () => Promise<UserSession | null>;
      login: (credentials: { email: string, password: string }) => Promise<UserSession | null>;
      registerVet: (payload: RegisterVetPayload) => Promise<UserSession | null>;
      clearCurrentUser: () => Promise<{ success: boolean; error?: string }>;
    };
  }
}

export {};
