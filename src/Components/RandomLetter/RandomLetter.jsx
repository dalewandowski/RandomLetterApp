import { useState, useEffect } from "react";
import Keyboard from "../Keyboard/Keyboard";
import style from "./randomletter.module.css";
import speakLetter from "../../Functional/speakLetter";

function RandomLetter() {
  const [randomLetter, setRandomLetter] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);

  /////// Get Random Letter //////
  function getRandomLetter() {
    const randomIndex = Math.floor(Math.random() * 26);
    const randomLetter = String.fromCharCode(randomIndex + 65);
    speakLetter(randomLetter);
    setRandomLetter(randomLetter);
    console.log(randomLetter);
  }

  /////// Start Game //////
  function startGame() {
    setIsGameStarted(true);
    getRandomLetter();
  }

  //////// Sounds //////
  function playSound(isCorrect) {
    const correct = new Audio("../sounds/correct.mp3");
    const incorrect = new Audio("../sounds/incorrect.mp3");

    if (isCorrect) {
      correct.play();
    } else {
      incorrect.play();
    }
  }

  ///////// Use Effects //////
  useEffect(() => {
    getRandomLetter();
  }, []);

  useEffect(() => {
    const handleKeyup = (e) => {
      if (isGameStarted && e.key.toUpperCase() === randomLetter) {
        playSound(true);
        getRandomLetter();
      } else if (isGameStarted) {
        playSound(false);
      }
    };
    window.addEventListener("keyup", handleKeyup);
    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [randomLetter]);

  return (
    <>
      {!isGameStarted ? (
        <button className={style.startButton} onClick={startGame}>
          Start Gry
        </button>
      ) : (
        <h1 className={style.randomLetter}>{randomLetter.toUpperCase()}</h1>
      )}
      <Keyboard isGameStarted={isGameStarted} randomLetter={randomLetter} />
    </>
  );
}

export default RandomLetter;
