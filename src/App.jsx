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
      sessionStorage.setItem("user_id", data.id);
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
    sessionStorage.removeItem("user_id");
    setUserData(null);
    setFailedAuth(true);
  };

  return (
    <BrowserRouter>
      <Header logoutFn={handleLogout} failedAuth={failedAuth} />
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              loadData={loadData}
              setFailedAuth={setFailedAuth}
              failedAuth={failedAuth}
            />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/my-leagues"
          element={
            <MyLeaguesPage
              failedAuth={failedAuth}
              loadData={loadData}
              userData={userData}
            />
          }
        />
        <Route
          path="/league-table/:league_id"
          element={<LeagueTablePage failedAuth={failedAuth} />}
        />
        <Route
          path="/team-details/:league_id/:team_id"
          element={<TeamDetailsPage failedAuth={failedAuth} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
