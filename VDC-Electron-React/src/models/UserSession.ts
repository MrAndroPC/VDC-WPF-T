// Corresponds to the original Utilities/UserSession.cs
import { Vet } from './Vet'; // Import the base Vet interface

export interface UserSession extends Vet {
  // Inherits id, fullname, email, phone, clinic_number, position, picSource from Vet
  token?: string;
}
