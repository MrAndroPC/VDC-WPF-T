import React, { useState } from 'react';
import styles from './OwnerSelection.module.scss';
import { PetOwner } from '../models/PetOwner';
import Modal from './Modal';
import OwnerSelectionModalContent from './OwnerSelectionModalContent';

interface OwnerSelectionProps {
  selectedOwner: PetOwner | null;
  onOwnerSelect: (owner: PetOwner | null) => void; // Callback when owner is selected/created
}

// SVG Path for the button icon (approximating the original)
const AddUserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill="currentColor">
        <path d="M219 25q-24 0 -40 16.5t-16 40t16 39.5t39.5 16.5t40 -16t16.5 -40t-16.5 -40t-39.5 -16.5zM228 113q0 3 -2.5 6t-6.5 3t-7 -3t-3 -6v-22h-21q-4 0 -7 -3t-3 -7t3 -6.5t7 -2.5h21v-22q0 -4 3 -6.5t7 -2.5t6.5 2.5t2.5 6.5v22h22q4 0 6.5 2.5t2.5 6.5t-2.5 7t-6.5 3h-22V117zM125 175q21 0 35.5 14.5t14.5 35.5t-14.5 35.5t-35.5 14.5t-35.5 -14.5t-14.5 -35.5t14.5 -35.5t35.5 -14.5zM50 150q-10 0 -17.5 -7.5t-7.5 -17.5q0 -27 13.5 -50t36.5 -36.5t50 -13.5q19 0 37 7q-18 21 -18 49q0 23 12.5 41.5t32.5 27.5h-139z" />
    </svg>
);


const OwnerSelection: React.FC<OwnerSelectionProps> = ({ selectedOwner, onOwnerSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOwnerSelectedFromModal = (owner: PetOwner | null) => {
    onOwnerSelect(owner); // Pass the selected owner up
    handleCloseModal(); // Close modal after selection
  };

  // Format owner display name (similar to original converter)
  const displayOwnerName = selectedOwner
    ? `Владелец: ${selectedOwner.fullname}` // Using fullname now
    : 'Владелец: Не выбран';

  return (
    <>
      <div className={styles.container}>
        <span className={`${styles.ownerDisplay} ${!selectedOwner ? styles.placeholder : ''}`}>
          {displayOwnerName}
        </span>
        <button type="button" className={styles.selectButton} onClick={handleOpenModal} title="Выбрать или добавить владельца">
           <AddUserIcon />
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {/* Render the actual modal content */}
        <OwnerSelectionModalContent onOwnerSelect={handleOwnerSelectedFromModal} onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default OwnerSelection;
