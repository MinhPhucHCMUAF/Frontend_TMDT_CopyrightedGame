import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/shop.css";
import { GameThumb } from "../common/GameThumb.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  MAX_QTY,
  clearCart,
  removeFromCart,
  selectCartCount,
  updateQuantity,
} from "../../store/cartSlice.ts";
import { VoucherBox } from "../voucher/VoucherBox.tsx";
import { usePricing } from "../../hooks/usePricing.ts";
import { formatVND } from "../../utils/format.ts";

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const count = useAppSelector(selectCartCount);
  const { subtotal, discount, voucher, total } = usePricing();

  if (items.length === 0) {
    return (
      <div className="shop-page">
        <div className="container text-center py-5">
          <FontAwesomeIcon icon={faCartShopping} className="display-3 text-secondary mb-3" />
          <h1 className="h4">Giỏ hàng của bạn đang trống</h1>
          <p className="text-muted">Hãy chọn vài tựa game yêu thích nhé!</p>
          <Link to="/products" className="btn btn-brand px-4">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold mb-0">Giỏ hàng ({count} sản phẩm)</h1>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              if (window.confirm("Xóa toàn bộ sản phẩm trong giỏ hàng?"))
                dispatch(clearCart());
            }}
          >
            <FontAwesomeIcon icon={faTrash} /> Xóa tất cả
          </button>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <ul className="list-group list-group-flush">
                {items.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="list-group-item p-3 d-flex flex-wrap align-items-center gap-3"
                  >
                    <GameThumb name={product.name} gradient={product.gradient} />
                    <div className="flex-grow-1" style={{ minWidth: 160 }}>
                      <div className="fw-bold">{product.name}</div>
                      <span className="badge text-bg-dark">{product.platform}</span>
                      <div className="text-muted small mt-1">
                        Đơn giá: {formatVND(product.price)}
                      </div>
                    </div>
                    <div className="qty-box">
                      <button
                        aria-label="Giảm số lượng"
                        disabled={quantity <= 1}
                        onClick={() =>
                          dispatch(updateQuantity({ productId: product.id, quantity: quantity - 1 }))
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} size="xs" />
                      </button>
                      <span>{quantity}</span>
                      <button
                        aria-label="Tăng số lượng"
                        disabled={quantity >= MAX_QTY}
                        onClick={() =>
                          dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }))
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} size="xs" />
                      </button>
                    </div>
                    <div className="price-now text-end" style={{ minWidth: 110 }}>
                      {formatVND(product.price * quantity)}
                    </div>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      aria-label={`Xóa ${product.name}`}
                      onClick={() => dispatch(removeFromCart(product.id))}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/products" className="d-inline-block mt-3">
              ← Tiếp tục mua sắm
            </Link>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm sticky-summary">
              <div className="card-body">
                <h2 className="h5 fw-bold mb-3">Tóm tắt đơn hàng</h2>
                <div className="mb-3">
                  <VoucherBox />
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tạm tính ({count} sản phẩm)</span>
                  <span>{formatVND(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Phí giao key</span>
                  <span className="text-success">Miễn phí</span>
                </div>
                {discount > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Giảm giá {voucher && `(${voucher.code})`}</span>
                    <span>-{formatVND(discount)}</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                  <span>Tổng cộng</span>
                  <span className="price-now">{formatVND(total)}</span>
                </div>
                <Link to="/checkout" className="btn btn-warning w-100 fw-bold py-2">
                  Tiến hành thanh toán
                </Link>
                <p className="text-muted small text-center mt-3 mb-0">
                  Mỗi sản phẩm tối đa {MAX_QTY} key / đơn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
