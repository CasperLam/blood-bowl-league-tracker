import "./header.scss";
import burger from "../../assets/icons/Burger.svg";
import close from "../../assets/icons/Cross.svg";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { pathname } = useLocation();
  const isButtonVisible = (pathname) => {
    let showButton = false;
    if (pathname === "/signup" || pathname === "/login") {
      return (showButton = true);
    }
    return showButton;
  };

  return (
    <header className="header">
      <div
        className={`header__container ${
          isButtonVisible(pathname) ? "header__container--centered" : ""
        }`}
      >
        <Link to={`/1`}>
          <h1 className="header__title header__title--mobile">BBLT</h1>
          <h1 className="header__title">Blood Bowl League Tracker</h1>
        </Link>
        {!isButtonVisible(pathname) && (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}
