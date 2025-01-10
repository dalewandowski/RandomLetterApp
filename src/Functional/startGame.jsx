import getRandomLetter from "./getRandomLetter";

export default function startGame(
  setIsGameStarted,
  setScore,
  setRandomLetter,
  setIsChallangeStarted
) {
  setIsGameStarted(true);
  setIsChallangeStarted(false);
  setScore(0);
  getRandomLetter(setRandomLetter);
}
