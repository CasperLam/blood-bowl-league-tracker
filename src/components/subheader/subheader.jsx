import { Link } from "react-router-dom";
import arrow_icon from "../../assets/icons/arrow_icon.svg";
import "./subheader.scss";

export default function Subheader({
  titleText,
  isButton,
  buttonText,
  buttonFunction,
  backPath,
}) {
  return (
    <>
      <section className="subheader">
        <div className="subheader__wrapper">
          {backPath !== "none" && (
            <Link to={backPath}>
              <img
                className="subheader__icon"
                src={arrow_icon}
                alt="back arrow icon"
              />
            </Link>
          )}
          <h2 className="subheader__text">{titleText}</h2>
        </div>
        {isButton && (
          <button className="subheader__btn" onClick={buttonFunction}>
            {buttonText}
          </button>
        )}
      </section>
    </>
  );
}
