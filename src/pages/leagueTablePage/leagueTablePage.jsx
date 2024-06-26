import Table from "../../components/leagueTable/table";
import Subheader from "../../components/subheader/subheader";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import "./leagueTablePage.scss";
import axios from "axios";
import Modal from "../../components/modal/modal";
import Unauthorised from "../../components/unauthorised/unauthorised";

export default function LeagueTablePage({ failedAuth }) {
  const apiURL = process.env.REACT_APP_API_URL;
  const user_id = sessionStorage.getItem("user_id");
  const { league_id } = useParams();

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

  if (failedAuth) {
    return <Unauthorised />;
  }

  return (
    <div className="leagueTable">
      {leagueData && (
        <Subheader
          titleText={
            leagueData[0]
              ? leagueData[0].league_name
              : "Time to add your first team"
          }
          isButton={true}
          buttonText="+ Add Team"
          buttonFunction={toggleAddTeamModal}
          backPath={`/my-leagues`}
        />
      )}
      {leagueData && <Table leagueData={leagueData} />}
      {showAddTeam &&
        createPortal(
          <Modal
            closeFn={toggleAddTeamModal}
            type="addTeam"
            renderFn={getLeagueData}
          />,
          document.getElementById(`root`)
        )}
    </div>
  );
}
