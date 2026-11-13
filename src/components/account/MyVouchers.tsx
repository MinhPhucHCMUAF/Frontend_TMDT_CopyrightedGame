import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vouchers } from "../../data/vouchers.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { applyVoucher } from "../../store/cartSlice.ts";
import { useUsedVoucherCodes } from "../../hooks/usePricing.ts";
import { useNow } from "../../hooks/useNow.ts";
import { formatDateTime, formatVND } from "../../utils/format.ts";
import { voucherStatus } from "../../utils/voucher.ts";

const statusLabel = {
  available: { text: "Có thể dùng", badge: "text-bg-success" },
  used: { text: "Đã sử dụng", badge: "text-bg-secondary" },
  expired: { text: "Hết hạn", badge: "text-bg-danger" },
};

export default function MyVouchers() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartCount = useAppSelector((s) => s.cart.items.length);
  const used = useUsedVoucherCodes();
  const now = useNow(false);
  const [tab, setTab] = useState<"available" | "inactive">("available");
  const [copied, setCopied] = useState<string | null>(null);

  const rows = vouchers.map((v) => ({ v, status: voucherStatus(v, used, now) }));
  const list = rows.filter((r) => (tab === "available" ? r.status === "available" : r.status !== "available"));

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied((cur) => (cur === code ? null : cur)), 1200);
    } catch {
      // clipboard bị chặn: bỏ qua
    }
  };

  const handleUse = (code: string) => {
    dispatch(applyVoucher(code));
    navigate(cartCount > 0 ? "/cart" : "/products");
  };

  return (
    <div>
      <h1 className="h4 fw-bold mb-3">Mã giảm giá của tôi</h1>

      <ul className="nav nav-pills mb-3 gap-1">
        {(
          [
            ["available", `Có thể dùng (${rows.filter((r) => r.status === "available").length})`],
            ["inactive", `Đã dùng / Hết hạn (${rows.filter((r) => r.status !== "available").length})`],
          ] as const
        ).map(([id, label]) => (
          <li className="nav-item" key={id}>
            <button
              className={`nav-link py-1 ${tab === id ? "active bg-dark" : "text-dark bg-white"}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {list.length === 0 && (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center text-muted py-5">Không có mã giảm giá nào.</div>
        </div>
      )}

      {list.map(({ v, status }) => {
        const meta = statusLabel[status];
        return (
          <div key={v.code} className={`card voucher-card mb-3 ${status !== "available" ? "disabled" : ""}`}>
            <div className="card-body d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div>
                <div className="mb-1">
                  <span className="voucher-code me-2">{v.code}</span>
                  <span className={`badge ${meta.badge}`}>{meta.text}</span>
                </div>
                <div className="fw-bold">{v.title}</div>
                <div className="small">{v.description}</div>
                <div className="small text-muted">
                  Đơn tối thiểu {formatVND(v.minOrder)} · HSD: {formatDateTime(v.expiresAt)}
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => copy(v.code)}>
                  {copied === v.code ? "Đã chép" : "Sao chép"}
                </button>
                {status === "available" && (
                  <button className="btn btn-sm btn-warning fw-semibold" onClick={() => handleUse(v.code)}>
                    Dùng ngay
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
