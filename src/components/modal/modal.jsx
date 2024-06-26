import { useState } from "react";
import "./modal.scss";
import CreateTeamForm from "../createTeamForm/createTeamForm";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditTeamForm from "../editTeamForm/editTeamForm";
import CreateLeagueForm from "../createLeagueForm/createLeagueForm";
import EditLeagueForm from "../editLeagueForm/editLeagueForm";

export default function Modal({
  closeFn,
  name,
  type,
  renderFn,
  currentData,
  leagueCardId,
}) {
  const apiURL = process.env.REACT_APP_API_URL;
  const user_id = sessionStorage.getItem("user_id");
  const { league_id, team_id } = useParams();
  const [teamFormData, setTeamFormData] = useState(
    currentData
      ? {
          user_id: user_id,
          league_id: league_id,
          team_id: team_id,
          head_coach: currentData.head_coach,
          name: currentData.name,
          faction: currentData.faction,
          team_value: currentData.team_value,
          points: currentData.points,
        }
      : {
          user_id: user_id,
          league_id: league_id,
          team_id: team_id,
          head_coach: "",
          name: "",
          faction: "",
          team_value: "",
          points: "0",
        }
  );

  const teamChangeHandler = (event) => {
    const { name, value } = event.target;
    setTeamFormData((prevteamFormData) => ({
      ...prevteamFormData,
      [name]: value,
    }));
  };

  const [leagueFormData, setleagueFormData] = useState(
    currentData
      ? {
          user_id: user_id,
          league_id: league_id,
          name: currentData.name,
        }
      : {
          user_id: user_id,
          league_id: league_id,
          name: "",
        }
  );

  const leagueChangeHandler = (event) => {
    const { name, value } = event.target;
    setleagueFormData((prevleagueFormData) => ({
      ...prevleagueFormData,
      [name]: value,
    }));
  };

  const nav = useNavigate();

  const handleDeleteTeam = async () => {
    await axios.delete(
      `${apiURL}/api/teams/${user_id}/${league_id}/${team_id}`
    );
    nav(`/league-table/${league_id}`);
  };

  const handleDeleteLeague = async (league_id) => {
    await axios.delete(`${apiURL}/api/leagues/${user_id}/${league_id}`);
    closeFn();
    renderFn();
  };

  return (
    <div className="modal" onClick={closeFn}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        {type === "addLeague" && (
          <>
            <h2 className="modal__title">Add a League</h2>
            <p className="modal__description">Add your league details here:</p>
            <CreateLeagueForm
              leagueFormData={leagueFormData}
              leagueChangeHandler={leagueChangeHandler}
              closeFn={closeFn}
              renderFn={renderFn}
            />
          </>
        )}

        {type === "editLeague" && (
          <>
            <h2 className="modal__title">{`Edit ${name}`}</h2>
            <p className="modal__description">Edit your team's details here:</p>
            <EditLeagueForm
              leagueFormData={leagueFormData}
              leagueChangeHandler={leagueChangeHandler}
              closeFn={closeFn}
              renderFn={renderFn}
              leagueCardId={leagueCardId}
            />
          </>
        )}

        {type === "deleteLeague" && (
          <>
            <h2 className="modal__title">{`Delete ${name}`}</h2>
            <p className="modal__description">
              Deleting is <b>permanent!</b>
              <br />
              Are you sure you want to proceed?
            </p>
            <div className="modal__buttons">
              <button className="modal__close" onClick={closeFn}>
                Close
              </button>
              <button
                className="modal__action"
                onClick={() => {
                  handleDeleteLeague(leagueCardId);
                }}
              >
                Delete
              </button>
            </div>
          </>
        )}

        {type === "addTeam" && (
          <>
            <h2 className="modal__title">Add a Team</h2>
            <p className="modal__description">Add your team details here:</p>
            <CreateTeamForm
              teamFormData={teamFormData}
              teamChangeHandler={teamChangeHandler}
              closeFn={closeFn}
              renderFn={renderFn}
            />
          </>
        )}

        {type === "editTeam" && (
          <>
            <h2 className="modal__title">{`Edit ${name}`}</h2>
            <p className="modal__description">Edit your team's details here:</p>
            <EditTeamForm
              teamFormData={teamFormData}
              teamChangeHandler={teamChangeHandler}
              closeFn={closeFn}
              renderFn={renderFn}
            />
          </>
        )}

        {type === "deleteTeam" && (
          <>
            <h2 className="modal__title">{`Delete ${name}`}</h2>
            <p className="modal__description">
              Deleting is <b>permanent!</b>
              <br />
              Are you sure you want to proceed?
            </p>
            <div className="modal__buttons">
              <button className="modal__close" onClick={closeFn}>
                Close
              </button>
              <button className="modal__action" onClick={handleDeleteTeam}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
