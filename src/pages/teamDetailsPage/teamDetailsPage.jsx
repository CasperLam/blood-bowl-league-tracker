import Subheader from "../../components/subheader/subheader";
import "./teamDetailsPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import TeamDetailsCard from "../../components/teamDetailsCard/teamDetailsCard";

export default function TeamDetailsPage() {
  const apiURL = `http://localhost:5050`;
  const user_id = 1;
  const league_id = 1;
  const team_id = 1;

  const [teamData, setTeamData] = useState(null);

  const getTeamData = async () => {
    try {
      const { data } = await axios.get(
        `${apiURL}/api/teams/1/1/2`
        // `${apiURL}/api/teams/${user_id}/${league_id}/${team_id}`
      );
      setTeamData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeamData();
  }, []);

  return (
    <div className="team-details">
      <Subheader
        titleText="Kroq-Gar Scalecaller"
        isButton={false}
        buttonText="+ Add Team"
        buttonFunction=""
      />
      {teamData && (
        <TeamDetailsCard
          name={teamData.name}
          points={teamData.points}
          faction={teamData.faction}
          teamValue={teamData.team_value}
        />
      )}
    </div>
  );
}
