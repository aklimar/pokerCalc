import React from 'react';
import styles from './CardSelectModal.module.css';

const suits = ['S', 'H', 'D', 'C'];
const ranks = [
  '2', '3', '4', '5', '6', '7', '8', '9', 'T',
  'J', 'Q', 'K', 'A'
];


const SuitSelectModal = ({ onClose, onCardSelect }) => {
  return (
    <div className={styles.mainContainer} onClick={onClose}>
      <div className={styles.mainWrapperSuit} onClick={(e) => e.stopPropagation()}>
        <h2>Выберите карту</h2>
        <div className="flex w-full flex-wrap justify-center align-center">
          {suits.map((suit) =>
            <div key={`${suit}`} >
              <button
                onClick={() => {
                  // onCardSelect(rank, suit);
                  onClose();
                }}
              >
                <img
                  src={`/assets/suits/${suit}.svg`}
                  alt={`${suit}`}
                  className="w-20 h-30"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuitSelectModal;