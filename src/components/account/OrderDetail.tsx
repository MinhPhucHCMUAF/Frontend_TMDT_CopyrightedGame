import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { GameThumb } from "../common/GameThumb.tsx";
import { paymentLabel } from "../../data/payments.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { ORDER_AUTO_COMPLETE_MS, cancelOrder } from "../../store/orderSlice.ts";
import { useNow } from "../../hooks/useNow.ts";
import { formatDateTime, formatVND } from "../../utils/format.ts";
import { cancelReasons, orderStatusMeta } from "../../utils/orderStatus.ts";

export default function OrderDetail() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const order = useAppSelector((s) =>
    s.orders.items.find((o) => o.id === id && o.userId === user?.id),
  );

  const processing = order?.status === "processing";
  const now = useNow(processing);
  const [showCancel, setShowCancel] = useState(false);
  const [reason, setReason] = useState(cancelReasons[0]);
  const [copied, setCopied] = useState<string | null>(null);

  const justOrdered = (location.state as { justOrdered?: boolean } | null)?.justOrdered;

  if (!order) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center py-5">
          <p className="text-muted">Không tìm thấy đơn hàng.</p>
          <Link to="/account/orders" className="btn btn-brand px-4">
            Về lịch sử đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  const meta = orderStatusMeta[order.status];
  const subtotal = order.subtotal ?? order.total;
  const discount = order.discount ?? 0;
  const secondsLeft = Math.max(
    0,
    Math.ceil((new Date(order.createdAt).getTime() + ORDER_AUTO_COMPLETE_MS - now) / 1000),
  );

  const copyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopied(key);
      setTimeout(() => setCopied((cur) => (cur === key ? null : cur)), 1200);
    } catch {
      // clipboard bị chặn: bỏ qua
    }
  };

  return (
    <div>
      <Link to="/account/orders" className="small">
        ← Lịch sử đơn hàng
      </Link>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 my-3">
        <h1 className="h4 fw-bold mb-0">Đơn hàng {order.id}</h1>
        <span className={`badge fs-6 ${meta.badge}`}>{meta.label}</span>
      </div>

      {justOrdered && (
        <div className="alert alert-success">
          🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại KHO GAME.
        </div>
      )}
      {processing && (
        <div className="alert alert-warning">
          Đơn hàng đang được xử lý, dự kiến hoàn tất sau <strong>{secondsLeft} giây</strong> (mô phỏng).
          Bạn vẫn có thể hủy đơn trong thời gian này.
        </div>
      )}
      {order.status === "cancelled" && (
        <div className="alert alert-secondary">
          Đơn hàng đã bị hủy lúc {order.cancelledAt && formatDateTime(order.cancelledAt)}.
          <br />
          Lý do: {order.cancelReason}
          {order.voucherCode && (
            <>
              <br />
              Mã giảm giá <strong>{order.voucherCode}</strong> đã được hoàn lại.
            </>
          )}
        </div>
      )}

      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <h2 className="h6 fw-bold mb-3">Sản phẩm</h2>
          {order.items.map((i) => (
            <div key={i.productId} className="mb-3 pb-3 border-bottom">
              <div className="d-flex gap-3 align-items-center">
                <GameThumb name={i.name} gradient={i.gradient} />
                <div className="flex-grow-1">
                  <Link to={`/products/${i.productId}`} className="fw-semibold text-dark">
                    {i.name}
                  </Link>
                  <div>
                    <span className="badge text-bg-dark">{i.platform}</span>
                  </div>
                  <small className="text-muted">
                    {i.quantity} × {formatVND(i.price)}
                  </small>
                </div>
                <div className="fw-semibold">{formatVND(i.price * i.quantity)}</div>
              </div>

              {order.status === "completed" ? (
                <div className="d-flex flex-column gap-2 mt-3">
                  {i.keys.map((k) => (
                    <div key={k} className="key-box d-flex justify-content-between align-items-center">
                      <span>{k}</span>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => copyKey(k)}>
                        {copied === k ? "Đã chép" : "Sao chép"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                order.status === "processing" && (
                  <div className="small text-muted mt-2">
                    Key game sẽ hiển thị tại đây khi đơn hàng hoàn tất.
                  </div>
                )
              )}
            </div>
          ))}

          <div className="ms-auto" style={{ maxWidth: 340 }}>
            <div className="d-flex justify-content-between mb-1">
              <span>Tạm tính</span>
              <span>{formatVND(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="d-flex justify-content-between mb-1 text-success">
                <span>Mã giảm giá {order.voucherCode && `(${order.voucherCode})`}</span>
                <span>-{formatVND(discount)}</span>
              </div>
            )}
            <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2">
              <span>Tổng tiền</span>
              <span className="price-now">{formatVND(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-3 small">
            <div className="col-md-4">
              <div className="text-muted">Phương thức thanh toán</div>
              <div className="fw-semibold">{paymentLabel(order.paymentMethod)}</div>
            </div>
            <div className="col-md-4">
              <div className="text-muted">Thông tin nhận key</div>
              <div className="fw-semibold">{order.buyer.fullName}</div>
              <div>{order.buyer.email}</div>
              <div>{order.buyer.phone}</div>
            </div>
            <div className="col-md-4">
              <div className="text-muted">Thời gian</div>
              <div>Đặt lúc: {formatDateTime(order.createdAt)}</div>
              {order.completedAt && <div>Hoàn tất: {formatDateTime(order.completedAt)}</div>}
            </div>
          </div>
        </div>
      </div>

      {processing && (
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            {!showCancel ? (
              <button className="btn btn-outline-danger" onClick={() => setShowCancel(true)}>
                Hủy đơn hàng
              </button>
            ) : (
              <>
                <h2 className="h6 fw-bold">Bạn muốn hủy đơn hàng này?</h2>
                <label htmlFor="cancel-reason" className="form-label small">
                  Lý do hủy
                </label>
                <select
                  id="cancel-reason"
                  className="form-select mb-3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  {cancelReasons.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(cancelOrder({ id: order.id, reason }))}
                  >
                    Xác nhận hủy
                  </button>
                  <button className="btn btn-outline-secondary" onClick={() => setShowCancel(false)}>
                    Giữ đơn hàng
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
