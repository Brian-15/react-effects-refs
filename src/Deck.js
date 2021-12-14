import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Card from './Card.js';

const BASE_URL = 'http://deckofcardsapi.com/api/deck/';

const Deck = () => {
  const [deckId, setDeckId] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [card, setCard] = useState({});

  useEffect(function fetchDeckOnStart() {
    async function fetchDeck() {
      const { data } = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);
      setDeckId(data.deck_id);
      setRemaining(data.remaining);
    }
    fetchDeck();
  }, []);

  const draw = async () => {
    if (remaining <= 1) {
      window.alert('Error: no cards remaining!');
      return;
    }
    const { data } = await axios.get(`${BASE_URL}${deckId}/draw/?count=1`);
    setCard(data.cards[0]);
    setRemaining(data.remaining);
  };

  return (
    <>
      <div>
        <button onClick={draw}>Draw</button>
      </div>
      <Card
        src={card.image}
        name={`${card.value} of ${card.suit}`}
        key={uuid()}
        codeName={card.code}
      />
    </>
  );
};

export default Deck;