import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./headerstyle.css";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
export function Header() {
  return (
    <header className="text-white" id="header-top">
      <nav className="navbar navbar-dark ">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center flex-wrap w-100 gap-2">
            <a className="navbar-brand fw-bold text-danger me-3">KHO GAME</a>
            <div className="flex-grow-1 me-2">
              <form className="d-flex gap-2" role="search">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Bạn muốn tìm kiếm gì...."
                />
                <button className=" btn btn-danger text-nowrap" type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                </button>
              </form>
            </div>
            <ul className="navbar-nav flex-row align-items-center flex-shrink-0 gap-2 m-2">
              <li className="nav-item ">
                <Link to="#" className="nav-link fw-semibold btn-profile">
                  <strong>Đăng nhập</strong>
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="#" className="nav-link fw-semibold btn-profile">
                  <strong>Đăng ký</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="mt-2 p-1" id="navbar-2">
        <div className="container d-flex align-items-center justify-content-center flex-wrap gap-2">
          <div className="dropdown nav-item">
            <button
              className="text-white fw-semibold btn rounded-0 d-flex align-items-center gap-2 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faBars} />
              Danh sách sản phẩm
            </button>
            <ul className="dropdown-menu dropdown-menu-dark mt-0 rounded-0">
              <li>
                <Link
                  to="#"
                  className="dropdown-item d-flex align-items-center gap-3 py-2"
                >
                  <strong>Game Stream</strong>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item d-flex align-items-center gap-3 py-2"
                >
                  <strong>Game Epic Games</strong>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item d-flex align-items-center gap-3 py-2"
                >
                  <strong>Game GOG</strong>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item d-flex align-items-center gap-3 py-2"
                >
                  <strong>Game Xbox</strong>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item d-flex align-items-center gap-3 py-2"
                >
                  <strong>Game PlayStation</strong>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="dropdown-item d-flex align-items-center gap-3 py-2"
                >
                  <strong>Game Nintendo</strong>
                </Link>
              </li>
            </ul>
          </div>
          <ul className="nav row row-cols-2 row-cols-sm-4 align-items-center justify-content-center g-1">
            <li className="nav-item col text-center">
              <NavLink
                className="nav-link active text-white fw-semibold text-nowrap"
                to={"/"}
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item col text-center">
              <NavLink
                className="nav-link text-white fw-semibold text-nowrap"
                to={"/"}
              >
                Tin tức
              </NavLink>
            </li>
            <li className="nav-item col text-center">
              <NavLink
                className="nav-link text-white fw-semibold text-nowrap"
                to={"/"}
              >
                Khuyến mãi
              </NavLink>
            </li>
            <li className="nav-item col text-center">
              <NavLink
                className="nav-link text-white fw-semibold text-nowrap"
                to={"/"}
              >
                Liên hệ
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
