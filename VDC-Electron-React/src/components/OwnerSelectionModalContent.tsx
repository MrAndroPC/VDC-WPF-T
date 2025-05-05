import React, { useState, useEffect } from 'react';
import styles from './OwnerSelectionModalContent.module.scss';
import { PetOwner } from '../models/PetOwner';
import { RegisterOwnerPayload } from '../services/api'; // Import payload type

interface OwnerSelectionModalContentProps {
  onOwnerSelect: (owner: PetOwner) => void; // Callback when an owner is selected/created
  onClose: () => void; // Callback to close the modal
}

const OwnerSelectionModalContent: React.FC<OwnerSelectionModalContentProps> = ({ onOwnerSelect, onClose }) => {
  // State for existing owners list/search
  const [searchTerm, setSearchTerm] = useState('');
  const [owners, setOwners] = useState<PetOwner[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  // State for new owner form
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState(''); // Assuming password needed for registration
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  // Initial fetch of owners (or fetch on search)
  useEffect(() => {
    fetchOwners(); // Fetch initially or adjust logic as needed
  }, []);

  const fetchOwners = async (term: string = '') => {
    setIsLoadingList(true);
    setListError(null);
    try {
      // TODO: Implement search term filtering in API/IPC if backend supports it
      const fetchedOwners = await window.ownerAPI.getAll();
      // Frontend filtering for now
      const filtered = term
        ? fetchedOwners.filter(owner =>
            owner.fullname.toLowerCase().includes(term.toLowerCase()) ||
            owner.email?.toLowerCase().includes(term.toLowerCase()) ||
            owner.phone?.includes(term)
          )
        : fetchedOwners;
      setOwners(filtered);
    } catch (error) {
      console.error("Failed to fetch owners:", error);
      setListError(error instanceof Error ? error.message : 'Failed to load owners.');
    } finally {
      setIsLoadingList(false);
    }
  };

  const handleSearch = () => {
    fetchOwners(searchTerm);
  };

  const handleSelectOwner = (owner: PetOwner) => {
    onOwnerSelect(owner); // Pass selected owner back
  };

  const handleRegisterOwner = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== newConfirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }
    setIsRegistering(true);
    setRegisterError(null);

    const payload: RegisterOwnerPayload = {
      fullname: newFullName,
      email: newEmail,
      password: newPassword, // Send password
      phone: newPhone || undefined,
    };

    try {
      const result = await window.ownerAPI.register(payload);
      if (result.success && result.owner) {
        console.log("Owner registered successfully:", result.owner);
        onOwnerSelect(result.owner); // Pass newly created owner back
      } else {
        throw new Error(result.error || 'Failed to register owner.');
      }
    } catch (error) {
      console.error("Failed to register owner:", error);
      setRegisterError(error instanceof Error ? error.message : 'Registration failed.');
    } finally {
      setIsRegistering(false);
    }
  };


  return (
    <div className={styles.modalLayout}>
      {/* Left Side: Search and List */}
      <div className={styles.listSection}>
        <h4>Найти существующего владельца</h4>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск по ФИО, email, телефону..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton} onClick={handleSearch} disabled={isLoadingList}>
            {isLoadingList ? 'Поиск...' : 'Найти'}
          </button>
        </div>
        {listError && <p className={styles.errorMessage}>{listError}</p>}
        <ul className={styles.ownerList}>
          {isLoadingList ? (
            <li>Загрузка...</li>
          ) : owners.length > 0 ? (
            owners.map((owner) => (
              <li key={owner.id} className={styles.ownerItem}>
                <div className={styles.ownerInfo}>
                  <strong>{owner.fullname}</strong><br />
                  {owner.email && <>{owner.email}<br /></>}
                  {owner.phone && <>{owner.phone}</>}
                </div>
                <button
                  className={styles.selectOwnerButton}
                  onClick={() => handleSelectOwner(owner)}
                >
                  Выбрать
                </button>
              </li>
            ))
          ) : (
            <li>Владельцы не найдены.</li>
          )}
        </ul>
      </div>

      {/* Separator */}
      <div className={styles.separator}></div>

      {/* Right Side: Add New Owner Form */}
      <div className={styles.addSection}>
        <h4>Добавить нового владельца</h4>
        <form className={styles.addForm} onSubmit={handleRegisterOwner}>
          <div className={styles.inputGroup}>
            <label htmlFor="newFullName" className={styles.label}>ФИО:</label>
            <input type="text" id="newFullName" className={styles.input} value={newFullName} onChange={(e) => setNewFullName(e.target.value)} required disabled={isRegistering} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="newEmail" className={styles.label}>Email:</label>
            <input type="email" id="newEmail" className={styles.input} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required disabled={isRegistering} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="newPhone" className={styles.label}>Телефон:</label>
            <input type="tel" id="newPhone" className={styles.input} value={newPhone} onChange={(e) => setNewPhone(e.target.value)} disabled={isRegistering} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="newPassword" className={styles.label}>Пароль:</label>
            <input type="password" id="newPassword" className={styles.input} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required disabled={isRegistering} />
          </div>
           <div className={styles.inputGroup}>
            <label htmlFor="newConfirmPassword" className={styles.label}>Повторите пароль:</label>
            <input type="password" id="newConfirmPassword" className={styles.input} value={newConfirmPassword} onChange={(e) => setNewConfirmPassword(e.target.value)} required disabled={isRegistering} />
          </div>

          {registerError && <p className={styles.errorMessage}>{registerError}</p>}

          <div className={styles.formActions}>
             <button type="button" className={styles.cancelButton} onClick={onClose} disabled={isRegistering}>Отмена</button>
             <button type="submit" className={styles.addButton} disabled={isRegistering}>
                {isRegistering ? 'Добавление...' : 'Добавить владельца'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerSelectionModalContent;
