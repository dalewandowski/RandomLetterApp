import style from "../RandomLetter/randomLetter.module.css";
function Challenge({ onClickHandler }) {
  return (
    <button className={style.startButton} onClick={onClickHandler}>
      Get Challenge !
    </button>
  );
}

export default Challenge;
