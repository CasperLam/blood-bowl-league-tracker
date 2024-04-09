import Subheader from "../../components/subheader/subheader";
import "./leagueTablePage.scss";

export default function LeagueTablePage() {
  return (
    <div className="leagueTable">
      <Subheader
        titleText="Lustrian Superleague"
        isButton={true}
        buttonText="+ Add Team"
        buttonFunction=""
      />
      <table className="table">
        <thead className="table__header">
          <tr>
            <td className="table__heads">Team Name</td>
            <td className="table__heads">Faction</td>
            <td className="table__heads">Head Coach</td>
            <td className="table__heads">Points</td>
            <td className="table__heads">W/D/L</td>
            <td className="table__heads">TD Scored</td>
            <td className="table__heads">TD Conceded</td>
            <td className="table__heads">TD Difference</td>
            <td className="table__heads">Team Value</td>
          </tr>
        </thead>
        <tr>
          <td className="table__text">Gwaka'moli Crater Gators</td>
          <td className="table__text">Lizardmen</td>
          <td className="table__text">Kroq-Gar Scalecaller</td>
          <td className="table__text">0</td>
          <td className="table__text">0</td>
          <td className="table__text">0</td>
          <td className="table__text">0</td>
          <td className="table__text">0</td>
          <td className="table__text">990</td>
        </tr>
        <tr>
          <td className="table__text">Gwaka'moli Crater Gators</td>
          <td className="table__text">Lizardmen</td>
          <td className="table__text">Kroq-Gar Scalecaller</td>
          <td className="table__text">0</td>
          <td className="table__text">0</td>
          <td className="table__text">0</td>
          <td className="table__text">0</td>
          <td className="table__text">0</td>
          <td className="table__text">990</td>
        </tr>
      </table>
    </div>
  );
}
