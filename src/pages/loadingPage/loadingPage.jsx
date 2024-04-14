import { useEffect } from "react";
import Unauthorised from "../../components/unauthorised/unauthorised";
import "./loadingPage";
import { useNavigate } from "react-router-dom";

export default function LoadingPage({ failedAuth, userData }) {
  const nav = useNavigate();

  // setTimeout(() => {
  //   nav(`/my-leagues/${userData.id}`);
  // }, 1000);

  if (failedAuth) {
    return <Unauthorised />;
  }

  return (
    <section className="loading">
      <h2 className="loading__title">
        Waking your Staff and Preparing the Dugout
      </h2>
    </section>
  );
}
