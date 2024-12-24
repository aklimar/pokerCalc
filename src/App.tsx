import React, {useState} from 'react';
import './App.css';
import CardSelectModal from './CardSelectModal/CardSelectModal.tsx';

function App() {
  const [selectedPlayerCards, setSelectedPlayerCards] = useState([]);
  const [selectedFlopCards, setSelectedFlopCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlopModalOpen, setIsFlopModalOpen] = useState(false);

  const handlePlayerCardSelect = (rank, suit) => {
    setSelectedPlayerCards((prev) => [...prev, { [rank]: suit }]);
  };
  const handleFlopCardSelect = (rank, suit) => {
    setSelectedFlopCards((prev) => [...prev, { [rank]: suit }]);
  }
  
  return (
    <div>
      <h1>Card Selector</h1>
      <button onClick={() => setIsModalOpen(true)}>Choose a Card</button>
      
      {isModalOpen && (
        <CardSelectModal
          onClose={() => setIsModalOpen(false)}
          onCardSelect={handlePlayerCardSelect}
        />
      )}
      <button onClick={() => setIsFlopModalOpen(true)}>Choose a Card</button>
      {isFlopModalOpen && (
        <CardSelectModal
        onClose={() => setIsFlopModalOpen(false)}
        onCardSelect={handleFlopCardSelect}
      />
      )}


    </div>
  );
}

export default App;
