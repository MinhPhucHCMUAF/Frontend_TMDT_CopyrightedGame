import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
export function Promotion({ promotion }: { promotion: any }) {
  return (
    <div className="col">
      <div className="card voucher-card h-100 text-white">
        <div className="voucher-discount">
          {promotion.discountAmount.toLocaleString("vi-VN")} VNĐ
        </div>
        <img
          src={promotion.voucherImage}
          alt={promotion.voucherName}
          className="card-img-top voucher-image"
        />
        <div className="card-body voucher-body d-flex flex-column">
          <h5 className="card-title voucher-name">{promotion.voucherName}</h5>

          <p className="card-text flex-grow-1">{promotion.description}</p>

          <button className="btn btn-primary voucher-detail-btn">
            <FontAwesomeIcon icon={faTicket} className="me-2" />
            Copy mã
          </button>
        </div>
      </div>
    </div>
  );
}
