import { useEffect, useState } from "react";
import "./signupPage.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/divider/divider";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    // confirm_password: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevformData) => ({ ...prevformData, [name]: value }));
  };

  const [error, setError] = useState("");

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.email) errors.email = "Email is required";
    if (!formData.username) errors.username = "Username is required";
    if (!formData.password) errors.password = "Password is required";
    // if (!formData.confirm_password)
    //   errors.confirm_password = "Passwords must match";

    isValid = Object.keys(errors).length === 0;

    setError(errors);
    return isValid;
  };

  useEffect(() => {
    setError({});
  }, []);

  const apiURL = process.env.REACT_APP_API_URL;
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${apiURL}/api/users/register`, formData);
      nav("/");
    } catch (error) {
      console.log(error);
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
            name="email"
            className="signup__input"
            value={formData.email}
            onChange={changeHandler}
            placeholder="blood@bowl.co.uk"
          />
        </div>
        <div className="signup__wrapper">
          <label htmlFor="username" className="signup__label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="signup__input"
            value={formData.username}
            onChange={changeHandler}
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
            name="password"
            className="signup__input"
            value={formData.password}
            onChange={changeHandler}
            placeholder="password"
          />
        </div>
        {/* <div className="signup__wrapper">
          <label htmlFor="confirm_password" className="signup__label">
            Confirm password:
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={changeHandler}
            className="signup__input"
            placeholder="password"
          />
        </div> */}
        {(error.username || error.email || error.password) && ( // || error.confirm_password
          <div className="signup__error">Please complete all fields</div>
        )}
        {/* {error.password === error.confirm_password && (
          <div className="signup__error">Passwords must match</div>
        )} */}
        <button className="signup__btn" type="submit">
          Sign Up
        </button>
      </form>
      <Divider />
      <h2 className="signup__login">Login</h2>
      <Link to="/">
        <button className="signup__login-btn">Login</button>
      </Link>
    </section>
  );
}
