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
import winImg from './assets/win.png';
import Gear from './components/gear';

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

const convergency = [
  {convergency: 0 },
];

function App() {
  const [cardsAct, setted] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [deactivate, setDeactivate] = useState(false);
  const [win, setWin] = useState(false);

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
    setDeactivate(false);
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      setDeactivate(true);
      if (firstCard.labMember === secondCard.labMember) {
        setted((prevCards) => prevCards.map((card) => {
          if (card.labMember === firstCard.labMember) {
            return { ...card, match: true };
          }
          return card;
        }));
        newTurn();
      } else {
        setTimeout(() => {
          newTurn();
        }, 1500);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    setWin(cardsAct.every((card) => card.match));
  }, [cardsAct]);

  useEffect(() => {
    console.log(win);
  }, [win]);

  const winS = () => {
    let flag = true;
    let cont = 0;
    cardsAct.forEach((card) => {
      if (card.match === true) {
        cont += 1;
        if (cont !== cardsAct.length) {
          flag = false;
        }
      }
    });
    setWin(flag);
  };

  console.log(turns);
  console.log(winS);
  return (
    <div className="h-screen w-screen bg-black sm:flex sm:items-center justify-center">
      <div className="container h-5/6 w-11/12 pr-20 bg-gray-400">
        <div className="h-10 w-10 fill-black animate-spin duration-1000 absolute top-0 right-10">
          <Gear />
        </div>
        <div className="h-10 w-10 fill-black animate-spin duration-1000 absolute top-10 right-0">
          <Gear />
        </div>
        <div className="h-16 w-16 fill-black animate-spin duration-1000 absolute top-0 left-0">
          <Gear />
        </div>
        <div className=" w-full justify-center text-center">
          <h1 className="text-steins2">Memoria de Convergencia </h1>
        </div>
        <div className="right-0 bottom-1 w-full h-1/6 border-4 border-double border-slate-500 text-center flex flex-col fixed bg-brown-50">
          <button onClick={shuffle} className="button-s" type="button" alt="iniciar juego">Empezar partida</button>
          <table>
            <tr>
              <th>
                <h1 className="text-steins">
                  Intentos:
                  {' '}
                  {turns}
                </h1>
              </th>
              <th>
                <h1 className="text-steins">Convergencia:</h1>
              </th>
            </tr>
          </table>
        </div>
        <div className="grid pl-11 pb-8">
          {cardsAct.map((card) => (
            <Cardunit
              key={card.id}
              card={card}
              cardChoice={cardChoice}
              flip={card === firstCard || card === secondCard || card.match === true}
              deactivate={deactivate}
              win
            />
          ))}
        </div>
        <div className="absolute top-0 right-0 w-screen h-screen pointer-events-none flex pt-5 justify-center">
          {win
            && (
            <div className="">
              <img src={winImg} alt="victoria" />
              <h1 className="text-white">¡Has llegado a la línea tempora Steins;Gate!</h1>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
