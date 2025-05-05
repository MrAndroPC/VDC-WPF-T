// Corresponds to the original Model/Pet.cs and Swagger definition models.Pet

export interface Pet {
  // Fields from backend models.Pet
  id: number;
  name: string;
  animal_type: string; // From backend (maps to original 'type')
  gender: string;      // From backend (maps to original 'sex')
  age: number;         // Changed to number
  weight?: number;     // Changed to number, optional
  behavior?: string;   // New from backend, optional
  condition?: string;  // New from backend, optional
  research_status?: string; // New from backend, optional

  // Fields kept from original frontend model (might be populated differently now)
  breed: string;       // Kept from original, not in backend Pet model? Check OutputPetDTO or other sources. Assuming needed for display.
  contacts?: string;   // Kept from original, optional
  picSource?: string;  // Kept from original, optional
  history?: string;    // Kept from original, optional (May relate to MedicalEntry)
  healthState?: string;// Kept from original, optional (May relate to MedicalEntry)
  diagnostic?: string; // Kept from original, optional (May relate to MedicalEntry)
  treatmentPlan?: string; // Kept from original, optional (May relate to MedicalEntry)
  num_mic?: string;    // Kept from original, optional
}

// Compatibility aliases removed. Components should use animal_type and gender directly.
// --- Implementation for Compatibility Aliases (if used) ---
// This requires changing the interface to a class or using prototype manipulation.
// Simpler approach for now: Update components directly to use new field names.
// If aliases are strongly desired, we'd need a class implementation:
/*
export class PetClass implements Pet {
  id: number;
  name: string;
  animal_type: string;
  gender: string;
  age: number;
  breed: string;
  weight?: number;
  behavior?: string;
  condition?: string;
  research_status?: string;
  contacts?: string;
  picSource?: string;
  history?: string;
  healthState?: string;
  diagnostic?: string;
  treatmentPlan?: string;
  num_mic?: string;

  constructor(data: Partial<Pet>) {
    // Initialize properties...
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
    this.animal_type = data.animal_type ?? data.type ?? ''; // Handle mapping
    this.gender = data.gender ?? data.sex ?? ''; // Handle mapping
    this.age = typeof data.age === 'string' ? parseInt(data.age, 10) : data.age ?? 0; // Handle potential string age
    this.breed = data.breed ?? '';
    // ... initialize other properties
  }

  get type(): string { return this.animal_type; }
  set type(value: string) { this.animal_type = value; }
  get sex(): string { return this.gender; }
  set sex(value: string) { this.gender = value; }
}
*/
// For now, we'll stick with the interface and update components directly.
