import "./header.scss";
import burger from "../../assets/icons/Burger.svg";
import close from "../../assets/icons/Cross.svg";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title header__title--mobile">BBLT</h1>
        <h1 className="header__title">Blood Bowl League Tracker</h1>
        <button className="header__btn">Log Out</button>
        <img
          src={burger}
          alt="menu icon"
          className="header__burger"
          onClick={toggleMenu}
        />
        {isOpen && (
          <div className="mobile-nav">
            <img
              src={close}
              alt="close icon"
              className="mobile-nav__close"
              onClick={toggleMenu}
            />
            <button className="mobile-nav__btn">Log Out</button>
          </div>
        )}
      </div>
    </header>
  );
}
