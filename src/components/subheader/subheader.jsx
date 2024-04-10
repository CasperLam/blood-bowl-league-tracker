import { useNavigate } from "react-router-dom";
import arrow_icon from "../../assets/icons/arrow_icon.svg";
import "./subheader.scss";

export default function Subheader({
  titleText,
  isButton,
  buttonText,
  buttonFunction,
}) {
  const navigate = useNavigate();

  return (
    <>
      <section className="subheader">
        <div className="subheader__wrapper">
          <img
            className="subheader__icon"
            src={arrow_icon}
            alt="back arrow icon"
            onClick={() => navigate(-1)}
          />
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
