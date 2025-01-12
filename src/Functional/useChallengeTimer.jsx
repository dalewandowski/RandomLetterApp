import { useEffect } from "react";

export default function useChallengeTimer(
  setRandomLetter,
  setScore,
  setTimeLeft,
  timer,
  setTimer,
  getRandomLetter
) {
  useEffect(() => {
<<<<<<< HEAD
    if (!isGameStarted) return;
    getRandomLetter(setRandomLetter);
    const interval = setInterval(() => {
      if (score === 10) {
        clearInterval(interval);

        setScore(0);
        setTime((prevTime) => Math.max(prevTime - 1000, 1000));
      }
      console.log("elo elo", time);
    }, time);

    return () => clearInterval(interval);
  }, [
    isGameStarted,
    score,
    time,
    getRandomLetter,
    setRandomLetter,
    setTime,
    setScore,
  ]);
=======
    const interval = setInterval(() => {
      setTimer(timer - 1);
      if (timer <= 0) {
        setTimer(10);
        getRandomLetter(setRandomLetter);
        if (setScore) {
          setScore((score) => score + 15);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setRandomLetter, setScore]);

  useEffect(() => {
    if (setTimeLeft) {
      setTimeLeft(timer);
    }
  }, [timer, setTimeLeft]);

  return timer;
>>>>>>> updateChallengeFunction
}
