// Corresponds to the original Model/PetOwner.cs and Swagger definition models.Owner

export interface PetOwner {
  id: number;
  fullname: string; // From backend
  email?: string;
  phone?: string;
  // password field from backend DTO is omitted
}
