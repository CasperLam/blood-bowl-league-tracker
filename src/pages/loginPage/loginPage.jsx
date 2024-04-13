import Divider from "../../components/divider/divider";
import "./loginPage.scss";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const apiURL = process.env.REACT_APP_API_URL;
  const nav = useNavigate();

  return (
    <sectoion className="login">
      <h2 className="login__title">Login</h2>
      <form className="login__form">
        <div className="login__wrapper">
          <label htmlFor="userName" className="login__label">
            Username:
          </label>
          <input
            type="text"
            id="userName"
            className="login__input"
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
            className="login__input"
            placeholder="password"
          />
        </div>
        <button className="login__btn" type="submit">
          Sign Up
        </button>
      </form>
      <Divider />
      <h2 className="login__signup">Login</h2>
      <Link to="/signup">
        <button className="login__signup-btn">Login</button>
      </Link>
    </sectoion>
  );
}
