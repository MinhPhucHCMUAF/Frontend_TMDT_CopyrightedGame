import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
export function Publisher({ publisher }: { publisher: any }) {
  return (
    <div className="card card-publish text-white">
      <Link to="#" className="text-decoration-none text-white">
        <div className="d-flex flex-column align-items-center justify-content-center text-align-center card-publish-content">
          <div className="publisher-icon">
            <FontAwesomeIcon icon={faUserPen} style={{ fontSize: "30px" }} />
          </div>
          <h5 className="card-title">{publisher.name}</h5>
          <span className="publisher-game-count">
            Phát hành {publisher.gameCount} tựa game
          </span>
        </div>
      </Link>
    </div>
  );
}
