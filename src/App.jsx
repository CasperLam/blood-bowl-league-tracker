import "./app.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import MyLeaguesPage from "./pages/myLeaguesPage/myLeaguesPage";
import Footer from "./components/footer/footer";
import LeagueTablePage from "./pages/leagueTablePage/leagueTablePage";
import TeamDetailsPage from "./pages/teamDetailsPage/teamDetailsPage";
import SignupPage from "./pages/signupPage/signupPage";
import LoginPage from "./pages/loginPage/loginPage";
import LoadingPage from "./pages/loadingPage/loadingPage";

function App() {
  const apiURL = process.env.REACT_APP_API_URL;
  const [userData, setUserData] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  const loadData = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }

    try {
      const { data } = await axios.get(`${apiURL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(data);
    } catch (error) {
      console.log(error);
      setFailedAuth(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUserData(null);
    setFailedAuth(true);
  };

  return (
    <BrowserRouter>
      <Header logoutFn={handleLogout} failedAuth={failedAuth} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route
          path="/my-leagues"
          element={<LoadingPage failedAuth={failedAuth} userData={userData} />}
        /> */}
        <Route
          path="/my-leagues/:user_id"
          element={<MyLeaguesPage failedAuth={failedAuth} />}
        />
        <Route
          path="/league-table/:user_id/:league_id"
          element={<LeagueTablePage failedAuth={failedAuth} />}
        />
        <Route
          path="/team-details/:user_id/:league_id/:team_id"
          element={<TeamDetailsPage failedAuth={failedAuth} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
