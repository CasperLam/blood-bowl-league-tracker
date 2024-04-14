import { useEffect, useState } from "react";
import Divider from "../../components/divider/divider";
import "./loginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevformData) => ({ ...prevformData, [name]: value }));
  };

  const [error, setError] = useState("");

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.username) errors.username = "Username is required";
    if (!formData.password) errors.password = "Password is required";

    isValid = Object.keys(errors).length === 0;

    setError(errors);
    return isValid;
  };

  useEffect(() => {
    setError({});
  }, []);

  const apiURL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${apiURL}/api/users/login`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login">
      <h2 className="login__title">Login</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__wrapper">
          <label htmlFor="username" className="login__label">
            username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="login__input"
            value={formData.username}
            onChange={changeHandler}
            placeholder="number-1-coach"
          />
        </div>
        <div className="login__wrapper">
          <label htmlFor="password" className="login__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="login__input"
            value={formData.password}
            onChange={changeHandler}
            placeholder="password"
          />
        </div>
        {(error.username || error.password) && (
          <div className="login__error">Please complete all fields</div>
        )}
        <button className="login__btn" type="submit">
          Sign Up
        </button>
      </form>
      <Divider />
      <h2 className="login__signup">Login</h2>
      <Link to="/signup">
        <button className="login__signup-btn">Login</button>
      </Link>
    </section>
  );
}
