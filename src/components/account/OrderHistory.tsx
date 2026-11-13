import { useState } from "react";
import { Link } from "react-router-dom";
import { GameThumb } from "../common/GameThumb.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import { formatDateTime, formatVND } from "../../utils/format.ts";
import { orderStatusMeta } from "../../utils/orderStatus.ts";
import type { OrderStatus } from "../../types/index.ts";

const tabs: { id: "all" | OrderStatus; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "processing", label: "Đang xử lý" },
  { id: "completed", label: "Hoàn thành" },
  { id: "cancelled", label: "Đã hủy" },
];

export default function OrderHistory() {
  const user = useAppSelector((s) => s.auth.user);
  const allOrders = useAppSelector((s) => s.orders.items);
  const [tab, setTab] = useState<"all" | OrderStatus>("all");

  const mine = allOrders.filter((o) => o.userId === user?.id);
  const orders = tab === "all" ? mine : mine.filter((o) => o.status === tab);

  return (
    <div>
      <h1 className="h4 fw-bold mb-3">Lịch sử đơn hàng</h1>

      <ul className="nav nav-pills mb-3 gap-1">
        {tabs.map((t) => (
          <li className="nav-item" key={t.id}>
            <button
              className={`nav-link py-1 ${tab === t.id ? "active bg-dark" : "text-dark bg-white"}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {t.id !== "all" && ` (${mine.filter((o) => o.status === t.id).length})`}
            </button>
          </li>
        ))}
      </ul>

      {orders.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <p className="text-muted mb-3">
              {mine.length === 0 ? "Bạn chưa có đơn hàng nào." : "Không có đơn hàng ở trạng thái này."}
            </p>
            {mine.length === 0 && (
              <Link to="/products" className="btn btn-brand px-4">
                Mua sắm ngay
              </Link>
            )}
          </div>
        </div>
      ) : (
        orders.map((order) => {
          const meta = orderStatusMeta[order.status];
          const qty = order.items.reduce((s, i) => s + i.quantity, 0);
          return (
            <div className="card border-0 shadow-sm mb-3" key={order.id}>
              <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <div>
                    <div className="fw-bold">Mã đơn: {order.id}</div>
                    <small className="text-muted">{formatDateTime(order.createdAt)}</small>
                  </div>
                  <span className={`badge ${meta.badge}`}>{meta.label}</span>
                </div>

                <div className="d-flex flex-wrap gap-2 my-3">
                  {order.items.map((i) => (
                    <GameThumb key={i.productId} name={i.name} gradient={i.gradient} />
                  ))}
                </div>

                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <div>
                    {qty} sản phẩm · Tổng:{" "}
                    <span className="price-now">{formatVND(order.total)}</span>
                  </div>
                  <Link to={`/account/orders/${order.id}`} className="btn btn-outline-dark btn-sm">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
