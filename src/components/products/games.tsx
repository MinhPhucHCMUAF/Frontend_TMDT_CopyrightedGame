import { useProductData } from "../../hooks/useProductData";
import { GameListcard } from "../home/GameListcard";
import "./gameStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function GameProducts() {
  const {
    publisher,
    categoryGames,
    gamesFilter,
    setGamesFilter,
    pubFilter,
    setPubFilter,
    filter,
    setPriceFilter,
    priceFilter,
    removeData,
    keyword,
    setKeyWord,
  } = useProductData();
  return (
    <div className="container py-2">
      <div className="row g-3 mb-3 mt-3">
        <h1 className="text-white title-lst-game">Các thể loại Games</h1>
        <p className="text-white">
          Khám phá hàng ngàn tựa game bản quyền hấp dẫn, đa dạng thể loại với
          mức giá ưu đãi dành cho bạn.
        </p>
        <div className="news-toolbar">
          <div className="news-search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="news-search-icon"
            />
            <input
              type="search"
              className="form-control"
              placeholder="Tìm tên game..."
              value={keyword}
              onChange={(e) => setKeyWord(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-lg-3 text-white">
          <aside className="filter">
            <div className="filter-header d-flex justify-content-between align-items-center mb-3">
              <FontAwesomeIcon icon={faFilter} style={{ fontSize: "30px" }} />
              <h3>Bộ lọc</h3>
              <button className="btn btn-danger btn-sm" onClick={removeData}>
                Xóa lọc
              </button>
            </div>
            <div className="mt-3 mb-3 d-flex flex-column">
              <div className="filter-group">
                <h4>Thể loại</h4>
                {categoryGames.map((cate: any) => (
                  <div className="form-check" key={cate.id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category"
                      id={cate.id}
                      checked={Number(gamesFilter) === Number(cate.id)}
                      onChange={() => setGamesFilter(cate.id)}
                    />
                    <label className="form-check-label" htmlFor={cate.id}>
                      {cate.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 mb-3 d-flex flex-column">
              <div className="filter-group">
                <h4>Nhà phát hành</h4>
                {publisher.map((p: any) => (
                  <div className="form-check" key={p.id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="publish"
                      id={p.id}
                      checked={Number(pubFilter) === Number(p.id)}
                      onChange={() => setPubFilter(p.id)}
                    />
                    <label className="form-check-label" htmlFor={p.id}>
                      {p.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 mb-3 d-flex flex-column">
              <h4>Giá tiền</h4>
              <input
                type="range"
                id="min"
                min={1}
                max={1500000}
                step={10000}
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
              ></input>
              <p className="fw-bold">
                Đơn giá: {priceFilter.toLocaleString("vi-VN")} VNĐ
              </p>
            </div>
          </aside>
        </div>
        <div className="col-12 col-lg-9">
          <div className=" row row-cols-1 row-cols-xl-3 g-4 ">
            {filter.map((game: any) => (
              <GameListcard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default GameProducts;
