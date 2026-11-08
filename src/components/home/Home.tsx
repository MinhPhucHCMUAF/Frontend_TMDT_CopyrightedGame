import { Link } from "react-router-dom";
import "./home.css";
function Home() {
  return (
    <div className="container">
      <div className="row g-3 mb-3 mt-3">
        <div className="col-lg-7">
          <div
            id="demo"
            className="carousel slide hero  "
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="0"
                className="active"
              ></button>
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="1"
              ></button>
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="2"
              ></button>
            </div>
            <div className="carousel-inner ">
              <div className="carousel-item active">
                <img
                  src="https://www.boardgamequest.com/wp-content/uploads/2024/08/Cyberpunk-The-Board-Game-640x640.jpg"
                  alt="Cyberpunk"
                  className="w-100 h-100 object-fit-cover "
                />
                <div className="carousel-caption fs-4 text-white">
                  <span className="badge-sale">Siêu sale tháng 11</span>
                  <h2>Tên game nổi bật 1</h2>
                  <p className="desc ">
                    Bản Ultimate kèm bản mở rộng, kích hoạt nhanh chóng và an
                    toàn.
                  </p>
                  <div className="product-price">
                    <div className="d-flex align-items-center gap-3">
                      <span className="discount">-50%</span>
                      <span className="old-price fw-bold">1.490.000đ</span>
                    </div>
                    <div className="price">745.000đ</div>
                    <button className="btn btn-danger p-3 btn-buy">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://store-images.s-microsoft.com/image/apps.17382.13510798885735219.9735d495-578c-4a4c-b892-3eb3a780b3a0.d3792486-cf98-40c0-a2c1-d6443f0e2b70"
                  alt="Chicago"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9B5d_Wq6J_Qruht68nmx3RgD7jLUFDQ_oRXc3rpWU6omETBbJpcXStmxu&s=10"
                  alt="New York"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
        <div className="col-lg-5 d-flex flex-column gap-3">
          <div className="flex-fill sidebar-right">
            <Link to="#">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4k9pznX824KxVzJwh0HCKGH65NMl5Xsbhv8_2iVwOPN3-A_MpMajJz2bd&s=10"
                className="w-100 h-100 object-fit-cover"
              />
              <div className="info-right">
                <h3>TÊN GAME SỐ 1</h3>
                <p>145.000 VNĐ</p>
              </div>
            </Link>
          </div>
          <div className="flex-fill sidebar-right">
            <Link to="#">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4k9pznX824KxVzJwh0HCKGH65NMl5Xsbhv8_2iVwOPN3-A_MpMajJz2bd&s=10"
                className="w-100 h-100 object-fit-cover"
              />
              <div className="info-right">
                <h3>TÊN GAME SỐ 1</h3>
                <p>145.000 VNĐ</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="row g-3 mb-3 mt-3 features-banner">
        <div className="col-6 col-lg-3">
          <div className="feature">
            <div>
              <h4 className="text-white">Giao key trong 1 phút</h4>
              <small className="text-warning">Tự động 24/7</small>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div>
            <h4 className="text-white">Đổi key lỗi trong 7 ngày</h4>
            <small className="text-warning">Hoàn tiền nếu không đổi được</small>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div>
            <h4 className="text-white">Tích điểm đổi quà</h4>
            <small className="text-warning">1.000đ = 1 điểm thưởng</small>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div>
            <h4 className="text-white">Thanh toán linh hoạt</h4>
            <small className="text-warning">
              MoMo, VNPay, thẻ, chuyển khoản
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
