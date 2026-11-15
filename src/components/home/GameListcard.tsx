import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
export function GameListcard({ game }: { game: any }) {
  const averageRating =
    game.rating.length > 0
      ? game.rating.reduce((total: number, star: number) => total + star, 0) /
        game.rating.length
      : 0;
  return (
    <div className="card lst-games d-flex flex-column bg-dark text-white h-100">
      <Link to={"#"} className="game-link text-decoration-none text-white">
        <img src={game.image} className="card-img-top" alt={game.title} />
        <div className="card-body text-center">
          <h5 className="card-title">{game.title}</h5>

          <p className="game-price fw-bold mb-2">
            {game.price.toLocaleString("vi-VN")} VNĐ
          </p>

          <p className="card-text game-description">{game.summary}</p>
        </div>
      </Link>
      <div className="d-flex justify-content-between align-items-center mt-auto px-3 pb-3">
        <span>
          {Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              style={{
                color:
                  index < Math.round(averageRating)
                    ? "rgb(255, 212, 59)"
                    : "gray",
              }}
            />
          ))}
        </span>
        <small>Lượt tải: {game.views}</small>
      </div>
      <div className="text-center">
        <button className="btn btn-danger">
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="ms-2">THÊM GIỎ HÀNG</span>
        </button>
      </div>
    </div>
  );
}
