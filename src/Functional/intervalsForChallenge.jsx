import { useEffect } from "react";

function intervalsForChallenge(
  score,
  setTimeInterval,
  gameType,
  setRandomLetter,
  getRandomLetter,
  timeInterval,
  setTimeLeft
) {
  //Short time every 15 points
  useEffect(() => {
    if (score > 0 && score % 15 === 0) {
      setTimeInterval((prevTime) => Math.max(prevTime - 1000, 1000));
    }
  }, [score]);

  // First letter is changed every 10 seconds, and   every 15point time is shorted 1 second
  useEffect(() => {
    if (gameType === "normal") return;
    if (gameType === "challenge") {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime - 1000 <= 0) {
            getRandomLetter(setRandomLetter);
            return timeInterval; // Resetuje czas po zmianie litery
          }
          return prevTime - 1000; // Kontynuuje odliczanie
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameType, timeInterval]);

  // sync time left with time interval
  useEffect(() => {
    setTimeLeft(timeInterval);
  }, [timeInterval]);
}
export default intervalsForChallenge;
