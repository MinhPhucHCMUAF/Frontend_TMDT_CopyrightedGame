import { useHomeData } from "../../hooks/useGameData";
import { Homecard } from "../home/Homecard";
import "./game.css";
function GameProducts() {
  const { categoryGames, filter } = useHomeData();
  return (
    <div className="container py-2">
      <div className="d-flex row justify-content-between">
        <div className="col-3">
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
                    value={cate.id}
                  />
                  <label className="form-check-label" htmlFor={cate.id}>
                    {cate.name}
                  </label>
                </div>
              ))}
            </div>
          </aside>
        </div>
        <div className="col-9">
          <div className="row row-cols-2  row-cols-md-2 row-cols-xl-3 g-4 ">
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
