import { Link } from "react-router-dom";
import "./footerstyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
export function Footer() {
  return (
    <footer className="text-white footer-page">
      <section className="footer-content py-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-6 col-lg">
              <h6 className="fw-bold fs-5">Hỗ trợ khách hàng</h6>
              <p>
                {" "}
                <Link to={"/"}>Hotline 1900 6868</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>Hướng dẫn mua hàng</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>Hướng dẫn kích hoạt key</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>Câu hỏi thường gặp</Link>
              </p>
            </div>
            <div className="col-6 col-lg">
              <h6 className="fw-bold fs-5">Về KHOGAME</h6>
              <p>
                {" "}
                <Link to={"/"}>Giới thiệu</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>Tuyển dụng</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>Liên hệ hợp tác</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>Tin tức game</Link>
              </p>
            </div>
            <div className="col-6 col-lg">
              <h6 className="fw-bold fs-5">Chính sách</h6>
              <p>
                {" "}
                <Link to={"/"}>Điều khoản sử dụng</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>Chính sách bảo mật</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>Đổi trả và hoàn tiền</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>Bảo hành key</Link>
              </p>
            </div>
            <div className="col-6 col-lg">
              <h6 className="fw-bold fs-5">Thanh toán</h6>
              <p>
                {" "}
                <Link to={"/"}>MoMo</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>ZaloPay</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>VNPay</Link>
              </p>
              <p>
                {" "}
                <Link to={"/"}>Visa</Link>
              </p>
            </div>
            <div className="col-12 col-lg text-nowrap">
              <h6 className="footer-title mt-4">Kết nối với chúng tôi</h6>
              <div className="footer-tags d-flex gap-3">
                <Link to={"/"}>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ color: "rgb(109, 23, 236)", fontSize: "30px" }}
                  />
                </Link>
                <Link to={"/"}>
                  <FontAwesomeIcon
                    icon={faYoutube}
                    style={{ color: "rgb(238, 13, 13)", fontSize: "30px" }}
                  />
                </Link>
                <Link to={"/"}>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    style={{ color: "rgb(109, 23, 236)", fontSize: "30px" }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-bottom py-4">
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <p className="mb-1">
              Trường Đại học Nông Lâm Thành phố Hồ Chí Minh - MST 0303182912 -
              Khu Phố 9, Linh Xuân, Hồ Chí Minh
            </p>
            <small>© 2026 KHOGAME. Bản quyền thuộc về FIT NLU.</small>
          </div>
        </div>
      </section>
    </footer>
  );
}
