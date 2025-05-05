import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.scss';
import { Pet } from '../models/Pet';
import { UserSession } from '../models/UserSession';

// Define props interface
interface MainPageProps {
  currentUser: UserSession | null; // Receive currentUser from App
  handleLogout: () => Promise<void>; // Receive handleLogout from App
}

const MainPage: React.FC<MainPageProps> = ({ currentUser, handleLogout }) => { // Destructure props
  const navigate = useNavigate();
  // Remove internal currentUser state: const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [displayedPets, setDisplayedPets] = useState<Pet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch only pets on component mount (user comes from props)
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await window.petAPI.loadAll();
        setAllPets(pets);
        setDisplayedPets(pets);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
        // Handle error
      }
    };
    fetchPets();
  }, []); // Empty dependency array, runs once

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (!searchTerm.trim()) {
      setDisplayedPets(allPets); // Show all if search is empty
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = allPets.filter(pet =>
        pet.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setDisplayedPets(filtered);
    }
  };

  // Handle "Add New Pet" button click
  const handleAddNewPet = () => {
    navigate('/add-pet');
  };

  // Handle "Details" button click
  const handleViewDetails = (petId: number) => {
    navigate(`/pet/${petId}`);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        Ветеринарная диагностическая клиника "Умка" {/* Hardcoded title */}
      </header>
      <main className={styles.mainContent}>
        <aside className={styles.leftSidebar}></aside> {/* Left placeholder */}
        <section className={styles.centerColumn}>
          {/* User Info Section */}
          <div className={styles.userInfo}>
            <div
              className={styles.userImage}
              style={{ backgroundImage: `url(${currentUser?.picSource || ''})` }} // Use placeholder if no image
            ></div>
            <div className={styles.userName}>
              {currentUser ? currentUser.fullname : '...'} {/* Use fullname */}
            </div>
            {/* Add Logout Button */}
            {currentUser && (
              <button onClick={handleLogout} className={styles.logoutButton}>
                Выйти
              </button>
            )}
          </div>

          {/* Search and Header Section */}
          <div className={styles.searchAndHeader}>
             <h2 className={styles.patientsHeader}>Мои пациенты:</h2>
             <div className={styles.searchContainer}>
               <input
                 type="text"
                 className={styles.searchInput}
                 value={searchTerm}
                 onChange={handleSearchChange}
                 placeholder="" // Placeholder handled by separate element
               />
               {searchTerm === '' && (
                 <span className={styles.searchPlaceholder}>Введите имя пациента</span>
               )}
               <button className={styles.searchButton} onClick={handleSearchClick}>
                 Поиск
               </button>
             </div>
          </div>

          {/* Pet List Section */}
          <div className={styles.petListContainer}>
            {displayedPets.length > 0 ? (
              displayedPets.map((pet) => (
                <div key={pet.id} className={styles.petItem}>
                  <div
                    className={styles.petImage}
                    style={{ backgroundImage: `url(${pet.picSource || ''})` }} // Placeholder if no image
                  ></div>
                  <div className={styles.petInfo}>
                    <span className={styles.petName}>{pet.name}</span>
                    <span className={styles.petInfoText}>Вид: {pet.animal_type}</span> {/* Use animal_type */}
                    <span className={styles.petInfoText}>Пол: {pet.gender}</span>      {/* Use gender */}
                    <span className={styles.petInfoText}>Возраст: {pet.age}</span>
                    <span className={styles.petInfoText}>Порода: {pet.breed}</span>
                  </div>
                  <button
                    className={styles.detailsButton}
                    onClick={() => handleViewDetails(pet.id)}
                  >
                    Узнать больше
                  </button>
                </div>
              ))
            ) : (
              <p>Нет пациентов для отображения.</p> // Message when no pets match search
            )}
          </div>

          {/* Add Pet Button Section */}
          <div className={styles.addPetButtonContainer}>
            <button className={styles.addPetButton} onClick={handleAddNewPet}>
              Добавить нового пациента
            </button>
          </div>
        </section>
        <aside className={styles.rightSidebar}></aside> {/* Right placeholder */}
      </main>
    </div>
  );
};

export default MainPage;
