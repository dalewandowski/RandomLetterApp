import { Mail } from "lucide-react";
import style from "./footer.module.css";

function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.textFooter}>
        Copyright &copy; {new Date().getFullYear()} | Damian Lewandowski
        &nbsp;&nbsp;
        <Mail size={15} /> d.lewandowski94@onet.pl{" "}
      </p>
    </footer>
  );
}

export default Footer;
