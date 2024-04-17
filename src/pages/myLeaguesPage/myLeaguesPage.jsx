import { useEffect, useState } from "react";

import LeagueCard from "../../components/leagueCard/leagueCard";
import "./myLeaguesPage.scss";
import axios from "axios";
import Subheader from "../../components/subheader/subheader";
import { createPortal } from "react-dom";
import Modal from "../../components/modal/modal";
import Unauthorised from "../../components/unauthorised/unauthorised";

export default function MyLeaguesPage({ failedAuth, userData }) {
  const apiURL = process.env.REACT_APP_API_URL;
  const user_id = sessionStorage.getItem("user_id");

  const [allLeagues, setAllLeagues] = useState(null);

  const getLeagues = async () => {
    try {
      const { data } = await axios.get(`${apiURL}/api/leagues/${user_id}`);
      setAllLeagues(data.reverse());
    } catch (error) {
      console.log(error);
      setAllLeagues(null);
    }
  };

  useEffect(() => {
    getLeagues();
  }, []);

  const [showAddLeague, setShowAddLeague] = useState(false);

  const toggleAddLeagueModal = () => {
    setShowAddLeague(!showAddLeague);
  };

  if (!userData) {
    return (
      <section className="loading">
        <h2 className="loading__title">
          Waking your Staff and Preparing the Dugout
        </h2>
      </section>
    );
  }

  if (failedAuth) {
    return <Unauthorised />;
  }

  return (
    <div className="myLeagues">
      {userData && (
        <>
          <Subheader
            titleText={
              allLeagues ? "My Leagues" : "Time to add your first league"
            }
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
                    user_id={user_id}
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
        </>
      )}
    </div>
  );
}
