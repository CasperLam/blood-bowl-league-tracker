import edit_icon from "../../assets/icons/edit_icon.svg";
import delete_icon from "../../assets/icons/delete_icon.svg";
import "./leagueCard.scss";

export default function LeagueCard({ name, date, teams }) {
  return (
    <article className="leagues__card">
      <h3 className="leagues__name">Name</h3>
      <div className="leagues__img"></div>
      <div className="leagues__container">
        <p className="leagues_date">Created: 20/3/24</p>
        <p className="leagues_teams">Teams: 10</p>
        <div className="leagues__buttons">
          <img src={edit_icon} alt="edit icon" className="leagues__icon" />
          <img src={delete_icon} alt="delete icon" className="leagues__icon" />
        </div>
      </div>
    </article>
  );
}
