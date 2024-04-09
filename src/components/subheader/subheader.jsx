import "./subheader.scss";

export default function Subheader({
  titleText,
  isButton,
  buttonText,
  buttonFunction,
}) {
  return (
    <section className="subheader">
      <h2 className="subheader__text">{titleText}</h2>
      {isButton && <button className="subheader__btn">{buttonText}</button>}
    </section>
  );
}
