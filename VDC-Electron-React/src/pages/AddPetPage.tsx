import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddPetPage.module.scss';
import { Pet } from '../models/Pet';
import { PetOwner } from '../models/PetOwner'; // Import PetOwner
import OwnerSelection from '../components/OwnerSelection'; // Import OwnerSelection component

const AddPetPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState(''); // Will map to animal_type
  const [sex, setSex] = useState('');   // Will map to gender
  const [age, setAge] = useState<number | ''>('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState<number | ''>('');
  const [selectedOwner, setSelectedOwner] = useState<PetOwner | null>(null); // State for selected owner
  // Add state for other Pet fields as needed (picSource, contacts, etc.)
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Basic validation including owner selection
      if (!selectedOwner) {
        throw new Error("Please select or add an owner.");
      }
      if (!name || !type || !sex || age === '' || !breed) {
        throw new Error("Please fill in all required pet fields.");
      }
      const ageNumber = Number(age);
      if (isNaN(ageNumber) || ageNumber < 0) {
        throw new Error("Age must be a valid non-negative number.");
      }
      const weightNumber = weight === '' ? undefined : Number(weight);
      if (weightNumber !== undefined && (isNaN(weightNumber) || weightNumber < 0)) {
         throw new Error("Weight must be a valid non-negative number if provided.");
      }


      // 1. Get current pets to determine the next ID
      const currentPets = await window.petAPI.loadAll();
      // Simple ID generation (replace with better method if needed, e.g., UUID)
      const nextId = currentPets.length > 0 ? Math.max(...currentPets.map(p => p.id)) + 1 : 1;

      // 2. Create new pet object
      // 2. Create new pet object, mapping fields
      const newPet: Omit<Pet, 'type' | 'sex'> & { animal_type: string; gender: string; age: number; weight?: number } = { // Use Omit if aliases are not implemented
        id: nextId,
        name,
        animal_type: type, // Map state 'type' to 'animal_type'
        gender: sex,       // Map state 'sex' to 'gender'
        age: ageNumber,    // Use validated number
        breed,
        weight: weightNumber, // Use validated number or undefined
        // Add other fields here (behavior, condition, research_status, contacts, picSource, num_mic etc.)
      };

      // 3. Add new pet to the list
      // 3. Call the addPet API
      // Call the addPet API, passing the required structure
      const result = await window.petAPI.addPet({ petData: newPet, ownerId: selectedOwner.id });

      if (result.success) {
        console.log(`Pet added successfully with mock ID: ${result.newId}`);
        navigate('/'); // Navigate back to main page on success
      } else {
        throw new Error(result.error || 'Failed to add pet data.');
      }

    } catch (err) {
      console.error("Failed to add pet:", err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Добавить нового пациента</h1>
      <form className={styles.form} onSubmit={handleSubmit}>

        {/* Owner Selection Component */}
        <div className={styles.inputGroup}>
           <label className={styles.label}>Владелец:</label>
           <OwnerSelection selectedOwner={selectedOwner} onOwnerSelect={setSelectedOwner} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Имя:</label>
          <input
            type="text"
            id="name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="type" className={styles.label}>Вид:</label>
          <input
            type="text"
            id="type"
            className={styles.input}
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="sex" className={styles.label}>Пол:</label>
          {/* Consider using a select dropdown for Sex */}
          <input
            type="text"
            id="sex"
            className={styles.input}
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
            disabled={isLoading}
          />
          {/* Example Select:
          <select id="sex" className={styles.select} value={sex} onChange={(e) => setSex(e.target.value)} required disabled={isLoading}>
            <option value="">-- Выберите пол --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          */}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="age" className={styles.label}>Возраст:</label>
          <input
            type="number" // Change type to number
            id="age"
            className={styles.input}
            value={age}
            onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))} // Handle empty string and convert to number
            min="0" // Prevent negative numbers
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="breed" className={styles.label}>Порода:</label>
          <input
            type="text"
            id="breed"
            className={styles.input}
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {/* Add input groups for other Pet fields */}
        <div className={styles.inputGroup}>
          <label htmlFor="weight" className={styles.label}>Вес (кг):</label>
          <input
            type="number"
            id="weight"
            className={styles.input}
            value={weight}
            onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
            min="0"
            step="0.1" // Allow decimals for weight
            disabled={isLoading}
          />
        </div>
        {/* Add more inputs for contacts, picSource, num_mic, behavior, condition, research_status as needed */}


        {error && <p className={styles.errorMessage}>{error}</p>}

        {/* Add Button Row */}
        <div className={styles.buttonRow}>
           <button type="button" className={styles.cancelButton} onClick={() => navigate(-1)} disabled={isLoading}>
            Отмена
           </button>
           <button
             type="submit"
             className={styles.addButton}
             disabled={isLoading || !selectedOwner} // Disable if loading OR no owner selected
             title={!selectedOwner ? "Пожалуйста, выберите владельца" : undefined} // Add tooltip
           >
             {isLoading ? 'Добавление...' : 'Добавить пациента'}
           </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetPage;
