import { Link } from "react-router-dom";

export function Publisher({ publisher }: { publisher: any }) {
  return (
    <div
      className="card text-white border border-1 border-white"
      style={{ width: "300px", padding: "15px", background: "#101e33" }}
    >
      <Link to={"#"} className="text-decoration-none text-white ">
        <div className="d-flex flex-column justify-content-between align-items-center">
          <h5 className="card-title">{publisher.name}</h5>
          <p className="card-text">{publisher.gameCount}</p>
        </div>
      </Link>
    </div>
  );
}
