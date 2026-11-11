import "./game.css";
function GameProducts() {
  return (
    <div className="container py-2">
      <div className="d-flex">
        <div>
          <aside className="filter">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Bộ lọc</h3>
              <button className="btn btn-danger">Xóa lọc</button>
            </div>
            <div className="mt-3 mb-3 d-flex flex-column">
              <div>
                <h4>Thể loại</h4>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Default checked radio
                </label>
              </div>
            </div>
          </aside>
        </div>
        <div></div>
      </div>
    </div>
  );
}
export default GameProducts;
