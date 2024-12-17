import { useState } from "react";
import style from "./keyboard.module.css";

function Keyboard({ randomLetter }) {
  const [letters, setLetters] = useState(
    Array(26)
      .fill(0)
      .map((_, i) => String.fromCharCode(i + 97))
  );

  return (
    <div className={style.container}>
      {letters.map((letter, index) => (
        <button
          style={randomLetter === letter ? { backgroundColor: "orange" } : {}}
          className={style.letterButton}
          key={index}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;
