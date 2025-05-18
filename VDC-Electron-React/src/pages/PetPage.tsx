import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PetPage.module.scss';
import { Pet } from '../models/Pet';
import { MedicalEntry } from 'src/models/MedicalEntry';
import { debounce } from 'lodash';

const PetPage: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate(); // Hook for navigation
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPet, setEditedPet] = useState<Partial<Pet>>({});
  const [entries, setEntries] = useState<MedicalEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntry, setNewEntry] = useState<Omit<MedicalEntry, 'id'>>({
    pet_id: petId ? parseInt(petId) : 0,
    entry_date: new Date().toISOString().split('T')[0],
    disease: '',
    description: '',
    vaccinations: '',
    recommendation: ''
  });
  const entriesEndRef = useRef<HTMLDivElement>(null);

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

  const handleEditClick = () => {
    if (pet) {
      setEditedPet({...pet});
      setIsEditing(true);
    }
  };

  const handleSaveClick = async () => {
    if (!pet?.id) return;
    
    try {
      const { success } = await window.petAPI.updatePet(pet.id, editedPet);
      if (success) {
        setPet({...pet, ...editedPet});
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to update pet:", err);
      setError(err instanceof Error ? err.message : 'Failed to update pet');
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedPet({});
  };

  const fetchEntries = useCallback(async (page: number) => {
    if (!petId || entriesLoading) return;
    
    setEntriesLoading(true);
    try {
      const newEntries = await window.petAPI.getMedicalEntries(
        parseInt(petId, 10),
        20,
        page * 20
      );
      setEntries(prev => page === 0 ? newEntries : [...prev, ...newEntries]);
      setHasMore(newEntries.length === 20);
      setCurrentPage(page);
    } catch (err) {
      console.error("Failed to fetch medical entries:", err);
    } finally {
      setEntriesLoading(false);
    }
  }, [petId, entriesLoading]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        entriesEndRef.current && 
        window.innerHeight + window.scrollY >= entriesEndRef.current.offsetTop - 500 &&
        hasMore && 
        !entriesLoading
      ) {
        fetchEntries(currentPage + 1);
      }
    }, 300);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, hasMore, entriesLoading, fetchEntries]);

  const handleFieldChange = (field: keyof Pet, value: string | number) => {
    setEditedPet(prev => ({...prev, [field]: value}));
  };

  const handleEntryFieldChange = (field: keyof Omit<MedicalEntry, 'id'>, value: string) => {
    setNewEntry(prev => ({...prev, [field]: value}));
  };

  const handleAddEntry = async () => {
    if (!petId) return;
    
    try {
      const { success, newId } = await window.petAPI.addMedicalEntry(newEntry);
      if (success) {
        setShowAddEntry(false);
        setNewEntry({
          pet_id: parseInt(petId),
          entry_date: new Date().toISOString().split('T')[0],
          disease: '',
          description: '',
          vaccinations: '',
          recommendation: ''
        });
        // Refresh entries
        setCurrentPage(0);
        fetchEntries(0);
      }
    } catch (err) {
      console.error("Failed to add medical entry:", err);
      setError(err instanceof Error ? err.message : 'Failed to add entry');
    }
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
           {/* General Info Section */}
           <div className={styles.detailSection}>
             <div className={styles.sectionHeader}>
               <h2 className={styles.sectionTitle}>Основная информация</h2>
               {!isEditing ? (
                 <button onClick={handleEditClick} className={styles.editButton}>
                   Редактировать
                 </button>
               ) : (
                 <div className={styles.editButtons}>
                   <button onClick={handleSaveClick} className={styles.saveButton}>
                     Сохранить
                   </button>
                   <button onClick={handleCancelClick} className={styles.cancelButton}>
                     Отмена
                   </button>
                 </div>
               )}
             </div>
             
             {isEditing ? (
               <div className={styles.editForm}>
                 <div className={styles.formRow}>
                   <label>Имя:</label>
                   <input
                     type="text"
                     value={editedPet.name || ''}
                     onChange={(e) => handleFieldChange('name', e.target.value)}
                   />
                 </div>
                 <div className={styles.formRow}>
                   <label>Вид:</label>
                   <input
                     type="text"
                     value={editedPet.animal_type || ''}
                     onChange={(e) => handleFieldChange('animal_type', e.target.value)}
                   />
                 </div>
                 <div className={styles.formRow}>
                   <label>Порода:</label>
                   <input
                     type="text"
                     value={editedPet.breed || ''}
                     onChange={(e) => handleFieldChange('breed', e.target.value)}
                   />
                 </div>
                 <div className={styles.formRow}>
                   <label>Пол:</label>
                   <input
                     type="text"
                     value={editedPet.gender || ''}
                     onChange={(e) => handleFieldChange('gender', e.target.value)}
                   />
                 </div>
                 <div className={styles.formRow}>
                   <label>Возраст:</label>
                   <input
                     type="number"
                     value={editedPet.age || ''}
                     onChange={(e) => handleFieldChange('age', parseInt(e.target.value) || 0)}
                   />
                 </div>
                 <div className={styles.formRow}>
                   <label>Вес:</label>
                   <input
                     type="number"
                     value={editedPet.weight || ''}
                     onChange={(e) => handleFieldChange('weight', parseFloat(e.target.value) || 0)}
                   />
                 </div>
                 <div className={styles.formRow}>
                   <label>№ Микрочипа:</label>
                   <input
                     type="text"
                     value={editedPet.num_mic || ''}
                     onChange={(e) => handleFieldChange('num_mic', e.target.value)}
                   />
                 </div>
                 <div className={styles.formRow}>
                   <label>Контакты владельца:</label>
                   <input
                     type="text"
                     value={editedPet.contacts || ''}
                     onChange={(e) => handleFieldChange('contacts', e.target.value)}
                   />
                 </div>
               </div>
             ) : (
               <>
                 <p className={styles.detailItem}><strong>ID:</strong> {pet.id}</p>
                 <p className={styles.detailItem}><strong>Имя:</strong> {pet.name}</p>
                 <p className={styles.detailItem}><strong>Вид:</strong> {pet.animal_type}</p>
                 <p className={styles.detailItem}><strong>Порода:</strong> {pet.breed}</p>
                 <p className={styles.detailItem}><strong>Пол:</strong> {pet.gender}</p>
                 <p className={styles.detailItem}><strong>Возраст:</strong> {pet.age}</p>
                 {pet.weight && <p className={styles.detailItem}><strong>Вес:</strong> {pet.weight}</p>}
                 {pet.num_mic && <p className={styles.detailItem}><strong>№ Микрочипа:</strong> {pet.num_mic}</p>}
                 {pet.contacts && <p className={styles.detailItem}><strong>Контакты владельца:</strong> {pet.contacts}</p>}
               </>
             )}
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
           {/* Medical Entries Section */}
           <div className={styles.detailSection}>
             <div className={styles.sectionHeader}>
               <h2 className={styles.sectionTitle}>Медицинские записи</h2>
               <button 
                 onClick={() => setShowAddEntry(true)}
                 className={styles.addButton}
               >
                 + Добавить запись
               </button>
             </div>

             {showAddEntry && (
               <div className={styles.entryForm}>
                 <h3>Новая медицинская запись</h3>
                 <div className={styles.formRow}>
                   <label>Дата:</label>
                   <input
                     type="date"
                     value={newEntry.entry_date}
                     onChange={(e) => handleEntryFieldChange('entry_date', e.target.value)}
                   />
                 </div>
                 <div className={styles.formRow}>
                   <label>Диагноз/Тип:</label>
                   <input
                     type="text"
                     value={newEntry.disease}
                     onChange={(e) => handleEntryFieldChange('disease', e.target.value)}
                   />
                 </div>
                 <div className={styles.formRow}>
                   <label>Описание:</label>
                   <textarea
                     value={newEntry.description}
                     onChange={(e) => handleEntryFieldChange('description', e.target.value)}
                   />
                 </div>
                 <div className={styles.formRow}>
                   <label>Вакцинации:</label>
                   <input
                     type="text"
                     value={newEntry.vaccinations}
                     onChange={(e) => handleEntryFieldChange('vaccinations', e.target.value)}
                   />
                 </div>
                 <div className={styles.formRow}>
                   <label>Рекомендации:</label>
                   <textarea
                     value={newEntry.recommendation}
                     onChange={(e) => handleEntryFieldChange('recommendation', e.target.value)}
                   />
                 </div>
                 <div className={styles.formButtons}>
                   <button onClick={handleAddEntry} className={styles.saveButton}>
                     Сохранить
                   </button>
                   <button 
                     onClick={() => setShowAddEntry(false)} 
                     className={styles.cancelButton}
                   >
                     Отмена
                   </button>
                 </div>
               </div>
             )}

             {entries.length > 0 ? (
               <div className={styles.entriesList}>
                 {entries.map((entry, index) => (
                   <div key={`${entry.id}-${index}`} className={styles.entryCard}>
                     <div className={styles.entryHeader}>
                       <span className={styles.entryDate}>
                         {new Date(entry.entry_date || '').toLocaleDateString()}
                       </span>
                       <span className={styles.entryDisease}>
                         {entry.disease || 'Общий осмотр'}
                       </span>
                     </div>
                     <div className={styles.entryContent}>
                       {entry.description && (
                         <p className={styles.entryDescription}>{entry.description}</p>
                       )}
                       {entry.vaccinations && (
                         <p className={styles.entryVaccinations}>
                           <strong>Вакцинации:</strong> {entry.vaccinations}
                         </p>
                       )}
                       {entry.recommendation && (
                         <p className={styles.entryRecommendation}>
                           <strong>Рекомендации:</strong> {entry.recommendation}
                         </p>
                       )}
                     </div>
                   </div>
                 ))}
                 <div ref={entriesEndRef} />
                 {entriesLoading && (
                   <div className={styles.loading}>Загрузка записей...</div>
                 )}
               </div>
             ) : (
               <p>Нет медицинских записей</p>
             )}
           </div>

           {/* Add more sections as needed */}
         </div>
       </div>
    </div>
  );
};

export default PetPage;
