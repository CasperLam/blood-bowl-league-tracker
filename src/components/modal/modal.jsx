import { useState } from "react";
import "./modal.scss";
import CreateTeamForm from "../createTeamForm/createTeamForm";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Modal({ closeFn, name, type, renderFn }) {
  const apiURL = process.env.REACT_APP_API_URL;
  const { user_id, league_id, team_id } = useParams();
  const [formData, setFormData] = useState({
    user_id: user_id,
    league_id: league_id,
    team_id: team_id,
    head_coach: "",
    name: "",
    faction: "",
    team_value: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const nav = useNavigate();

  const handleDeleteTeam = async () => {
    await axios.delete(
      `${apiURL}/api/teams/${user_id}/${league_id}/${team_id}`
    );
    nav(`/league-table/${user_id}/${league_id}`);
  };

  return (
    <div className="modal" onClick={closeFn}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        {type === "addTeam" && (
          <>
            <h2 className="modal__title">Add a Team</h2>
            <p className="modal__description">Add your team details here:</p>
            <CreateTeamForm
              formData={formData}
              changeHandler={changeHandler}
              closeFn={closeFn}
              renderFn={renderFn}
            />
          </>
        )}

        {/* {type === "edit" && (
          return <></>
        )} */}

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
