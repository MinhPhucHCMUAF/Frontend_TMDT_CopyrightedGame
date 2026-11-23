import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowsRotate,
  faBolt,
  faCreditCard,
  faRibbon,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import "./homestyle.css";
import { GameListcard } from "./GameListcard";
import { CategoryCardHome } from "./CategoryCardHome";
import { PromotionCard } from "./PromotionBannerCard";
import { NewsCard } from "../news/NewsCard";
import "../news/newsstyle.css";
import { useHomeData } from "../../hooks/useHomeData";
import { useNewsData } from "../../hooks/useNewsData";
import { PublisherCard } from "./PublisherCard";
function Home() {
  const {
    games,
    categoryGames,
    gamesFilter,
    voucher,
    setGamesFilter,
    filter,
    publisher,
  } = useHomeData();
  const { news } = useNewsData();

  return (
    <div className="container py-2">
      <div className="row g-3 mb-3 mt-3">
        <div className="col-12">
          <div
            id="demo"
            className="carousel slide hero  "
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {games.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#demo"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="carousel-inner">
              {games.slice(0, 3).map((game, index) => (
                <div
                  key={game.id}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div className="carousel-caption text-white d-flex flex-column justify-content-center align-items-start">
                    <h2 className="fs-1">{game.title}</h2>
                    <small>{game.summary}</small>
                    <div>
                      <div className="d-flex align-items-center gap-3 mb-3 mt-3">
                        <span className="fs-1 fw-bold text-info text-decoration-underline">
                          {game.price.toLocaleString("vi-VN")} VNĐ
                        </span>
                      </div>
                      <Link
                        to={`/game/${game.id}`}
                        className="btn btn-danger p-3 btn-buy"
                      >
                        Mua ngay
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 mb-3 mt-3 features-banner border border-2 border-white">
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
      <div className="row g-3 mb-3 mt-3 promotion-banner">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 text-white">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <span>
              <FontAwesomeIcon
                icon={faTicket}
                style={{ fontSize: "30px", color: "yellow" }}
              />
            </span>
            <div>
              <h4>DANH SÁCH VOUCHER GAME</h4>
              <small className="text-warning  fw-semibold">
                Danh sách các chương trình khuyến mãi
              </small>
            </div>
          </div>
          <Link to={"#"} className="text-warning fw-bold">
            Xem tất cả <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className="row row-cols-2 row-cols-lg-4 g-3">
          {voucher.slice(0, 4).map((v: any) => (
            <PromotionCard key={v.id} promotion={v} />
          ))}
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
          <Link to={"/game"}>
            Xem tất cả <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className="row row-cols-2  row-cols-md-2 row-cols-xl-4 g-4 ">
          {filter.slice(0, 4).map((game: any) => (
            <div className="col">
              <GameListcard key={game.id} game={game} />
            </div>
          ))}
        </div>
      </div>
      <div className="row g-3 mb-3 mt-3 panel-news">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 text-white">
          <h4>Xem tin tức</h4>
          <Link to={"/tin-tuc"}>
            Xem tất cả <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
          {[...news]
            .sort((a: any, b: any) => b.date.localeCompare(a.date))
            .slice(0, 4)
            .map((n: any) => (
              <div className="col" key={n.id}>
                <NewsCard news={n} />
              </div>
            ))}
        </div>
      </div>
      <div className="row g-3 mb-3 mt-3 publisher-games">
        <div className="text-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Nhà phát hành game</h4>
          </div>
          <div className="row row-cols-4 g-2 gap-2 justify-content-between">
            <div className="carousel-publisher">
              <div className="track d-flex flex-column align-items-center">
                <div className="group d-flex flex-column align-items-center">
                  {publisher.map((pub: any) => (
                    <PublisherCard key={pub.id} publisher={pub} />
                  ))}
                </div>
                <div
                  className="group d-flex flex-column align-items-center"
                  aria-hidden="true"
                >
                  {publisher.map((pub: any) => (
                    <PublisherCard key={pub.id} publisher={pub} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
