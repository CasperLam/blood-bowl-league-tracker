import edit_icon from "../../assets/icons/edit_icon.svg";
import delete_icon from "../../assets/icons/delete_icon.svg";
import "./leagueCard.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import Modal from "../modal/modal";

export default function LeagueCard({
  id,
  name,
  date,
  renderFn,
  League,
  user_id,
}) {
  const apiURL = process.env.REACT_APP_API_URL;

  const [showEditLeague, setShowEditLeague] = useState(false);

  const toggleEditLeagueModal = () => {
    setShowEditLeague(!showEditLeague);
  };

  const [showDeleteLeague, setShowDeleteLeague] = useState(false);

  const toggleDeleteLeagueModal = () => {
    setShowDeleteLeague(!showDeleteLeague);
  };

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
    <>
      <Link
        className="leagues__card"
        to={`/league-table/${id}`}
        state={{ name: name }}
      >
        <div className="leagues__header">
          <h3 className="leagues__name">{name}</h3>
          <div
            className="leagues__buttons"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <img
              src={edit_icon}
              alt="edit icon"
              className="leagues__icon"
              onClick={toggleEditLeagueModal}
            />
            <img
              src={delete_icon}
              alt="delete icon"
              className="leagues__icon"
              onClick={toggleDeleteLeagueModal}
            />
          </div>
        </div>
        <div className="leagues__img"></div>
        <div className="leagues__container">
          <p className="leagues_date">
            Created: {new Date(date).toLocaleDateString()}
          </p>
          <p className="leagues_teams">Teams: {teamCount}</p>
        </div>
      </Link>
      {showEditLeague &&
        createPortal(
          <Modal
            closeFn={toggleEditLeagueModal}
            type="editLeague"
            name={name}
            renderFn={renderFn}
            currentData={League}
            leagueCardId={id}
          />,
          document.getElementById(`root`)
        )}
      {showDeleteLeague &&
        createPortal(
          <Modal
            closeFn={toggleDeleteLeagueModal}
            type="deleteLeague"
            name={name}
            renderFn={renderFn}
            leagueCardId={id}
          />,
          document.getElementById(`root`)
        )}
    </>
  );
}
