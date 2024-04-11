import { useState } from "react";
import "./modal.scss";
import CreateTeamForm from "../createTeamForm/createTeamForm";

export default function Modal({
  closeFn,
  name,
  type,
  user_id,
  league_id,
  team_id,
  renderFn,
}) {
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

  return (
    <div className="modal" onClick={closeFn}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        {type === "add" && (
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

        {type === "delete" && (
          <>
            <h2 className="modal__title">{`Delete ${name}`}</h2>
            <p className="modal__description">
              Deleting is <b>permanent!</b>
              <br />
              Are you sure you want to proceed?
            </p>
          </>
        )}
      </div>
    </div>
  );
}
