import getRandomLetter from "./getRandomLetter";

export default function startGame(setScore, setRandomLetter) {
  setScore(0);
  getRandomLetter(setRandomLetter);
}
