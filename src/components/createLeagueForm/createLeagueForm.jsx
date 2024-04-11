import { useEffect, useState } from "react";
import axios from "axios";
import "./createLeagueForm.scss";

export default function CreateLeagueForm({
  leagueFormData,
  leagueChangeHandler,
  closeFn,
  renderFn,
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
      await axios.post(`${apiURL}/api/leagues`, leagueFormData);
      renderFn();
      closeFn();
    } catch (error) {
      console.log(error);
      alert(`Failed to add league, please try again.`);
    }
  };

  return (
    <form className="create-league-form" onSubmit={handleSubmit}>
      <div className="create-league-form__wrapper">
        <label htmlFor="name" className="create-league-form__label">
          League Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`create-league-form__input ${
            formErrors.name && !leagueFormData.name
              ? "create-league-form__input--error"
              : ""
          }`}
          value={leagueFormData.name}
          onChange={leagueChangeHandler}
          placeholder="A Biffing Good Time"
        />
      </div>
      {formErrors.name && (
        <p className="create-league-form__error">Please complete all fields</p>
      )}
      <div className="create-league-form__buttons">
        <button className="create-league-form__close" onClick={closeFn}>
          Close
        </button>
        <button className="create-league-form__action" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}
