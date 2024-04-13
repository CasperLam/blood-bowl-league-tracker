import { useState } from "react";
import "./signupPage.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/divider/divider";

export default function SignupPage() {
  const apiURL = process.env.REACT_APP_API_URL;
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${apiURL}/api/users/register`, {
        email: event.target.email.value,
        password: event.target.password.value,
        userName: event.target.userName.value,
      });
      nav("/login");
    } catch (error) {
      event.target.reset();
      setError(error.response.data);
    }
  };

  return (
    <section className="signup">
      <h2 className="signup__title">Sign Up</h2>
      <form className="signup__form" onSubmit={handleSubmit}>
        <div className="signup__wrapper">
          <label htmlFor="email" className="signup__label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="signup__input"
            placeholder="blood@bowl.co.uk"
          />
        </div>
        <div className="signup__wrapper">
          <label htmlFor="userName" className="signup__label">
            Username:
          </label>
          <input
            type="text"
            id="userName"
            className="signup__input"
            placeholder="number-1-coach"
          />
        </div>
        <div className="signup__wrapper">
          <label htmlFor="password" className="signup__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="signup__input"
            placeholder="password"
          />
        </div>
        <div className="signup__wrapper">
          <label htmlFor="confirmPassword" className="signup__label">
            Confirm password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="signup__input"
            placeholder="password"
          />
        </div>
        <button className="signup__btn" type="submit">
          Sign Up
        </button>
      </form>
      <Divider />
      <h2 className="signup__login">Login</h2>
      <Link to="/login">
        <button className="signup__login-btn">Login</button>
      </Link>
    </section>
  );
}
