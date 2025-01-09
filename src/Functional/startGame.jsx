import getRandomLetter from "./getRandomLetter";

export default function startGame(setIsGameStarted, setScore, setRandomLetter) {
  setIsGameStarted(true);
  setScore(0);
  getRandomLetter(setRandomLetter);
}
