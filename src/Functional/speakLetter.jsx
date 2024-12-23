export default function speakLetter(randomLetter) {
  setTimeout(() => {
    if ("speechSynthesis" in window) {
      const speak = new SpeechSynthesisUtterance(randomLetter);
      speak.lang = "pl-PL";
      speak.rate = 0.8;
      speak.pitch = 0.9;
      const voices = window.speechSynthesis.getVoices();

      const selectedVoice = voices.find(
        (voice) => voice.name === "Google polski"
      );
      speak.voice = selectedVoice;

      window.speechSynthesis.speak(speak);
      console.log(voices);
    } else {
      return;
    }
  }, 100);
}
