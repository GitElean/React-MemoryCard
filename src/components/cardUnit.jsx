import '../index.css';
import React from 'react';
import wing from '../assets/imagen.png';

function Cardunit({ card, cardChoice }) {
  const clickTask = () => {
    cardChoice(card);
  };

  return (
    <div className="card">
      <div>
        <img className="labmember" alt="lab member" src={card.labMember} />
        <img
          className="backcard"
          alt="back card"
          src={wing}
          onClick={clickTask}
        />
      </div>
    </div>
  );
}

export default Cardunit;
