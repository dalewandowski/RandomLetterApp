import { useEffect, useState } from "react";
import style from "./clock.module.css";

function DigitalClock() {
  const [fullTime, setFullTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const clock = new Date();
      let hours = String(clock.getHours()).padStart(2, "0");
      let minutes = String(clock.getMinutes()).padStart(2, "0");
      let sec = String(clock.getSeconds()).padStart(2, "0");
      setFullTime(`${hours}:${minutes}:${sec}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className={style.clock}>{`${fullTime}`}</div>;
}

export default DigitalClock;
