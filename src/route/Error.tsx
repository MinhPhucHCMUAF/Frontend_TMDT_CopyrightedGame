import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import "../components/info/infostyle.css";

function ErrorPage() {
  return (
    <div className="info-page py-5">
      <div className="container text-center not-found">
        <p className="not-found-code">404</p>
        <h1 className="info-title">Không tìm thấy trang</h1>
        <p className="info-subtitle">
          Đường dẫn bạn truy cập không tồn tại hoặc đã bị thay đổi.
        </p>
        <div className="d-flex justify-content-center flex-wrap gap-2">
          <Link to="/" className="btn btn-danger">
            <FontAwesomeIcon icon={faHouse} /> Về trang chủ
          </Link>
          <Link to="/tin-tuc" className="btn btn-outline-light">
            <FontAwesomeIcon icon={faNewspaper} /> Xem tin tức
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ErrorPage;
