// Service layer for interacting with backend APIs

import { UserSession } from '../models/UserSession';
import { Pet } from '../models/Pet';
import { PetOwner } from '../models/PetOwner'; // Import PetOwner
// Import other models like Vet, MedicalEntry as needed for request/response types

const AUTH_BASE_URL = 'http://localhost:8083'; // Auth service URL
const INFO_BASE_URL = 'http://localhost:8081'; // Info service URL

// Helper function to handle fetch requests and errors
async function handleFetch(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // Attempt to parse error response from backend
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // Ignore if error response is not JSON
      }
      const errorMessage = errorData?.message || `HTTP error! status: ${response.status}`;
      console.error(`API Error (${url}): ${errorMessage}`, errorData);
      throw new Error(errorMessage);
    }
    // Handle cases where response might be empty (e.g., 204 No Content)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    } else {
      return null; // Or handle text/other responses if needed
    }
  } catch (error) {
    console.error(`Network or Fetch Error (${url}):`, error);
    // Re-throw the error to be caught by the caller
    throw error;
  }
}

// --- Auth Service Calls ---

interface SignInResponse {
  token: string;
  // Add other user details if returned by sign-in, otherwise fetch separately
}

export async function signIn(email: string, password: string): Promise<SignInResponse> {
  const url = `${AUTH_BASE_URL}/auth/v1/sign-in`;
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Backend requires id, fullname, phone even if only email/password are used
    body: JSON.stringify({ email, password, id: 1, fullname: "", phone: "" }),
  };
  return handleFetch(url, options);
}

// Define Vet registration payload type based on Swagger models.Vet
export interface RegisterVetPayload {
    fullname: string;
    email: string;
    password: string;
    phone?: string;
    clinic_number?: string;
    position?: string;
}

export async function registerVet(payload: RegisterVetPayload): Promise<SignInResponse> { // Assuming registration returns a token
    const url = `${AUTH_BASE_URL}/auth/v1/sign-up/vet`;
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };
    return handleFetch(url, options);
}

// TODO: Add function to get Vet details by ID/token if needed after login/registration

// Define Owner registration payload type based on Swagger models.Owner
export interface RegisterOwnerPayload {
    fullname: string;
    email: string;
    password?: string; // Assuming password needed for owner signup too
    phone?: string;
}

export async function registerOwner(payload: RegisterOwnerPayload): Promise<SignInResponse> { // registration returns a token
    const url = `${AUTH_BASE_URL}/auth/v1/sign-up/owner`;
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };
    return handleFetch(url, options);
}

// Function to get all owners (needs token)
// TODO: Add pagination parameters (offset, limit)
export async function getAllOwners(token: string): Promise<PetOwner[]> { // PetOwner model matches backend
    const url = `${AUTH_BASE_URL}/auth/v1/owner`;
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    // API returns an array of PetOwner objects directly
    return handleFetch(url, options);
}


// --- Info Service Calls ---

// structure for GET /pets response based on Swagger OutputPetDTO
interface GetPetsResponseItem {
    owner_id: number;
    pet_info: Pet;
    vet_id: number;
}

// Function to get all pets (needs token)
// TODO: Add pagination parameters (offset, limit)
export async function getAllPets(token: string): Promise<Pet[]> {
    const url = `${INFO_BASE_URL}/info/v1/pets`;
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const responseData: GetPetsResponseItem[] = await handleFetch(url, options);
    // Extract just pet_info part
    return responseData ? responseData.map(item => item.pet_info) : [];
}

// DTO for creating a pet based on Swagger handlers.createPetDTO
interface CreatePetPayloadDTO {
    name: string;
    animal_type: string;
    gender: string;
    age: number;
    weight?: number;
    behavior?: string;
    condition?: string;
    research_status?: string;
    owner_id: number;
    vet_id: number;
    // breed?: string;
}

// Function to create a new pet (needs token)
export async function createPet(token: string, payload: CreatePetPayloadDTO): Promise<{ id: number }> {
    const url = `${INFO_BASE_URL}/info/v1/pets`;
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    return handleFetch(url, options);
}


// TODO: Add functions for updatePet, deletePet, getPetById, getMedicalEntries, createMedicalEntry etc.
// These will require the auth token in the header.
