import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
export function Header() {
  return (
    <header className="bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand fw-bold text-danger">KHO GAME</a>
          </div>
          <div className="collapse navbar-collapse gap-3">
            <form
              className="d-flex flex-grow-1 my-2 my-lg-0 gap-2"
              role="search"
            >
              <input
                className="form-control"
                type="search"
                placeholder="Bạn muốn tìm kiếm gì...."
              />
              <button className="btn btn-danger text-nowrap" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
              </button>
            </form>
          </div>
          <ul className="navbar-nav ms-lg-auto">
            <li className="nav-item">
              <Link to="#" className="nav-link fw-semibold">
                <strong>Thanh Toán</strong>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link fw-semibold">
                <strong>Đăng nhập</strong>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="d-none d-lg-block">
        <div className="container d-flex align-items-center">
          <div className="dropdown">
            <button
              className="btn rounded-0 d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faTableCells} />
              Danh sách sản phẩm
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
