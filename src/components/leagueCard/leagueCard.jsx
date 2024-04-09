import edit_icon from "../../assets/icons/edit_icon.svg";
import delete_icon from "../../assets/icons/delete_icon.svg";
import "./leagueCard.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LeagueCard({ id, name, date }) {
  const apiURL = process.env.REACT_APP_API_URL;
  const { user_id } = useParams();

  const [teamCount, setTeamCount] = useState(0);

  const getTeamCount = async () => {
    try {
      const { data } = await axios.get(
        `${apiURL}/api/leagues/${user_id}/${id}`
      );
      setTeamCount(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeamCount();
  }, []);

  return (
    <Link
      className="leagues__card"
      to={`/league-table/${user_id}/${id}`}
      state={{ name: name }}
    >
      <h3 className="leagues__name">{name}</h3>
      <div className="leagues__buttons">
        <img src={edit_icon} alt="edit icon" className="leagues__icon" />
        <img src={delete_icon} alt="delete icon" className="leagues__icon" />
      </div>
      <div className="leagues__img"></div>
      <div className="leagues__container">
        <p className="leagues_date">
          Created: {new Date(date).toLocaleDateString()}
        </p>
        <p className="leagues_teams">Teams: {teamCount}</p>
      </div>
    </Link>
  );
}
