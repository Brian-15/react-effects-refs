import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Card from './Card.js';

const BASE_URL = 'http://deckofcardsapi.com/api/deck/';

const Deck = () => {
  const [deckId, setDeckId] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(function fetchDeckOnStart() {
    async function fetchDeck() {
      const { data } = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);
      setDeckId(data.deck_id);
      setRemaining(data.remaining);
      console.log(deckId);
    }
    fetchDeck();
  }, []);

  const draw = async () => {
    if (remaining === 0) return;
    const { data } = await axios.get(`${BASE_URL}${deckId}/draw/?count=1`);
    const card = data.cards[0];
    setCards(cards => [...cards, card]);
    setRemaining(data.remaining);
  };

  return (
    <>
      <button onClick={() => draw()}>Draw</button>
      <ul>
        {cards.map(({ image, code, value, suit }) => (
          <Card
            src={image}
            name={`${value} of ${suit}`}
            key={uuid()}
            codeName={code}
          />
        ))}
      </ul>
    </>
  );
};

export default Deck;