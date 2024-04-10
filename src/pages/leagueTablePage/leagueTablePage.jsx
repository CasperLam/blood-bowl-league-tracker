import Table from "../../components/leagueTable/table";
import Subheader from "../../components/subheader/subheader";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./leagueTablePage.scss";
import axios from "axios";

export default function LeagueTablePage() {
  const apiURL = process.env.REACT_APP_API_URL;
  const { user_id, league_id } = useParams();

  const location = useLocation();
  const { name } = location.state;

  const [leagueData, setLeagueData] = useState(null);

  const getLeagueData = async () => {
    try {
      const { data } = await axios.get(
        `${apiURL}/api/leagues/${user_id}/${league_id}`
      );
      setLeagueData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeagueData();
  }, []);

  return (
    <div className="leagueTable">
      <Subheader
        titleText={name}
        isButton={true}
        buttonText="+ Add Team"
        buttonFunction=""
      />
      {leagueData && <Table leagueData={leagueData} />}
      {/* <table className="table">
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
      </table> */}
    </div>
  );
}
