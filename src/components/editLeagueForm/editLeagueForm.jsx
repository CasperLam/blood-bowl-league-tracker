import { useEffect, useState } from "react";
import axios from "axios";
import "./editLeagueForm.scss";

export default function EditLeagueForm({
  leagueFormData,
  leagueChangeHandler,
  closeFn,
  renderFn,
  leagueCardId,
}) {
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!leagueFormData.name) errors.name = "League name is required";

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
      await axios.put(
        `${apiURL}/api/leagues/${leagueFormData.user_id}/${leagueCardId}`,
        leagueFormData
      );
      renderFn();
      closeFn();
    } catch (error) {
      console.log(error);
      alert(`Failed to edit league, please try again.`);
    }
  };

  return (
    <form className="edit-league-form" onSubmit={handleSubmit}>
      <div className="edit-league-form__wrapper">
        <label htmlFor="name" className="edit-league-form__label">
          League Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`edit-league-form__input ${
            formErrors.name && !leagueFormData.name
              ? "edit-league-form__input--error"
              : ""
          }`}
          value={leagueFormData.name}
          onChange={leagueChangeHandler}
          placeholder="Blood Bowl League"
        />
      </div>
      {formErrors.name && (
        <p className="edit-league-form__error">Please complete all fields</p>
      )}
      <div className="edit-league-form__buttons">
        <button className="edit-league-form__close" onClick={closeFn}>
          Close
        </button>
        <button className="edit-league-form__action" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}
