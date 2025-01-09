import { useState, useEffect } from "react";
import Keyboard from "../Keyboard/Keyboard";
import style from "./randomLetter.module.css";
import startGame from "../../Functional/startGame";
import getRandomLetter from "../../Functional/getRandomLetter";
import playSound from "../../Functional/playSound";
import { motion, AnimatePresence } from "motion/react";
import Challenge from "../Challenge/Challenge";
import useChallengeTimer from "../../Functional/useChallengeTimer";

function RandomLetter() {
  const [randomLetter, setRandomLetter] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [answerColor, setAnswerColor] = useState("");
  const [time, setTime] = useState(1000);

  const correctSound = new Audio("../sounds/correct.mp3");
  const incorrectSound = new Audio("../sounds/incorrect.mp3");

  /////// Start Game //////
  function handleGameStart() {
    startGame(setIsGameStarted, setScore, setRandomLetter);
  }
  ///// onClick function //////
  function handleClickLetter(letter) {
    if (isGameStarted) {
      if (letter.toUpperCase() === randomLetter) {
        playSound(true, correctSound, incorrectSound);
        setIsCorrect(true);
        setIsIncorrect(false);
        setScore((prevScore) => prevScore + 1);
        setAnswerColor("");
        getRandomLetter(setRandomLetter);
      } else {
        playSound(false, correctSound, incorrectSound);
        setIsCorrect(false);
        setIsIncorrect(true);
        setScore((prevScore) => prevScore - 1);
        setAnswerColor("red");
      }
    }
  }

  /////////function for keyboard //////
  useEffect(() => {
    const handleKeyup = (e) => {
      if (isGameStarted && e.key.toUpperCase() === randomLetter) {
        playSound(true, correctSound, incorrectSound);
        setIsCorrect(true);
        setIsIncorrect(false);
        setScore((prevScore) => prevScore + 1);
        setAnswerColor("");
        getRandomLetter(setRandomLetter);
      } else if (isGameStarted) {
        playSound(false, correctSound, incorrectSound);
        setIsCorrect(false);
        setScore((prevScore) => prevScore - 1);
        setIsIncorrect(true);
        setAnswerColor("red");
      }
    };
    window.addEventListener("keyup", handleKeyup);
    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [randomLetter]);

  useChallengeTimer(
    isGameStarted,
    score,
    setScore,
    getRandomLetter,
    setRandomLetter,
    time,
    setTime
  );

  const handleChallengeClick = () => {
    setIsGameStarted(true);
  };

  return (
    <main>
      <Challenge onClickHandler={handleChallengeClick} />
      <p>Zmiana litery za: {time / 1000} sekund</p>
      <div>
        <p className={style.scoreParagraph}>SCORE: {score}</p>
        <AnimatePresence mode="popLayout">
          {!isGameStarted ? (
            <motion.button
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, easing: "easeIn", repeat: Infinity }}
              key={isGameStarted}
              className={style.startButton}
              onClick={handleGameStart}
            >
              Start Gry
            </motion.button>
          ) : (
            <motion.span
              key={isGameStarted}
              className={style.randomLetter}
              initial={{ opacity: 0, y: -1000 }}
              animate={{
                translateX: isIncorrect ? [-100, 100, 0] : 0,
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.2, repeat: 0 }}
              style={{ color: answerColor }}
            >
              {randomLetter.toUpperCase()}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <Keyboard
        onClick={handleClickLetter}
        isGameStarted={isGameStarted}
        randomLetter={randomLetter}
      />
    </main>
  );
}

export default RandomLetter;
