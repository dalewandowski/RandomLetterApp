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
    getRandomLetter(setRandomLetter); // Zmień literę
    if (!isGameStarted) return; // Jeśli gra się nie rozpoczęła, nie rób nic

    const interval = setInterval(() => {
      getRandomLetter(setRandomLetter); // Zmień literę
      if (score === 3) {
        setScore(0);
        setTime((prevTime) => Math.max(prevTime - 1000, 1000)); // Skróć czas, minimum 1 sekunda
        console.log(time);
      }
    }, time);

    return () => clearInterval(interval); // Wyczyść interwał przy demontażu komponentu lub zmianie zależności
  }, [isGameStarted, score, time, getRandomLetter, setRandomLetter, setTime]);
}
