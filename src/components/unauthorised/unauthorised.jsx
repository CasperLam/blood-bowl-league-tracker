import { Link, useNavigate } from "react-router-dom";
import "./unauthorised.scss";

export default function Unauthorised() {
  const nav = useNavigate();

  setTimeout(() => {
    nav(`/`);
  }, 3000);

  return (
    <main className="unauthorised">
      <h2>You must be logged in to see this page.</h2>
      <button className="unauthorised__btn">
        <Link to="/">Login</Link>
      </button>
    </main>
  );
}
