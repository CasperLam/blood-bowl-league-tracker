import edit_icon from "../../assets/icons/edit_icon.svg";
import delete_icon from "../../assets/icons/delete_icon.svg";
import "./teamDetailsCard.scss";

export default function TeamDetailsCard({
  name,
  points,
  faction,
  teamValue,
  openDelete,
}) {
  return (
    <section className="details">
      <header className="details__header">
        <h3 className="details__title">Team Info</h3>
        <div className="details__buttons">
          <img src={edit_icon} alt="edit icon" className="details__icon" />
          <img
            src={delete_icon}
            alt="delete icon"
            className="details__icon"
            onClick={openDelete}
          />
        </div>
      </header>
      <div className="details__content">
        <div className="details__wrapper">
          <div className="details__text">
            <p className="details__key">Team Name:</p>
            <p className="details__value">{name}</p>
          </div>
          <div className="details__text">
            <p className="details__key">Points:</p>
            <p className="details__value">{points}</p>
          </div>
        </div>
        <div className="details__wrapper">
          <div className="details__text">
            <p className="details__key">Faction:</p>
            <p className="details__value">{faction}</p>
          </div>
          <div className="details__text">
            <p className="details__key">Team Value:</p>
            <p className="details__value">{teamValue}</p>
          </div>
        </div>
        <div className="details__img"></div>
        {/* <img src=if (img file) else (default img) alt="" className="details__img" /> this is to create dynamic team logos */}
      </div>
    </section>
  );
}
