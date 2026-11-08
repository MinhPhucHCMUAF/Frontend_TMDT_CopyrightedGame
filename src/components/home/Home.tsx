import { Link } from "react-router-dom";
import "./home.css";
function Home() {
  return (
    <div className="container py-4">
      <div className="row g-3 mb-3">
        <div className="col-lg-7">
          <div
            id="demo"
            className="carousel slide hero h-100"
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
            <div className="carousel-inner h-100">
              <div className="carousel-item active">
                <img
                  src="https://www.boardgamequest.com/wp-content/uploads/2024/08/Cyberpunk-The-Board-Game-640x640.jpg"
                  alt="Cyberpunk"
                  className="d-block w-100"
                />
                <div className="carousel-caption">
                  <span className="badge-sale">Siêu sale tháng 11</span>
                  <h2>Tên game nổi bật 1</h2>
                  <p className="desc">
                    Bản Ultimate kèm bản mở rộng, kích hoạt nhanh chóng và an
                    toàn.
                  </p>
                  <div className="product-price">
                    <div>
                      <span className="discount">-50%</span>
                      <span className="old-price">1.490.000đ</span>
                    </div>
                    <div className="price">745.000đ</div>
                    <button className="btn btn-buy">
                      <i className="me-2"></i>Mua ngay
                    </button>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://store-images.s-microsoft.com/image/apps.17382.13510798885735219.9735d495-578c-4a4c-b892-3eb3a780b3a0.d3792486-cf98-40c0-a2c1-d6443f0e2b70"
                  alt="Chicago"
                  className="d-block w-100"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9B5d_Wq6J_Qruht68nmx3RgD7jLUFDQ_oRXc3rpWU6omETBbJpcXStmxu&s=10"
                  alt="New York"
                  className="d-block w-100"
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
        <div className="col-lg-5">
          <div className="row g-3 side-banner h-100 ">
            <div className="col-6 col-lg-12">
              <Link to={"#"} className="side-card side-1 text-decoration-none">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4k9pznX824KxVzJwh0HCKGH65NMl5Xsbhv8_2iVwOPN3-A_MpMajJz2bd&s=10" />
                <div className="info">
                  <h5>Tên game 4</h5>
                  <small>792.000đ</small>
                </div>
              </Link>
            </div>
            <div className="col-6 col-lg-12">
              <Link to={"#"} className="side-card side-1 text-decoration-none">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4k9pznX824KxVzJwh0HCKGH65NMl5Xsbhv8_2iVwOPN3-A_MpMajJz2bd&s=10" />
                <div className="info">
                  <h5>Tên game 4</h5>
                  <small>792.000đ</small>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
