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
}
