import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueCard from "../../components/leagueCard/leagueCard";
import "./myLeaguesPage.scss";
import axios from "axios";
import Subheader from "../../components/subheader/subheader";
import { createPortal } from "react-dom";
import Modal from "../../components/modal/modal";
import Unauthorised from "../../components/unauthorised/unauthorised";

export default function MyLeaguesPage({ failedAuth }) {
  const apiURL = process.env.REACT_APP_API_URL;
  const { user_id } = useParams();

  const [allLeagues, setAllLeagues] = useState(null);

  const getLeagues = async () => {
    try {
      const { data } = await axios.get(`${apiURL}/api/leagues/${user_id}`);
      setAllLeagues(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeagues();
  }, []);

  const [showAddLeague, setShowAddLeague] = useState(false);

  const toggleAddLeagueModal = () => {
    setShowAddLeague(!showAddLeague);
  };

  if (failedAuth) {
    return <Unauthorised />;
  }

  return (
    <div className="myLeagues">
      <Subheader
        titleText={allLeagues ? "My Leagues" : "Time to add your first league"}
        isButton={true}
        buttonText="+ Add League"
        buttonFunction={toggleAddLeagueModal}
        backPath="none"
      />
      <section className="leagues">
        {allLeagues &&
          allLeagues.map((league) => {
            return (
              <LeagueCard
                key={league.id}
                id={league.id}
                name={league.name}
                date={league.create_at}
                renderFn={getLeagues}
                league={league}
              />
            );
          })}
      </section>
      {showAddLeague &&
        createPortal(
          <Modal
            closeFn={toggleAddLeagueModal}
            type="addLeague"
            renderFn={getLeagues}
          />,
          document.getElementById(`root`)
        )}
    </div>
  );
}
