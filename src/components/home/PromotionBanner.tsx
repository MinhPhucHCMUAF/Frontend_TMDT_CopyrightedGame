import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
export function Promotion({ promotion }: { promotion: any }) {
  return (
    <div className="col">
      <div className="card voucher-card h-100 text-white d-flex flex-column">
        <img
          src={promotion.voucherImage}
          alt={promotion.voucherName}
          className="card-img-top voucher-image"
        />
        <div className="voucher-discount">
          {promotion.discountAmount.toLocaleString("vi-VN")} VNĐ
        </div>
        <button
          className="btn border-0 btn-detailed fw-bold"
          data-bs-toggle="modal"
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>

        <div className="card-body voucher-body d-flex flex-column">
          <h5 className="card-title voucher-name">{promotion.voucherName}</h5>

          <div className="voucher-date mb-3 mt-3">
            <div className="d-flex justify-content-between align-items-center">
              <p>
                Ngày tạo:
                <span className="ms-2">
                  {new Date(promotion.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p>
                Ngày hết hạn:
                <span className="ms-2">
                  {new Date(promotion.expiredAt).toLocaleDateString("vi-VN")}
                </span>
              </p>
            </div>
          </div>
          <button className="btn  voucher-detail-btn">
            <FontAwesomeIcon icon={faTicket} className="me-2" />
            Copy mã
          </button>
        </div>
      </div>
    </div>
  );
}
