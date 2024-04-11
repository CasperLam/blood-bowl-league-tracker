import { useEffect, useState } from "react";
import axios from "axios";
import "./createTeamForm.scss";

export default function CreateTeamForm({
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
      await axios.post(`${apiURL}/api/teams`, teamFormData);
      renderFn();
      closeFn();
    } catch (error) {
      console.log(error);
      alert(`Failed to add team, please try again.`);
    }
  };

  return (
    <form className="create-team-form" onSubmit={handleSubmit}>
      <div className="create-team-form__container">
        <div className="create-team-form__half">
          <div className="create-team-form__wrapper">
            <label htmlFor="head_coach" className="create-team-form__label">
              Head Coach:
            </label>
            <input
              type="text"
              id="head_coach"
              name="head_coach"
              className={`create-team-form__input ${
                formErrors.head_coach && !teamFormData.head_coach
                  ? "create-team-form__input--error"
                  : ""
              }`}
              value={teamFormData.head_coach}
              onChange={teamChangeHandler}
              placeholder="Bob Bifford"
            />
          </div>
          <div className="create-team-form__wrapper">
            <label htmlFor="name" className="create-team-form__label">
              Team Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`create-team-form__input ${
                formErrors.name && !teamFormData.name
                  ? "create-team-form__input--error"
                  : ""
              }`}
              value={teamFormData.name}
              onChange={teamChangeHandler}
              placeholder="A Biffing Good Time"
            />
          </div>
        </div>
        <div className="create-team-form__half">
          <div className="create-team-form__wrapper">
            <label htmlFor="faction" className="create-team-form__label">
              Faction:
            </label>
            <input
              type="text"
              id="faction"
              name="faction"
              className={`create-team-form__input ${
                formErrors.faction && !teamFormData.faction
                  ? "create-team-form__input--error"
                  : ""
              }`}
              value={teamFormData.faction}
              onChange={teamChangeHandler}
            />
          </div>
          <div className="create-team-form__wrapper">
            <label htmlFor="team_value" className="create-team-form__label">
              Team Value:
            </label>
            <input
              type="text"
              id="team_value"
              name="team_value"
              className={`create-team-form__input ${
                formErrors.team_value && !teamFormData.team_value
                  ? "create-team-form__input--error"
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
        formErrors.team_value) && (
        <p className="create-team-form__error">Please complete all fields</p>
      )}
      <div className="create-team-form__buttons">
        <button className="create-team-form__close" onClick={closeFn}>
          Close
        </button>
        <button className="create-team-form__action" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}
