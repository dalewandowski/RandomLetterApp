import { useState, useEffect } from "react";
import Keyboard from "../Keyboard/Keyboard";
import style from "./randomLetter.module.css";
import speakLetter from "../../Functional/speakLetter";
import { motion, AnimatePresence } from "motion/react";
function RandomLetter() {
  const [randomLetter, setRandomLetter] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

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

  ///// onClick Letter //////
  function handleClickLetter(letter) {
    if (isGameStarted) {
      if (letter.toUpperCase() === randomLetter) {
        playSound(true);
        setIsCorrect(true);
        setScore((prevScore) => prevScore + 1);
        getRandomLetter();
      } else {
        playSound(false);
        setIsCorrect(isCorrect);
        setScore((prevScore) => prevScore);
      }
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
        setIsCorrect(true);
        setScore((prevScore) => prevScore + 1);
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
      <p className={style.scoreParagraph}>SCORE: {score}</p>{" "}
      <AnimatePresence mode="popLayout">
        {!isGameStarted ? (
          <motion.button
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, easing: "easeIn", repeat: Infinity }}
            key={isGameStarted}
            className={style.startButton}
            onClick={startGame}
          >
            Start Gry
          </motion.button>
        ) : (
          <motion.span
            key={isGameStarted}
            className={style.randomLetter}
            initial={{ opacity: 0, y: -1000 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {randomLetter.toUpperCase()}
          </motion.span>
        )}
      </AnimatePresence>
      <Keyboard
        onClick={handleClickLetter}
        isGameStarted={isGameStarted}
        randomLetter={randomLetter}
      />
    </>
  );
}

export default RandomLetter;
