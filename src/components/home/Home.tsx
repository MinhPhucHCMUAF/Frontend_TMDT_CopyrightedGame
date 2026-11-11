import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowsRotate,
  faBolt,
  faCreditCard,
  faRibbon,
} from "@fortawesome/free-solid-svg-icons";
import "./home.css";
import { Homecard } from "./Homecard";
import { useEffect, useState } from "react";
import { API_URL } from "../../api/api";
import { CategoryCardHome } from "./CategoryCardHome";
import { GameCard } from "./GameCard";
import { Publisher } from "./Publisher";
function Home() {
  const [games, setGames] = useState([]);
  const [gamesCard, setGamesCard] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [categoryGames, setCategoryGames] = useState([]);
  const [gamesFilter, setGamesFilter] = useState(null);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const resGames = await fetch(`${API_URL}/product-game`);
        const resCategory = await fetch(`${API_URL}/category-game`);
        const resGamesCard = await fetch(`${API_URL}/gameCards`);
        const resPublisher = await fetch(`${API_URL}/publisher-game`);
        const dataGames = await resGames.json();
        const dataCategory = await resCategory.json();
        const dataGamesCard = await resGamesCard.json();
        const dataPublisher = await resPublisher.json();
        setGames(dataGames);
        setCategoryGames(dataCategory);
        setGamesCard(dataGamesCard);
        setPublisher(dataPublisher);
      } catch (err) {
        console.log(err);
      }
    };
    loadGame();
  }, []);
  const filter =
    gamesFilter === null
      ? games
      : games.filter((f: any) => Number(f.categoryID) === Number(gamesFilter));

  return (
    <div className="container py-2">
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
          <div className="feature d-flex justify-content-between align-items-center gap-3 ">
            <FontAwesomeIcon
              icon={faBolt}
              style={{ color: "yellow", fontSize: "30px" }}
            />
            <div>
              <h4 className="text-white ">Giao key nhanh chóng</h4>
              <small className="text-warning">Tự động 24/7</small>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="feature d-flex justify-content-between align-items-center gap-3">
            <FontAwesomeIcon
              icon={faArrowsRotate}
              style={{ color: "yellow", fontSize: "30px" }}
            />
            <div>
              <h4 className="text-white">Đổi key lỗi</h4>
              <small className="text-warning">
                Hoàn tiền nếu không đổi được
              </small>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="feature d-flex justify-content-between align-items-center gap-3">
            <FontAwesomeIcon
              icon={faRibbon}
              style={{ color: "yellow", fontSize: "30px" }}
            />
            <div>
              <h4 className="text-white">Tích điểm đổi quà</h4>
              <small className="text-warning">1.000đ = 1 điểm thưởng</small>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="feature d-flex justify-content-between align-items-center gap-3">
            <FontAwesomeIcon
              icon={faCreditCard}
              style={{ color: "yellow", fontSize: "30px" }}
            />
            <div>
              <h4 className="text-white">Thanh toán linh hoạt</h4>
              <small className="text-warning">
                MoMo, VNPay, thẻ, chuyển khoản
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 mb-3 mt-3 panel-games ">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 text-white">
          <h4>Tất cả các game</h4>
          <CategoryCardHome
            categoryGames={categoryGames}
            gamesFilter={gamesFilter}
            setGamesFilter={setGamesFilter}
          />
          <Link to={"#"}>
            Xem tất cả <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className="row row-cols-2  row-cols-md-2 row-cols-xl-4 g-4 ">
          {filter.slice(0, 4).map((game: any) => (
            <Homecard key={game.id} game={game} />
          ))}
        </div>
      </div>
      <div className="row g-3 mb-3 mt-3 card-games">
        <div className="text-white d-flex flex-column justify-content-between gap-3  ">
          <h4>Thẻ nạp game</h4>
          <div className="row row-cols-4 g-2 gap-2 justify-content-between">
            {gamesCard.slice(0, 4).map((gc: any) => (
              <GameCard key={gc.id} gameCards={gc} />
            ))}
          </div>
        </div>
      </div>
      <div className="row g-3 mb-3 mt-3 publisher-games">
        <div className="text-white d-flex flex-column justify-content-between gap-3 ">
          <h4>Nhà phát hành game</h4>
          <div className="row row-cols-4 g-2 gap-2 justify-content-between">
            {publisher.slice(0, 4).map((pub: any) => (
              <Publisher key={pub.id} publisher={pub} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
