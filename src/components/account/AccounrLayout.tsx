import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faGamepad,
  faHeart,
  faRightFromBracket,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/shop.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { setUser } from "../../store/authSlice.ts";
import { logout } from "../../services/authService.ts";
import { initials } from "../../utils/format.ts";

export default function AccountLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);

  const handleLogout = () => {
    logout();
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <div className="shop-page">
      <div className="container">
        <div className="row g-4">
          <aside className="col-lg-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="text-center mb-3">
                  <div className="avatar-circle mb-2">{initials(user?.fullName ?? "?")}</div>
                  <div className="fw-bold">{user?.fullName}</div>
                  <small className="text-muted">{user?.email}</small>
                </div>
                <nav className="nav flex-column account-sidebar gap-1">
                  <NavLink to="/account/profile" className="nav-link">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Hồ sơ cá nhân
                  </NavLink>
                  <NavLink to="/account/orders" className="nav-link">
                    <FontAwesomeIcon icon={faClockRotateLeft} className="me-2" />
                    Lịch sử đơn hàng
                  </NavLink>
                  <NavLink to="/account/library" className="nav-link">
                    <FontAwesomeIcon icon={faGamepad} className="me-2" />
                    Thư viện game
                  </NavLink>
                  <NavLink to="/account/favorites" className="nav-link">
                    <FontAwesomeIcon icon={faHeart} className="me-2" />
                    Game yêu thích
                  </NavLink>
                  <NavLink to="/account/vouchers" className="nav-link">
                    <FontAwesomeIcon icon={faTicket} className="me-2" />
                    Mã giảm giá của tôi
                  </NavLink>
                  <button className="nav-link text-start text-danger" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
                    Đăng xuất
                  </button>
                </nav>
              </div>
            </div>
          </aside>
          <section className="col-lg-9">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
}
