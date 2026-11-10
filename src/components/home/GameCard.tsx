import { Link } from "react-router-dom";

export function GameCard({ gameCards }: { gameCards: any }) {
  return (
    <div
      className="card text-white border border-1 border-white"
      style={{ width: "300px", padding: "15px", background: "#101e33" }}
    >
      <Link to={"#"} className="text-decoration-none text-white ">
        <div className="d-flex flex-column justify-content-between align-items-center">
          <h5 className="card-title">{gameCards.name}</h5>
          <p className="card-text">{gameCards.description}</p>
          <small>Mệnh giá từ</small>
          <p className="card-text">{gameCards.denomination}</p>
        </div>
      </Link>
    </div>
  );
}
