import { useEffect, useState } from "react";
import axios from "axios";
import "./editTeamForm.scss";

export default function EditTeamForm({
  teamFormData,
  teamChangeHandler,
  closeFn,
  renderFn,
}) {
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!teamFormData.head_coach)
      errors.head_coach = "Head coach name is required";
    if (!teamFormData.faction) errors.faction = "Faction is required";
    if (!teamFormData.name) errors.name = "Name is required";
    if (!teamFormData.team_value) errors.team_value = "Team value is required";
    if (!teamFormData.points && teamFormData.points != 0)
      errors.points = "Points should not be empty";

    isValid = Object.keys(errors).length === 0;

    setFormErrors(errors);
    return isValid;
  };

  useEffect(() => {
    setFormErrors({});
  }, []);

  const apiURL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = { ...teamFormData };
      await axios.put(
        `${apiURL}/api/teams/${teamFormData.user_id}/${teamFormData.league_id}/${teamFormData.team_id}`,
        payload
      );
      renderFn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="edit-team-form" onSubmit={handleSubmit}>
      <div className="edit-team-form__container">
        <div className="edit-team-form__half">
          <div className="edit-team-form__wrapper">
            <label htmlFor="head_coach" className="edit-team-form__label">
              Head Coach:
            </label>
            <input
              type="text"
              id="head_coach"
              name="head_coach"
              className={`edit-team-form__input ${
                formErrors.head_coach && !teamFormData.head_coach
                  ? "edit-team-form__input--error"
                  : ""
              }`}
              value={teamFormData.head_coach}
              onChange={teamChangeHandler}
              placeholder="Bob Bifford"
            />
          </div>
          <div className="edit-team-form__wrapper">
            <label htmlFor="name" className="edit-team-form__label">
              Team Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`edit-team-form__input ${
                formErrors.name && !teamFormData.name
                  ? "edit-team-form__input--error"
                  : ""
              }`}
              value={teamFormData.name}
              onChange={teamChangeHandler}
              placeholder="A Biffing Good Time"
            />
          </div>
          <div className="edit-team-form__wrapper">
            <label htmlFor="points" className="edit-team-form__label">
              Points:
            </label>
            <input
              type="text"
              id="points"
              name="points"
              className={`edit-team-form__input ${
                formErrors.points && !teamFormData.points
                  ? "edit-team-form__input--error"
                  : ""
              }`}
              value={teamFormData.points}
              onChange={teamChangeHandler}
              placeholder="Points"
            />
          </div>
        </div>
        <div className="edit-team-form__half">
          <div className="edit-team-form__wrapper">
            <label htmlFor="faction" className="edit-team-form__label">
              Faction:
            </label>
            <input
              type="text"
              id="faction"
              name="faction"
              className={`edit-team-form__input ${
                formErrors.faction && !teamFormData.faction
                  ? "edit-team-form__input--error"
                  : ""
              }`}
              value={teamFormData.faction}
              onChange={teamChangeHandler}
            />
          </div>
          <div className="edit-team-form__wrapper">
            <label htmlFor="team_value" className="edit-team-form__label">
              Team Value:
            </label>
            <input
              type="text"
              id="team_value"
              name="team_value"
              className={`edit-team-form__input ${
                formErrors.team_value && !teamFormData.team_value
                  ? "edit-team-form__input--error"
                  : ""
              }`}
              value={teamFormData.team_value}
              onChange={teamChangeHandler}
              placeholder="1000k"
            />
          </div>
        </div>
      </div>
      {(formErrors.head_coach ||
        formErrors.name ||
        formErrors.faction ||
        formErrors.team_value ||
        formErrors.points) && (
        <p className="edit-team-form__error">Please complete all fields</p>
      )}
      <div className="edit-team-form__buttons">
        <button className="edit-team-form__close" onClick={closeFn}>
          Close
        </button>
        <button className="edit-team-form__action" type="submit">
          Edit
        </button>
      </div>
    </form>
  );
}
