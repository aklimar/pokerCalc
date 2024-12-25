import React, { useState,useEffect } from 'react';
import './App.css';
import CardSelectModal from './CardSelectModal/CardSelectModal.tsx';

const suits = ['S', 'H', 'D', 'C']; // Масти карт
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']; // Ранги карт


function App() {
  const [selectedPlayerCards, setSelectedPlayerCards] = useState([]);
  const [selectedFlopCards, setSelectedFlopCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlopModalOpen, setIsFlopModalOpen] = useState(false);
  const [outs, setOuts] = useState(0);

  useEffect(() => {
    calculateOuts();
  }, [selectedPlayerCards, selectedFlopCards]);

  const handlePlayerCardSelect = (rank: string, suit: string) => {
    const selectedCard = `${rank}${suit}`;  // Формируем строку вида 2S, KH

    if (setSelectedPlayerCards) {
      setSelectedPlayerCards((prev) =>
        prev.includes(selectedCard)
          ? prev.filter((card) => card !== selectedCard)
          : [...prev, selectedCard]
      );
    }
  };

  const handleFlopCardSelect = (rank: string, suit: string) => {
    const selectedCard = `${rank}${suit}`;  // Формируем строку вида 2S, KH

    if (setSelectedFlopCards) {
      setSelectedFlopCards((prev) =>
        prev.includes(selectedCard)
          ? prev.filter((card) => card !== selectedCard)
          : [...prev, selectedCard]
      );
    }
  };

  // Функция для расчета аутов и шанса флэша
  const calculateOutsAndFlushChance = () => {
    const allCards = [...selectedPlayerCards, ...selectedFlopCards]; // Все выбранные карты
    const playerSuits = allCards.map(card => card[card.length - 1]); // Получаем масти карт

    const suitCounts = suits.reduce((counts, suit) => {
      counts[suit] = playerSuits.filter(s => s === suit).length; // Считаем количество карт каждой масти
      return counts;
    }, {} as Record<string, number>);

    const maxSuitCount = Math.max(...Object.values(suitCounts)); // Максимальное количество карт одной масти
    const remainingCardsOfSameSuit = 13 - maxSuitCount; // Сколько карт нужной масти осталось в колоде

    const remainingFlopCardsOfSameSuit = selectedFlopCards.filter(card => card[card.length - 1] === suits[maxSuitCount]).length;

    const calculatedOuts = remainingCardsOfSameSuit - remainingFlopCardsOfSameSuit; // Считаем количество аутов
    setOuts(calculatedOuts); // Обновляем состояние с аутами

    // Рассчитываем шанс на флэш
    const remainingCards = 52 - (selectedPlayerCards.length + selectedFlopCards.length); // Оставшееся количество карт в колоде
    const probability = (calculatedOuts / remainingCards) * 100; // Шанс на флэш
    return probability.toFixed(2); // Вероятность, округленная до 2 знаков после запятой
  };

  return (
    <div>
      <h1>Card Selector</h1>
      <button onClick={() => setIsModalOpen(true)}>Choose a Card</button>

      {isModalOpen && (
        <CardSelectModal
          onClose={() => setIsModalOpen(false)}
          onCardSelect={handlePlayerCardSelect}
          selectedPlayerCards={selectedPlayerCards}
          setSelectedPlayerCards={setSelectedPlayerCards}
        />
      )}
      <button onClick={() => setIsFlopModalOpen(true)}>Choose a Card</button>
      {isFlopModalOpen && (
        <CardSelectModal
          onClose={() => setIsFlopModalOpen(false)}
          onCardSelect={handleFlopCardSelect}
          selectedPlayerCards={selectedFlopCards}
          setSelectedPlayerCards={setSelectedFlopCards}
        />
      )}
      <div>
        <h2>Выбранные карты игрока</h2>
        <div className="flex w-full flex-wrap justify-center align-center">
          {selectedPlayerCards.map((card) => (
            <div key={card}>
              <img src={`/assets/allCards/${card}.png`} alt={card} />
            </div>
          ))}
        </div>

        <h2>Выбранные карты на столе</h2>
        <div className="flex w-full flex-wrap justify-center align-center">
          {selectedFlopCards.map((card) => (
            <div key={card}>
              <img src={`/assets/allCards/${card}.png`} alt={card} />
            </div>
          ))}
        </div>
        {outs > 0 &&
          <h2>Аутов: {outs}</h2>
        }
        <button
          onClick={() => {
            alert(`Аутов: ${outs}, Шанс на флэш: ${calculateOutsAndFlushChance()})`)
          }}>Рассчитать флэш</button>

      </div>

    </div>
  );
}

export default App;
