import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueCard from "../../components/leagueCard/leagueCard";
import "./myLeaguesPage.scss";
import axios from "axios";
import Subheader from "../../components/subheader/subheader";

export default function MyLeaguesPage() {
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

  return (
    <div className="myLeagues">
      <Subheader
        titleText="My Leagues"
        isButton={true}
        buttonText="+ Add League"
        buttonFunction={console.log(`nothing`)}
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
              />
            );
          })}
      </section>
    </div>
  );
}
