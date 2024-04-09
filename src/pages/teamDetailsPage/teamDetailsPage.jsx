import edit_icon from "../../assets/icons/edit_icon.svg";
import delete_icon from "../../assets/icons/delete_icon.svg";
import Subheader from "../../components/subheader/subheader";
import "./teamDetailsPage.scss";

export default function TeamDetailsPage() {
  return (
    <div className="team-details">
      <Subheader
        titleText="Kroq-Gar Scalecaller"
        isButton={false}
        buttonText="+ Add Team"
        buttonFunction=""
      />
      <section className="details">
        <header className="details__header">
          <h3 className="details__title">Team Info</h3>
          <div className="details__buttons">
            <img src={edit_icon} alt="edit icon" className="details__icon" />
            <img
              src={delete_icon}
              alt="delete icon"
              className="details__icon"
            />
          </div>
        </header>
        <div className="details__content">
          <div className="details__wrapper">
            <div className="details__text">
              <p className="details__key">Team Name:</p>
              <p className="details__value">Gwaka'moli Crater Gators</p>
            </div>
            <div className="details__text">
              <p className="details__key">Points:</p>
              <p className="details__value">0</p>
            </div>
          </div>
          <div className="details__wrapper">
            <div className="details__text">
              <p className="details__key">Faction:</p>
              <p className="details__value">Lizardmen</p>
            </div>
            <div className="details__text">
              <p className="details__key">Team Value:</p>
              <p className="details__value">990</p>
            </div>
          </div>
          <div className="details__img"></div>
          {/* <img src=if (img file) else (default img) alt="" className="details__img" /> */}
        </div>
      </section>
    </div>
  );
}
