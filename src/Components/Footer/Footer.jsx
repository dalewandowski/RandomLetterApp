import { Mail } from "lucide-react";
import style from "./footer.module.css";

function Footer() {
  return (
    <div className={style.footer}>
      <p className={style.textFooter}>
        &copy; All Rights Reserved {new Date().getFullYear()} Damian Lewandowski
        &nbsp;&nbsp;
        <Mail size={15} /> d.lewandowski94@onet.pl{" "}
      </p>
    </div>
  );
}

export default Footer;
