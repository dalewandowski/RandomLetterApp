import { useState } from "react";
import style from "./keyboard.module.css";
import { motion } from "motion/react";

function Keyboard({ randomLetter, onClick }) {
  const [rows, setRows] = useState([
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ]);

  return (
    <div>
      <motion.div
        initial={{ x: -2000 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className={style.container}
      >
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={style.row}>
            {row.map((letter, index) => (
              <button
                onClick={() => onClick(letter)}
                style={
                  randomLetter === letter.toUpperCase()
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
      </motion.div>
    </div>
  );
}

export default Keyboard;
