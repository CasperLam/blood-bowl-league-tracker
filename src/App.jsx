import "./app.scss";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Header from "./components/header/header";
import MyLeaguesPage from "./pages/myLeaguesPage/myLeaguesPage";
import Footer from "./components/footer/footer";
import LeagueTablePage from "./pages/leagueTablePage/leagueTablePage";
import TeamDetailsPage from "./pages/teamDetailsPage/teamDetailsPage";
import SignupPage from "./pages/signupPage/signupPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/:user_id" element={<MyLeaguesPage />} />
        <Route
          path="/league-table/:user_id/:league_id"
          element={<LeagueTablePage />}
        />
        <Route
          path="/team-details/:user_id/:league_id/:team_id"
          element={<TeamDetailsPage />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
