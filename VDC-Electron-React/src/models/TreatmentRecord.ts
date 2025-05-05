// Corresponds to the original Model/TreatmentRecord.cs

export interface TreatmentRecord {
  date: string; // Changed from DateTime to string (can be ISO 8601 format)
  type: string;
  description: string;
}
