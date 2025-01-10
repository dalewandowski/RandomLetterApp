import { useState, useEffect, useRef } from "react";
import Keyboard from "../Keyboard/Keyboard";
import style from "./randomLetter.module.css";
import startGame from "../../Functional/startGame";
import getRandomLetter from "../../Functional/getRandomLetter";
import playSound from "../../Functional/playSound";
import { motion, AnimatePresence } from "motion/react";
import Challenge from "../Challenge/Challenge";

function RandomLetter() {
  const [randomLetter, setRandomLetter] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [answerColor, setAnswerColor] = useState("");

  const [timeInterval, setTimeInterval] = useState(10000);
  const [timeLeft, setTimeLeft] = useState(timeInterval);
  const [isChallangeStarted, setIsChallangeStarted] = useState(true);

  const correctSound = new Audio("../sounds/correct.mp3");
  const incorrectSound = new Audio("../sounds/incorrect.mp3");

  // Ref to store the interval ID for changing the letter
  const letterChangeInterval = useRef(null);

  /////// Start Game //////
  function handleGameStart() {
    startGame(
      setIsGameStarted,
      setScore,
      setRandomLetter,
      setIsChallangeStarted
    );
  }

  ///// Reset and start the letter change interval /////
  function startLetterChangeInterval() {
    // Clear any existing interval
    if (letterChangeInterval.current) {
      clearInterval(letterChangeInterval.current);
    }

    // Start a new interval
    letterChangeInterval.current = setInterval(() => {
      getRandomLetter(setRandomLetter);
    }, timeInterval);
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

        // Reset time and interval
        setTimeLeft(timeInterval);
        startLetterChangeInterval();
      } else {
        playSound(false, correctSound, incorrectSound);
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

        // Reset time and interval
        setTimeLeft(timeInterval);
        startLetterChangeInterval();
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

  function handleStartChallenge() {
    setIsGameStarted(true);
    setIsChallangeStarted(true);

    setTimeInterval(10000); // Reset czasu
    setScore(0); // Reset wyniku
    getRandomLetter(setRandomLetter); // Wybierz pierwszą literę

    // Start the interval
    startLetterChangeInterval();
  }

  useEffect(() => {
    if (!isGameStarted) return;
    else if (isChallangeStarted) {
      // Start the interval when the challenge begins
      startLetterChangeInterval();
      return () => {
        if (letterChangeInterval.current) {
          clearInterval(letterChangeInterval.current);
        }
      };
    }
  }, [isChallangeStarted, isGameStarted, timeInterval]);

  ///////// Skracanie czasu co 15 punktów ///////
  useEffect(() => {
    if (score > 0 && score % 15 === 0) {
      setTimeInterval((prevTime) => Math.max(prevTime - 1000, 1000)); // Minimalny czas to 1 sekunda
    }
  }, [score]);

  ////// Odliczanie czasu do zmiany litery /////
  useEffect(() => {
    if (!isGameStarted) return;
    if (isChallangeStarted) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1000);
      }, 1000);

      if (timeLeft <= 0) {
        setTimeLeft(timeInterval);
      }

      return () => clearInterval(interval);
    }
  }, [isChallangeStarted, isGameStarted, timeLeft, timeInterval]);

  useEffect(() => {
    return () => {
      // Clear the interval when the component unmounts
      if (letterChangeInterval.current) {
        clearInterval(letterChangeInterval.current);
      }
    };
  }, []);

  console.log("timeLeft", timeLeft);
  console.log("timeInterval", timeInterval);

  return (
    <main>
      {isChallangeStarted && isGameStarted ? (
        <h5 className={style.timeLeft}>
          Pozostało {timeLeft / 1000} sekund do zmiany litery
        </h5>
      ) : (
        ""
      )}
      <div>
        <p className={style.scoreParagraph}>SCORE: {score}</p>
        <AnimatePresence mode="popLayout">
          {!isGameStarted ? (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, easing: "easeIn", repeat: Infinity }}
              key={isGameStarted}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "space-between",
                perspective: "1000px",
              }}
            >
              <Challenge
                handleStartChallenge={handleStartChallenge}
                buttonText="Gra na Czas"
                timeLeft={timeLeft / 1000}
                className={style.startButton}
              />
              <motion.button
                className={style.startButton}
                onClick={handleGameStart}
              >
                Start Gry
              </motion.button>
            </motion.div>
          ) : (
            <>
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
            </>
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
