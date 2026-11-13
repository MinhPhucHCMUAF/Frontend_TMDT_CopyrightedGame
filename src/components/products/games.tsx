import { useProductData } from "../../hooks/useProductData";
import { Homecard } from "../home/Homecard";
import "./game.css";
function GameProducts() {
  const {
    publisher,
    categoryGames,
    gamesFilter,
    setGamesFilter,
    pubFilter,
    setPubFilter,
    filter,
  } = useProductData();

  return (
    <div className="container py-2">
      <div className="row g-3 mb-3 mt-3">
        <div className="col-12 col-lg-3 text-white">
          <aside className="filter">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Bộ lọc</h3>
              <button className="btn btn-danger">Xóa lọc</button>
            </div>
            <div className="mt-3 mb-3 d-flex flex-column">
              <div>
                <h4>Thể loại</h4>
              </div>
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
            <div className="mt-3 mb-3 d-flex flex-column">
              <div>
                <h4>Nhà phát hành</h4>
              </div>
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
            <div className="mt-3 mb-3 d-flex flex-column">
              <div>
                <h4>Đánh giá</h4>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating"
                  id="rating"
                />
                <label className="form-check-label" htmlFor="rating">
                  Tất cả
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating"
                  id="rating"
                />
                <label className="form-check-label" htmlFor="rating">
                  Từ 3 sao trở lên
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating"
                  id="rating"
                />
                <label className="form-check-label" htmlFor="rating">
                  Từ 4 sao trở lên
                </label>
              </div>
            </div>
          </aside>
        </div>
        <div className="col-12 col-lg-9">
          <div className=" row row-cols-1 row-cols-xl-3 g-4 ">
            {filter.map((game: any) => (
              <Homecard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default GameProducts;
