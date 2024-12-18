import { useState } from "react";
import style from "./keyboard.module.css";

function Keyboard({ randomLetter, isGameStarted }) {
  const [rows, setRows] = useState([
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ]);

  return (
    <div className={style.container}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={style.row}>
          {row.map((letter, index) => (
            <button
              style={
                randomLetter === letter.toUpperCase() && isGameStarted
                  ? { backgroundColor: "orange" }
                  : {}
              }
              className={style.letterButton}
              key={index}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
