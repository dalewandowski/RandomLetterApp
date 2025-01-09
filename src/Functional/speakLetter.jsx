export default function speakLetter(randomLetter) {
  if ("speechSynthesis" in window) {
    const speak = new SpeechSynthesisUtterance(randomLetter.toLowerCase());
    speak.lang = "pl-PL";
    speak.rate = 0.8;
    speak.pitch = 0.9;

    const assignVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(
        (voice) => voice.name === "Google polski"
      );

      if (selectedVoice) {
        speak.voice = selectedVoice;
      } else {
        console.warn("Wybrany głos nie jest dostępny.");
      }

      window.speechSynthesis.speak(speak);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      assignVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = assignVoice;
    }
  } else {
    console.error(
      "API SpeechSynthesis nie jest obsługiwane w tej przeglądarce."
    );
  }
}
