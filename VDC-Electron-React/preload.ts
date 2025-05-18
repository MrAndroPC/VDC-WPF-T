// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { Pet } from './src/models/Pet';
import { UserSession } from './src/models/UserSession';
import { PetOwner } from './src/models/PetOwner';
import { MedicalEntry } from 'src/models/MedicalEntry';
import { RegisterVetPayload, RegisterOwnerPayload } from './src/services/api';

export interface IPetAPI {
  loadAll: () => Promise<Pet[]>;
  addPet: (data: { petData: Omit<Pet, 'id'>, ownerId: number }) => Promise<{ success: boolean; newId?: number; error?: string }>;
  updatePet: (id: number, petData: Partial<Pet>) => Promise<{ success: boolean; error?: string }>;
  getMedicalEntries: (petId: number, limit: number, offset: number) => Promise<MedicalEntry[]>;
  addMedicalEntry: (entryData: Omit<MedicalEntry, 'id'>) => Promise<{ success: boolean; newId?: number; error?: string }>;
  updateMedicalEntry: (id: number, entryData: Partial<MedicalEntry>) => Promise<{ success: boolean; error?: string }>;
  deleteMedicalEntry: (id: number) => Promise<{ success: boolean; error?: string }>;
}

export interface IOwnerAPI {
  getAll: () => Promise<PetOwner[]>;
  register: (payload: RegisterOwnerPayload) => Promise<{ success: boolean; owner?: PetOwner; error?: string }>;
}

export interface ISessionAPI {
  getCurrentUser: () => Promise<UserSession | null>;
  login: (credentials: { email: string, password: string }) => Promise<UserSession | null>;
  registerVet: (payload: RegisterVetPayload) => Promise<UserSession | null>;
  clearCurrentUser: () => Promise<{ success: boolean; error?: string }>;
}

contextBridge.exposeInMainWorld('petAPI', {
  loadAll: (): Promise<Pet[]> => ipcRenderer.invoke('load-all-pets'),
  addPet: (data: { petData: Omit<Pet, 'id'>, ownerId: number }): Promise<{ success: boolean; newId?: number; error?: string }> => ipcRenderer.invoke('add-pet', data),
  updatePet: (id: number, petData: Partial<Pet>): Promise<{ success: boolean; error?: string }> => ipcRenderer.invoke('update-pet', { id, petData }),
  getMedicalEntries: (petId: number, limit: number, offset: number): Promise<MedicalEntry[]> => ipcRenderer.invoke('get-medical-entries', { petId, limit, offset }),
  addMedicalEntry: (entryData: Omit<MedicalEntry, 'id'>): Promise<{ success: boolean; newId?: number; error?: string }> => ipcRenderer.invoke('add-medical-entry', entryData),
  updateMedicalEntry: (id: number, entryData: Partial<MedicalEntry>): Promise<{ success: boolean; error?: string }> => ipcRenderer.invoke('update-medical-entry', { id, entryData }),
  deleteMedicalEntry: (id: number): Promise<{ success: boolean; error?: string }> => ipcRenderer.invoke('delete-medical-entry', id),
} as IPetAPI);

contextBridge.exposeInMainWorld('ownerAPI', {
  getAll: (): Promise<PetOwner[]> => ipcRenderer.invoke('get-all-owners'),
  register: (payload: RegisterOwnerPayload): Promise<{ success: boolean; owner?: PetOwner; error?: string }> => ipcRenderer.invoke('register-owner', payload),
} as IOwnerAPI);

contextBridge.exposeInMainWorld('sessionAPI', {
  getCurrentUser: (): Promise<UserSession | null> => ipcRenderer.invoke('get-current-user'),
  login: (credentials: { email: string, password: string }): Promise<UserSession | null> => ipcRenderer.invoke('login', credentials),
  registerVet: (payload: RegisterVetPayload): Promise<UserSession | null> => ipcRenderer.invoke('register-vet', payload),
  clearCurrentUser: (): Promise<{ success: boolean; error?: string }> => ipcRenderer.invoke('clear-current-user'),
} as ISessionAPI);


console.log('Preload script loaded and APIs (petAPI, ownerAPI, sessionAPI) exposed.');
