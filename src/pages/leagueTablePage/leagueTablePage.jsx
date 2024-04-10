import Table from "../../components/leagueTable/table";
import Subheader from "../../components/subheader/subheader";
import { useParams, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import "./leagueTablePage.scss";
import axios from "axios";
import Modal from "../../components/modal/modal";

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

  const [showAddTeam, setShowAddTeam] = useState(false);

  const toggleAddTeamModal = () => {
    setShowAddTeam(!showAddTeam);
  };

  return (
    <div className="leagueTable">
      <Subheader
        titleText={name}
        isButton={true}
        buttonText="+ Add Team"
        buttonFunction={toggleAddTeamModal}
      />
      {leagueData && <Table leagueData={leagueData} />}
      {showAddTeam &&
        createPortal(
          <Modal closeFn={toggleAddTeamModal} type="add" />,
          document.getElementById(`root`)
        )}
    </div>
  );
}
