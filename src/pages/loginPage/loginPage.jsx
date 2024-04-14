import { useEffect, useState } from "react";
import Divider from "../../components/divider/divider";
import "./loginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevformData) => ({ ...prevformData, [name]: value }));
  };

  const [error, setError] = useState("");

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.email) errors.email = "Email is required";
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
      const response = await axios.post(`${apiURL}/api/users/login`, formData);

      sessionStorage.setItem("token", response.data.token);

      nav("/my-leagues/1");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login">
      <h2 className="login__title">Login</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__wrapper">
          <label htmlFor="email" className="login__label">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="login__input"
            value={formData.email}
            onChange={changeHandler}
            placeholder="blood@bowl.com"
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
        {(error.email || error.password) && (
          <div className="login__error">Please complete all fields</div>
        )}
        <button className="login__btn" type="submit">
          Login
        </button>
      </form>
      <Divider />
      <h2 className="login__signup">Sign Up</h2>
      <Link to="/signup">
        <button className="login__signup-btn">Sign Up</button>
      </Link>
    </section>
  );
}
