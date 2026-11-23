import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./gameStyles.css";
import { useProductData } from "../../hooks/useProductData";
import { GameListcard } from "../home/GameListcard";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
function GameDetailed() {
  const { id } = useParams();
  const { getGamebyID, getPublisherName, getCategoryGames, games } =
    useProductData();
  const game = getGamebyID(Number(id));

  return !game ? (
    <div className="container text-white py-5">
      <h3>Không tìm thấy game!</h3>
    </div>
  ) : (
    <div className="container py-2">
      <div className="row g-4 align-items-center mb-4 mt-3 text-white">
        <div className="col-12 col-lg-7">
          <div className="game-image-wrapper">
            <img src={game.image} className="img-fluid" alt={game.title} />
          </div>
        </div>
        <div className="col-12 col-lg-5 text-white">
          <div className="game-info">
            <h1 className="game-title mb-3">{game.title}</h1>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="game-rating fs-5">Đánh giá: </span>
              <span className="text-secondary">(4.0)</span>
            </div>
            <div className="mb-4">
              <span className="text-secondary small">Giá bán:</span>
              <h2 className="text-danger fw-bold">
                {game.price.toLocaleString("vi-VN")} VNĐ
              </h2>
            </div>
            <hr className="border-secondary" />
            <div className="game-meta">
              <div className="game-meta-item">
                <span>Thể loại</span>
                <strong>{getCategoryGames(game.categoryID)}</strong>
              </div>
              <div className="game-meta-item">
                <span>Nhà phát hành</span>
                <strong>{getPublisherName(game.publisherID)}</strong>
              </div>
              <div className="game-meta-item">
                <span>Ngày phát hành</span>
                <strong>{game.date}</strong>
              </div>
              <div className="game-meta-item">
                <span>Lượt tải</span>
                <strong>{game.download}</strong>
              </div>
            </div>
            <hr className="border-secondary" />
            <div className="mb-4">
              <h5 className="fw-bold mb-2">Giới thiệu game</h5>
              <p className="text-secondary game-summary">{game.summary}</p>
            </div>
            <div className="d-flex flex-row align-items-center gap-3">
              <button className="btn btn-cart ">Thêm vào giỏ hàng</button>
              <button className="btn btn-buy">Mua ngay</button>
              <FontAwesomeIcon
                icon={faBookmark}
                style={{ fontSize: "30px", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="detail-tabs mb-3 mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#description"
              type="button"
              role="tab"
            >
              Mô tả chi tiết
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#information"
              type="button"
              role="tab"
            >
              Cấu hình tối thiểu
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#reviews"
              type="button"
              role="tab"
            >
              Đánh giá
            </button>
          </li>
        </ul>
        <div className="tab-content text-white mt-3" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="description"
            role="tabpanel"
          >
            <p className="mb-2 mt-2 m-3 lh-lg">{game.detail}</p>
          </div>
          <div className="tab-pane fade mt-3" id="information" role="tabpanel">
            <div className="mb-2 mt-2 m-3">
              <p>
                <strong>Hệ điều hành:</strong> {game.os}
              </p>
              <p>
                <strong>CPU:</strong> {game.cpu}
              </p>
              <p>
                <strong>RAM:</strong> {game.ram}
              </p>
              <p>
                <strong>Dung lượng lưu trữ: </strong> {game.storage}
              </p>
              <p>
                <strong>GPU: </strong> {game.gpu}
              </p>
            </div>
          </div>
          <div className="tab-pane fade" id="reviews" role="tabpanel">
            <div className="mb-2 mt-2 m-3">
              <h5>Đánh giá sản phẩm</h5>
              <div className="game-rating fs-4 mb-2">
                ★★★★★
                <span className="text-white fs-6">(4.0/5)</span>
              </div>
              <p>Chưa có đánh giá chi tiết từ khách hàng.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3 mt-3 text-white">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold fs-2 mb-0 ">Có thể bạn cũng thích</h2>
          <a href="/game" className="btn btn-outline-light btn-sm">
            Xem thêm
          </a>
        </div>
        <div className="row g-4">
          {games
            .filter((g: any) => Number(g.id) !== Number(id))
            .slice(0, 3)
            .map((g: any) => (
              <div className="col-12 col-sm-6 col-lg-4">
                <GameListcard key={g.id} game={g} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default GameDetailed;
