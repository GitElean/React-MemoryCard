import React, { useEffect, useState } from 'react';
import kurisu from './assets/kurisu.png';
import okabe from './assets/okabe.png';
import daru from './assets/daru.png';
import faris from './assets/faris.png';
import luka from './assets/luka.png';
import mayuri from './assets/mayuri.png';
import moeka from './assets/moeka.png';
import suzuha from './assets/suzuha.png';
import Cardunit from './components/cardUnit';

const cards = [
  { labMember: kurisu, match: false },
  { labMember: okabe, match: false },
  { labMember: daru, match: false },
  { labMember: faris, match: false },
  { labMember: luka, match: false },
  { labMember: mayuri, match: false },
  { labMember: moeka, match: false },
  { labMember: suzuha, match: false },
];

function App() {
  const [cardsAct, setted] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);

  const shuffle = () => {
    const shuffled = [...cards, ...cards].sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setted(shuffled);
    setTurns(0);
  };

  const cardChoice = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  const newTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setTurns((turnscont) => turnscont + 1);
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.labMember === secondCard.labMember) {
        console.log('match');
        newTurn();
      } else {
        console.log('dont match');
        newTurn();
      }
    }
  }, [firstCard, secondCard]);

  console.log(turns);
  return (
    <div className="h-screen w-screen bg-black sm:flex sm:items-center justify-center">
      <div className="container h-5/6 w-11/12 pr-20">
        <div className=" w-5/6 justify-center text-center">
          <h1 className="text-steins">Memoria de Convergencia </h1>
        </div>
        <div className="top-0 right-1 w-1/6 h-full border-4 border-double border-slate-500 text-center flex flex-col fixed">
          <button onClick={shuffle} className="button-s" type="button" alt="iniciar juego">Empezar partida</button>
          <h1 className="text-steins">
            Intentos:
            {' '}
            {turns}
          </h1>
          <h1 className="text-steins">Convergencia:</h1>
          <h1 className="text-steins">Miembros:</h1>
          <ul><li className="text-steins2">a</li></ul>
        </div>
        <div className="grid">
          {cardsAct.map((card) => (
            <Cardunit
              key={card.id}
              card={card}
              cardChoice={cardChoice}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
