import Subheader from "../../components/subheader/subheader";
import "./teamDetailsPage.scss";

export default function TeamDetailsPage() {
  return (
    <div className="team-details">
      <Subheader
        titleText="Gwaka'moli Crater Gators"
        isButton={false}
        buttonText="+ Add Team"
        buttonFunction=""
      />
    </div>
  );
}
