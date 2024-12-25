import React from 'react';
import styles from './CardSelectModal.module.css';
import SuitSelectModal from './SuitSelectModal.tsx';


const suits = ['S', 'H', 'D', 'C'];
const ranks = [
  '2', '3', '4', '5', '6', '7', '8', '9', 'T',
  'J', 'Q', 'K', 'A'
];

interface CardSelectModalProps {
  onClose: () => void;
  onCardSelect: (rank: string, suit: string) => void;
  setSelectedPlayerCards?: (cards: (prev: string[]) => string[]) => void;
  selectedPlayerCards?: string[];
}

const CardSelectModal: React.FC<CardSelectModalProps> = ({ onClose, onCardSelect, selectedPlayerCards, setSelectedPlayerCards }) => {

  return (
    <div className={styles.mainContainer} onClick={onClose}>
      <div className={styles.mainWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.cardGrid}>
          {ranks.map((rank) =>
            suits.map((suit) => (
              <div
                key={`${rank}-${suit}`}
                className={`${styles.cardItem} ${selectedPlayerCards?.includes(`${rank}${suit}`) ? styles.selected : ''
                  }`}
              >
                <button onClick={() =>
                  onCardSelect(rank, suit)}>
                  <img
                    src={`/assets/allCards/${rank}${suit}.png`}
                    alt={`${rank}${suit}`}
                  />
                </button>
              </div>

            ))
          )}
        </div>
        <div className="">
          <div>Выберите карты игрока</div>
          <div className="flex w-full flex-wrap justify-center align-center flex-wrap">
            {selectedPlayerCards.map((card) => (
              <div key={card} onClick={() => setSelectedPlayerCards((prev) => prev.filter((c) => c !== card))}>
                <img src={`/assets/allCards/${card}.png`} alt={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSelectModal;