import "./footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text footer__text--quote">
          "It really takes the thinking out of managing a league so there's more
          time for punching... I mean playing."
          <br />- Bob Bifford
        </p>
        <p className="footer__text footer__text--quote">
          "Ah, the Blood Bowl League Tracker! A vital tool for every coach,
          ensuring you stay one step ahead of the competition!"
          <br />- Jim Johnson
        </p>
        <p className="footer__text">
          Created by Casper Lam for all your Blood Bowl League Tracker needs
        </p>
      </div>
    </footer>
  );
}
