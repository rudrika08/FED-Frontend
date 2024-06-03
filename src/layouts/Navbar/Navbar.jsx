import style from "./style/Navbar.module.scss";
import logo from "../../assets/images/Logo/logo.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={style.nav}>
       <Link to="./">
      <div className={style.logo_div}>
        <div className={style.logo}> </div>
        <div className={style.logo_text}></div>
      </div>
      </Link>

      <ul className={style.navItems}>
        <Link to="./">
          {" "}
          <li className={style.navLink}>Home</li>
        </Link>
        <Link to="./EventCards">
          {" "}
          <li>Events</li>
        </Link>
        <Link to="./social">
          <li className={style.navLink}>Social</li>
        </Link>
        <Link to="./">
          <li className={style.navLink}>Team</li>
        </Link>
      </ul>
      <Link to="./register">
      <button className={style.authButton}>Login/Sign up</button>
      </Link>
    </nav>
  );
}
