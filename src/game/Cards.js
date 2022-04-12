import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";
import Results from "./Results";
import SingleCard from "./SingleCard";

const cardImages = [
  { src: "img/img1.jpg", matched: false },
  { src: "img/img2.jpg", matched: false },
  { src: "img/img3.jpg", matched: false },
  { src: "img/img7.jpg", matched: false },
  { src: "img/img8.jpg", matched: false },
  { src: "img/img9.jpg", matched: false },
];

function Cards() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [matched, setMatched] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
    setTurns(0);

    setMatched(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setMatched((prevMatch) => prevMatch + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  let navigate = useNavigate();

  const submitResult = (e) => {
    e.preventDefault();
    const data = {
      result: turns,
      token: localStorage.getItem("token"),
    };
    console.log(data);
    axios
      .post("submit.php", data)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    setMatched(0);
    navigate("/");
  };

  let button;
  if (localStorage.getItem("token")) {
    button = (
      <button className={matched == 6 ? "flex" : "none"} onClick={submitResult}>
        Submit Result
      </button>
    );
  } else {
    button = (
      <button className={matched == 6 ? "flex" : "none"}>
        Veuillez vous connecter pour enregistrer ce score ! <br />
        Appuyez sur Nouvelle Partie pour rejouer !
      </button>
    );
  }

  return (
    <div className="App">
      <h1 className="elements">Memory GAME </h1>
      <button onClick={shuffleCards}>Nouvelle Partie</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disable={disabled}
          />
        ))}
      </div>
      <p className="elements">Turns : {turns}</p>
      {button}
      <Results />
    </div>
  );
}

export default Cards;
