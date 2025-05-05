import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './PetPage.module.scss'; // Import styles
import { Pet } from '../models/Pet'; // Import Pet type

const PetPage: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate(); // Hook for navigation
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetData = async () => {
      setIsLoading(true);
      setError(null);
      if (!petId) {
        setError("Pet ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        // Fetch all pets and filter (or use a dedicated get-by-id IPC later)
        const allPets = await window.petAPI.loadAll();
        const foundPet = allPets.find(p => p.id === parseInt(petId, 10)); // Ensure ID is number

        if (foundPet) {
          setPet(foundPet);
        } else {
          setError(`Pet with ID ${petId} not found.`);
        }
      } catch (err) {
        console.error("Failed to fetch pet data:", err);
        setError(err instanceof Error ? err.message : 'Failed to load pet details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetData();
  }, [petId]); // Re-run effect if petId changes

  const handleBack = () => {
    navigate(-1); // Go back to the previous page (usually MainPage)
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading pet details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!pet) {
    // Should be covered by error state, but as a fallback
    return <div className={styles.error}>Pet data not available.</div>;
  }

  // Render Pet Details
  return (
    <div className={styles.pageContainer}>
       <button onClick={handleBack} className={styles.backButton}>&larr; Назад</button>
       <div className={styles.petDetailsGrid}>
         {/* Left Column: Image and Basic Info */}
         <div className={styles.leftColumn}>
           <div
             className={styles.petImage}
             style={{ backgroundImage: `url(${pet.picSource || ''})` }} // Placeholder if no image
           ></div>
           <h1 className={styles.petName}>{pet.name}</h1>
           <div className={styles.basicInfo}>
             {pet.animal_type} - {pet.breed} <br /> {/* Use animal_type */}
             {pet.gender}, {pet.age} <br />        {/* Use gender */}
             {pet.weight && <>Вес: {pet.weight}<br /></>}
             {pet.num_mic && <>Микрочип: {pet.num_mic}</>}
           </div>
         </div>

         {/* Right Column: Detailed Sections */}
         <div className={styles.rightColumn}>
           {/* Example: General Info Section */}
           <div className={styles.detailSection}>
              <h2 className={styles.sectionTitle}>Основная информация</h2>
              <p className={styles.detailItem}><strong>ID:</strong> {pet.id}</p>
              <p className={styles.detailItem}><strong>Имя:</strong> {pet.name}</p>
              <p className={styles.detailItem}><strong>Вид:</strong> {pet.animal_type}</p> {/* Use animal_type */}
              <p className={styles.detailItem}><strong>Порода:</strong> {pet.breed}</p>
              <p className={styles.detailItem}><strong>Пол:</strong> {pet.gender}</p>      {/* Use gender */}
              <p className={styles.detailItem}><strong>Возраст:</strong> {pet.age}</p>
              {pet.weight && <p className={styles.detailItem}><strong>Вес:</strong> {pet.weight}</p>}
              {pet.num_mic && <p className={styles.detailItem}><strong>№ Микрочипа:</strong> {pet.num_mic}</p>}
              {pet.contacts && <p className={styles.detailItem}><strong>Контакты владельца:</strong> {pet.contacts}</p>}
           </div>

           {/* Placeholder Sections for other details */}
           {pet.history && (
             <div className={styles.detailSection}>
               <h2 className={styles.sectionTitle}>История болезни</h2>
               <p>{pet.history}</p>
             </div>
           )}
           {pet.healthState && (
              <div className={styles.detailSection}>
                <h2 className={styles.sectionTitle}>Состояние здоровья</h2>
                <p>{pet.healthState}</p>
                {/* Here you might render lists from PetHealthState if available */}
              </div>
           )}
            {pet.diagnostic && (
              <div className={styles.detailSection}>
                <h2 className={styles.sectionTitle}>Диагностика</h2>
                <p>{pet.diagnostic}</p>
              </div>
           )}
           {pet.treatmentPlan && (
             <div className={styles.detailSection}>
               <h2 className={styles.sectionTitle}>План лечения</h2>
               <p>{pet.treatmentPlan}</p>
                {/* Here you might render TreatmentRecords if available */}
             </div>
           )}
           {/* Add more sections as needed based on PetHealthState, PetTreatmentPlan etc. */}
         </div>
       </div>
    </div>
  );
};

export default PetPage;
