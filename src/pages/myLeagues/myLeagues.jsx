import LeagueCard from "../../components/leagueCard/leagueCard";
import "./myLeagues.scss";

export default function MyLeagues() {
  return (
    <div className="myLeagues">
      <section className="subheader">
        <h2 className="subheader__text">My Leagues</h2>
        <button className="subheader__btn">+ Add League</button>
      </section>
      <section className="leagues">
        <LeagueCard />
        <LeagueCard />
      </section>
    </div>
  );
}
