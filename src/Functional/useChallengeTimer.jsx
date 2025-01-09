import { useEffect } from "react";

export default function useChallengeTimer(
  isGameStarted,
  setScore,
  score,
  getRandomLetter,
  setRandomLetter,
  time,
  setTime
) {
  useEffect(() => {
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
}
