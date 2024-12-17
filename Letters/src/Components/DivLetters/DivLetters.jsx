import { useState } from "react";
import style from "./divletters.module.css";
function DivLetters() {
  const [letters, setLetters] = useState(
    Array(26)
      .fill(0)
      .map((_, i) => String.fromCharCode(i + 97))
  );

  return (
    <div className={style.container}>
      {letters.map((letter, index) => (
        <div
          tabIndex={0}
          onKeyDown={(e) => {
            console.log(e.key.toUpperCase());
          }}
          className={style.letterDiv}
          key={index}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}

export default DivLetters;
