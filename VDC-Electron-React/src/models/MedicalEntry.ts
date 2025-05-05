// Corresponds to Swagger definition models.MedicalEntry

export interface MedicalEntry {
  id: number;
  medical_record_id?: number; // Assuming this links to a broader record concept if needed
  pet_id?: number; // Added based on GET /entries query param, assuming it's part of the entry
  vet_id?: number;
  entry_date?: string; // Keep as string (ISO 8601 format expected)
  disease?: string;
  description?: string;
  recommendation?: string;
  vaccinations?: string; // Consider if this should be structured (e.g., string[])
  device_number?: number; // Assuming this relates to diagnostic equipment
}
