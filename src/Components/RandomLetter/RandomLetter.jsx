import { useState, useEffect } from "react";
import Keyboard from "../Keyboard/Keyboard";
import style from "./randomletter.module.css";
function RandomLetter() {
  const [randomLetter, setRandomLetter] = useState("");

  const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * 26);
    const randomLetter = String.fromCharCode(randomIndex + 97);
    setRandomLetter(randomLetter);
    console.log(randomLetter);
  };

  useEffect(() => {
    getRandomLetter();
  }, []);

  useEffect(() => {
    const handleKeyup = (e) => {
      if (e.key === randomLetter) {
        getRandomLetter();
      }
    };
    window.addEventListener("keyup", handleKeyup);
    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [randomLetter]);

  return (
    <>
      <h1 className={style.randomLetter}>{randomLetter.toUpperCase()}</h1>
      <Keyboard randomLetter={randomLetter} />
    </>
  );
}

export default RandomLetter;
