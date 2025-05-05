// Corresponds to the original Model/Vet.cs and Swagger definition models.Vet

export interface Vet {
  id: number;
  fullname: string; // From backend
  email?: string;
  phone?: string;
  clinic_number?: string; // From backend (maps to original 'hospital')
  position?: string;      // From backend (maps to original 'role')
  // password field is in backend DTO but likely not needed in frontend model after login
  // picSource is not in backend DTO, keep if needed for UI state?
  picSource?: string;
}
