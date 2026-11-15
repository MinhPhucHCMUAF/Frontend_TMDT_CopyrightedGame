import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/shop.css";
import { GameThumb } from "../common/GameThumb.tsx";
import { TextField } from "../common/FormFields.tsx";
import { VoucherBox } from "../voucher/VoucherBox.tsx";
import { usePricing } from "../../hooks/usePricing.ts";
import { paymentMethods } from "../../data/payments.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { clearCart } from "../../store/cartSlice.ts";
import { addOrder } from "../../store/orderSlice.ts";
import type { Order, PaymentMethodId } from "../../types/index.ts";
import {
  formatVND,
  generateGameKey,
  generateOrderId,
} from "../../utils/format.ts";
import { isEmail, isPhone } from "../../utils/validators.ts";

export default function Checkout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const items = useAppSelector((s) => s.cart.items);
  const { subtotal, discount, voucher, total, error: voucherError } = usePricing();

  const [buyer, setBuyer] = useState({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });
  const [payment, setPayment] = useState<PaymentMethodId>("momo");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  // Giỏ trống (kể cả ngay sau khi đặt hàng xong) thì quay lại giỏ hàng
  if (items.length === 0 && !processing) return <Navigate to="/cart" replace />;

  const set = (key: keyof typeof buyer) => (value: string) =>
    setBuyer((b) => ({ ...b, [key]: value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || voucherError) return;
    const next: Record<string, string> = {};
    if (buyer.fullName.trim().length < 2) next.fullName = "Vui lòng nhập họ tên.";
    if (!isEmail(buyer.email)) next.email = "Email không hợp lệ.";
    if (!isPhone(buyer.phone)) next.phone = "Số điện thoại không hợp lệ.";
    if (!agree) next.agree = "Bạn cần đồng ý với điều khoản mua hàng.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setProcessing(true);
    // Giả lập cổng thanh toán xử lý ~1.5 giây
    setTimeout(() => {
      const order: Order = {
        id: generateOrderId(),
        userId: user.id,
        createdAt: new Date().toISOString(),
        status: "processing",
        paymentMethod: payment,
        buyer: { ...buyer },
        subtotal,
        discount,
        voucherCode: voucher?.code,
        total,
        items: items.map(({ product, quantity }) => ({
          productId: product.id,
          name: product.name,
          platform: product.platform,
          gradient: product.gradient,
          price: product.price,
          quantity,
          keys: Array.from({ length: quantity }, () => generateGameKey()),
        })),
      };
      dispatch(addOrder(order));
      dispatch(clearCart());
      navigate(`/account/orders/${order.id}`, { state: { justOrdered: true } });
    }, 1500);
  };

  return (
    <div className="shop-page">
      <div className="container">
        <h1 className="h3 fw-bold mb-4">Thanh toán</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h2 className="h5 fw-bold mb-3">1. Thông tin nhận key</h2>
                  <TextField
                    id="co-name"
                    label="Họ và tên"
                    value={buyer.fullName}
                    onValue={set("fullName")}
                    error={errors.fullName}
                  />
                  <div className="row">
                    <div className="col-md-6">
                      <TextField
                        id="co-email"
                        label="Email nhận key"
                        type="email"
                        value={buyer.email}
                        onValue={set("email")}
                        error={errors.email}
                      />
                    </div>
                    <div className="col-md-6">
                      <TextField
                        id="co-phone"
                        label="Số điện thoại"
                        type="tel"
                        value={buyer.phone}
                        onValue={set("phone")}
                        error={errors.phone}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h2 className="h5 fw-bold mb-3">2. Phương thức thanh toán</h2>
                  <div className="list-group">
                    {paymentMethods.map((m) => (
                      <label
                        key={m.id}
                        className={`list-group-item d-flex gap-3 align-items-center ${payment === m.id ? "border-warning bg-warning-subtle" : ""}`}
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          className="form-check-input mt-0"
                          checked={payment === m.id}
                          onChange={() => setPayment(m.id)}
                        />
                        <div>
                          <div className="fw-semibold">{m.label}</div>
                          <small className="text-muted">{m.description}</small>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="alert alert-secondary py-2 small mt-3 mb-0">
                    Đây là trang thanh toán mô phỏng - không có giao dịch hay khoản tiền thật nào được thực hiện.
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card border-0 shadow-sm sticky-summary">
                <div className="card-body">
                  <h2 className="h5 fw-bold mb-3">Đơn hàng của bạn</h2>
                  <ul className="list-unstyled mb-3">
                    {items.map(({ product, quantity }) => (
                      <li key={product.id} className="d-flex gap-3 align-items-center mb-3">
                        <GameThumb name={product.name} gradient={product.gradient} />
                        <div className="flex-grow-1">
                          <div className="fw-semibold">{product.name}</div>
                          <small className="text-muted">
                            {product.platform} · SL: {quantity}
                          </small>
                        </div>
                        <div className="fw-semibold">{formatVND(product.price * quantity)}</div>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <div className="mb-3">
                    <VoucherBox />
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Tạm tính</span>
                    <span>{formatVND(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="d-flex justify-content-between mb-1 text-success">
                      <span>Giảm giá {voucher && `(${voucher.code})`}</span>
                      <span>-{formatVND(discount)}</span>
                    </div>
                  )}
                  <hr />
                  <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                    <span>Tổng thanh toán</span>
                    <span className="price-now">{formatVND(total)}</span>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      id="co-agree"
                      type="checkbox"
                      className={`form-check-input ${errors.agree ? "is-invalid" : ""}`}
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                    />
                    <label htmlFor="co-agree" className="form-check-label small">
                      Tôi đồng ý với <Link to="/">điều khoản mua hàng</Link> và chính sách đổi trả key.
                    </label>
                    {errors.agree && <div className="invalid-feedback">{errors.agree}</div>}
                  </div>

                  {voucherError && (
                    <div className="text-danger small mb-2">
                      Vui lòng gỡ hoặc đổi mã giảm giá không hợp lệ trước khi thanh toán.
                    </div>
                  )}
                  <button className="btn btn-warning w-100 fw-bold py-2" disabled={processing}>
                    {processing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Đang xử lý thanh toán...
                      </>
                    ) : (
                      `Thanh toán ${formatVND(total)}`
                    )}
                  </button>
                  <Link to="/cart" className="d-block text-center mt-3 small">
                    ← Quay lại giỏ hàng
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
