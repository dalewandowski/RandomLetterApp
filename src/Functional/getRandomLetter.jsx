import speakLetter from "./speakLetter";

export default function getRandomLetter(setRandomLetter) {
  const randomIndex = Math.floor(Math.random() * 26);
  const randomLetter = String.fromCharCode(randomIndex + 65);
  speakLetter(randomLetter);
  setRandomLetter(randomLetter);
  return randomLetter;
}
