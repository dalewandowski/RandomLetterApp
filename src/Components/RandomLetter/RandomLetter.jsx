import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import style from "./randomLetter.module.css";
// import components
import Keyboard from "../Keyboard/Keyboard";
import DigitalClock from "../Clock/DigitalClock";
import Footer from "../Footer/Footer";

// import functions
import startGame from "../../Functional/startGame";
import getRandomLetter from "../../Functional/getRandomLetter";
import playSound from "../../Functional/playSound";
import intervalsForChallenge from "../../Functional/intervalsForChallenge";

function RandomLetter() {
  const [randomLetter, setRandomLetter] = useState("");
  const [score, setScore] = useState(0);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerColor, setAnswerColor] = useState("");
  const [gameType, setGameType] = useState(null);
  const [timeInterval, setTimeInterval] = useState(10000);
  const [timeLeft, setTimeLeft] = useState(10000);

  // sounds for correct and incorrect answers
  const correctSound = new Audio("../sounds/correct.mp3");
  const incorrectSound = new Audio("../sounds/incorrect.mp3");

  // function to start game and reset variables, without challenge
  function handleGameStart() {
    startGame(setScore, setRandomLetter);
    setGameType("normal");
  }

  // function to start challenge gameType
  function handleStartChallenge() {
    startGame(setScore, setRandomLetter);
    setTimeInterval(10000);
    setGameType("challenge");
    setTimeLeft(10000);
  }

  function resetGame() {
    setGameType(null);
    setScore(0);
    setRandomLetter("");
    setTimeInterval(10000);
  }

  //function to handle click on letter
  function handleClickLetter(letter) {
    if (gameType === "normal" || gameType === "challenge") {
      if (letter.toUpperCase() === randomLetter) {
        playSound(true, correctSound, incorrectSound);

        setIsIncorrect(false);
        setScore((prevScore) => prevScore + 1);
        setAnswerColor("");
        getRandomLetter(setRandomLetter);
        setTimeLeft(timeInterval); // Reset czasu
      } else {
        playSound(false, correctSound, incorrectSound);
        setIsIncorrect(true);
        setScore((prevScore) => prevScore - 1);
        setAnswerColor("red");
      }
    }
  }

  // useEffect for keyup event
  useEffect(() => {
    const handleKeyup = (e) => {
      if (
        (gameType === "normal" && gameType === "challenge") ||
        e.key.toUpperCase() === randomLetter
      ) {
        playSound(true, correctSound, incorrectSound);
        setIsIncorrect(false);

        setScore((prevScore) => prevScore + 1);
        setAnswerColor("");
        getRandomLetter(setRandomLetter);
        setTimeLeft(timeInterval); // Reset czasu
      } else {
        playSound(false, correctSound, incorrectSound);
        setIsIncorrect(true);
        setScore((prevScore) => prevScore - 1);
        setAnswerColor("red");
      }
    };

    window.addEventListener("keyup", handleKeyup);
    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [randomLetter, gameType, timeInterval]);

  // intervals function for challenge
  intervalsForChallenge(
    score,
    setTimeInterval,
    gameType,
    setRandomLetter,
    getRandomLetter,
    timeInterval,
    setTimeLeft
  );

  console.log("timeLeft", timeLeft);
  console.log("timeInterval", timeInterval);
  console.log("gameType", gameType);

  return (
    <>
      <header>
        <DigitalClock />
        {gameType != null ? (
          <motion.button
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1,
              easing: "easeIn",
              repeat: Infinity,
            }}
            className={style.resetButton}
            onClick={resetGame}
          >
            RESET
          </motion.button>
        ) : (
          ""
        )}
      </header>
      <main>
        {gameType === "challenge" ? (
          <h2 className={style.timeLeft}>
            Pozostało{" "}
            <AnimatePresence mode="popLayout">
              <motion.span
                key={timeLeft}
                transition={{ duration: 1 }}
                initial={{
                  opacity: 0,
                  y: 100,
                  scale: -1,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 2,
                }}
                exit={{
                  opacity: 0,
                  y: -100,
                  scale: 1,
                }}
                style={
                  timeLeft <= 3000
                    ? { color: "red" }
                    : { color: "rgb(38, 233, 38)" }
                }
              >
                {Math.floor(timeLeft / 1000)}
              </motion.span>
            </AnimatePresence>{" "}
            sekund do zmiany litery
          </h2>
        ) : (
          ""
        )}

        <p className={style.scoreParagraph}>SCORE: {score}</p>

        {gameType === null ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1,
              easing: "easeIn",
              repeat: Infinity,
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "space-evenly",
              perspective: "-1000px",
            }}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, ease: "linear" }}
              onClick={handleStartChallenge}
              className={style.startButton}
            >
              Gra Na Czas
            </motion.button>

            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, ease: "linear", delay: 0.2 }}
              className={style.startButton}
              onClick={handleGameStart}
            >
              Luźna Gra
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.span
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

        <Keyboard
          onClick={handleClickLetter}
          isGameStarted={gameType !== null}
          randomLetter={randomLetter}
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default RandomLetter;
