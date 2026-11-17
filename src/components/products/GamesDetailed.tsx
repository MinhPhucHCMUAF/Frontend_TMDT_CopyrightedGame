import { useParams } from "react-router-dom";
import "./gameStyles.css";
import { useProductData } from "../../hooks/useProductData";
function GameDetailed() {
  const { id } = useParams();
  const { getGamebyID } = useProductData();
  const games = getGamebyID(Number(id));
  return !games ? (
    <div className="container text-white py-5">
      <h3>Không tìm thấy game!</h3>
    </div>
  ) : (
    <div className="container py-2">
      <div className="row g-4  align-items-start mb-3 mt-3">
        <div className="col-12 col-lg-8">
          <img src={games.image} className="img-fluid" alt={games.title} />
        </div>
        <div className="col-12 col-lg-4 text-white">
          <h1 className="game-title">{games.title}</h1>
          <div className="mb-3">
            <span className="game-rating fs-5">★★★★★</span>
            <span className="ms-2">(4.0)</span>
          </div>
          <div className="mb-3">
            <span>{games.download} lượt tải</span>
          </div>
          <hr />
          <div className="fw-bold fs-2 mb-3">
            <p> {games.price.toLocaleString("vi-VN")} VNĐ</p>
          </div>
          <div className="mb-3">
            <span className="game-tag">Thế giới mở</span>
            <span className="game-tag"> CD PROJEKT RED</span>
          </div>
          <p>
            Game nhập vai hành động thế giới mở trong tương lai, nơi người chơi
            khám phá Night City.
          </p>
          <div className="d-flex flex-row gap-3">
            <button className="btn btn-cart ">Thêm vào giỏ hàng</button>
            <button className="btn btn-buy">Mua ngay</button>
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
              Thông tin game
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
        <div className="tab-content text-white" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="description"
            role="tabpanel"
          >
            <p className="mb-2 mt-2">
              Cyberpunk 2077 là một tựa game nhập vai hành động thế giới mở lấy
              bối cảnh tương lai tại Night City – một thành phố đầy rẫy tội
              phạm, công nghệ và những bí ẩn.
            </p>
          </div>
          <div className="tab-pane fade" id="information" role="tabpanel">
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Tên game:</strong> Cyberpunk 2077
                </p>
                <p>
                  <strong>Thể loại:</strong> Thế giới mở
                </p>
                <p>
                  <strong>Nhà phát hành:</strong> CD PROJEKT RED
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Ngày phát hành:</strong> 06/11/2026
                </p>
                <p>
                  <strong>Mã sản phẩm:</strong> GAME001
                </p>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="reviews" role="tabpanel">
            <h5>Đánh giá sản phẩm</h5>

            <div className="game-rating fs-4 mb-2">
              ★★★★★
              <span className="text-white fs-6">(4.0/5)</span>
            </div>

            <p>Chưa có đánh giá chi tiết từ khách hàng.</p>
          </div>
        </div>
      </div>
      <div className="mb-3 mt-3 text-white">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold fs-2 mb-0 ">Có thể bạn cũng thích</h2>

          <a href="#" className="btn btn-outline-light btn-sm">
            Xem thêm
          </a>
        </div>
      </div>
    </div>
  );
}
export default GameDetailed;
