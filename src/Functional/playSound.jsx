export default function playSound(isCorrect, correctSound, incorrectSound) {
  if (isCorrect) {
    correctSound.play();
  } else {
    incorrectSound.play();
  }
}
