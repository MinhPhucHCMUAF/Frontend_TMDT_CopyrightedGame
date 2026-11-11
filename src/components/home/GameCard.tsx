import { Link } from "react-router-dom";

export function GameCard({ gameCards }: { gameCards: any }) {
  return (
    <div
      className="card text-white game-card"
      style={{ width: "300px", padding: "15px", background: "#101e33" }}
    >
      <Link to={"#"} className="text-decoration-none text-white ">
        <div className="d-flex flex-column justify-content-between align-items-center">
          <h5 className="card-title card-title-game fw-bold fs-3">
            {gameCards.name}
          </h5>
          <p className="card-text card-desc-game fw-bold">
            {gameCards.description}
          </p>
          <small>Mệnh giá từ</small>
          <p className="card-text card-price fw-bold fs-3">
            {gameCards.denomination}
          </p>
        </div>
      </Link>
    </div>
  );
}
