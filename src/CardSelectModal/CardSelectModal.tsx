import React from 'react';
import styles from './CardSelectModal.module.css';
import SuitSelectModal from './SuitSelectModal.tsx';


const suits = ['S', 'H', 'D', 'C'];
const ranks = [
  '2', '3', '4', '5', '6', '7', '8', '9', 'T',
  'J', 'Q', 'K', 'A'
];


const CardSelectModal = ({ onClose, onCardSelect }) => {
  const [suitSelectModalOpen, setSuitSelectModalOpen] = React.useState(false);
  return (
    <div className={styles.mainContainer} onClick={onClose}>
      <div className={styles.mainWrapper} onClick={(e) => e.stopPropagation()}>
        <h2>Выберите карту</h2>
        <div className="flex w-full flex-wrap justify-center align-center">
          {ranks.map((rank) =>
            <div key={`${rank}`} >
              <button
                className="card-item"
                onClick={() => {
                  // onCardSelect(rank, suit);
                  setSuitSelectModalOpen(true);
                  // onClose();
                }}
              >
                <img
                  src={`/assets/ranks/${rank}.svg`}
                  alt={`${rank}`}
                  className="w-30 h-40"
                />
              </button>
            </div>
          )}
        </div>
        {suitSelectModalOpen &&
          <SuitSelectModal onClose={onClose} onCardSelect={onCardSelect} />
        }
      </div>
    </div>
  );
}

export default CardSelectModal;