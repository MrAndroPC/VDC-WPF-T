// Define the shape of the APIs exposed via contextBridge in preload.ts
// This makes TypeScript aware of them in the renderer process (window object).

// Import necessary types used by the APIs
import { Pet } from './models/Pet';
import { MedicalEntry } from './models/MedicalEntry';
import { UserSession } from './models/UserSession';
import { PetOwner } from './models/PetOwner';
import { RegisterVetPayload, RegisterOwnerPayload } from './services/api';

declare global {
  interface Window {
    petAPI: {
      loadAll: () => Promise<Pet[]>;
      addPet: (data: { petData: Omit<Pet, 'id'>, ownerId: number }) => Promise<{ success: boolean; newId?: number; error?: string }>;
      updatePet: (id: number, petData: Partial<Pet>) => Promise<{ success: boolean; error?: string }>;
      getMedicalEntries: (petId: number, limit: number, offset: number) => Promise<MedicalEntry[]>;
      addMedicalEntry: (entryData: Omit<MedicalEntry, 'id'>) => Promise<{ success: boolean; newId?: number; error?: string }>;
      updateMedicalEntry: (id: number, entryData: Partial<MedicalEntry>) => Promise<{ success: boolean; error?: string }>;
      deleteMedicalEntry: (id: number) => Promise<{ success: boolean; error?: string }>;
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
