import Subheader from "../../components/subheader/subheader";
import TeamDetailsCard from "../../components/teamDetailsCard/teamDetailsCard";
import "./teamDetailsPage.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { createPortal } from "react-dom";
import Modal from "../../components/modal/modal";

export default function TeamDetailsPage() {
  const apiURL = process.env.REACT_APP_API_URL;
  const { user_id, league_id, team_id } = useParams();

  const [teamData, setTeamData] = useState(null);

  const getTeamData = async () => {
    try {
      const { data } = await axios.get(
        `${apiURL}/api/teams/${user_id}/${league_id}/${team_id}`
      );
      setTeamData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeamData();
  }, []);

  const [showDeleteTeam, setShowDeleteTeam] = useState(false);

  const toggleDeleteTeamModal = () => {
    setShowDeleteTeam(!showDeleteTeam);
  };

  const [showEditTeam, setShowEditTeam] = useState(false);

  const toggleEditTeamModal = () => {
    setShowEditTeam(!showEditTeam);
  };

  return (
    <div className="team-details">
      {teamData && (
        <Subheader
          titleText={teamData.head_coach}
          isButton={false}
          backPath={`/league-table/${user_id}/${league_id}`}
        />
      )}
      {teamData && (
        <TeamDetailsCard
          name={teamData.name}
          points={teamData.points}
          faction={teamData.faction}
          teamValue={teamData.team_value}
          openDelete={toggleDeleteTeamModal}
          openEdit={toggleEditTeamModal}
        />
      )}
      {showEditTeam &&
        createPortal(
          <Modal
            closeFn={toggleEditTeamModal}
            type="editTeam"
            name={teamData.name}
            renderFn={getTeamData}
            currentData={teamData}
          />,
          document.getElementById(`root`)
        )}
      {showDeleteTeam &&
        createPortal(
          <Modal
            closeFn={toggleDeleteTeamModal}
            type="deleteTeam"
            name={teamData.name}
          />,
          document.getElementById(`root`)
        )}
    </div>
  );
}
