import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { GameThumb } from "../common/GameThumb.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import { useFavorites } from "../../hooks/useFavorites.ts";
import { formatDateTime } from "../../utils/format.ts";

interface OwnedGame {
  productId: string;
  name: string;
  platform: string;
  gradient: string;
  purchasedAt: string;
  keys: string[];
}

export default function Library() {
  const user = useAppSelector((s) => s.auth.user);
  const orders = useAppSelector((s) => s.orders.items);
  const { isFavorite, toggle } = useFavorites();
  const [copied, setCopied] = useState<string | null>(null);

  const mine = orders.filter((o) => o.userId === user?.id);
  const pendingCount = mine.filter((o) => o.status === "processing").length;

  // Gom game từ các đơn đã hoàn tất (đơn cũ nhất xử lý trước để ngày mua là lần đầu mua)
  const owned = new Map<string, OwnedGame>();
  [...mine]
    .filter((o) => o.status === "completed")
    .reverse()
    .forEach((o) =>
      o.items.forEach((i) => {
        const cur = owned.get(i.productId);
        if (cur) cur.keys.push(...i.keys);
        else
          owned.set(i.productId, {
            productId: i.productId,
            name: i.name,
            platform: i.platform,
            gradient: i.gradient,
            purchasedAt: o.completedAt ?? o.createdAt,
            keys: [...i.keys],
          });
      }),
    );
  const games = [...owned.values()];

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
      <h1 className="h4 fw-bold mb-3">Thư viện game ({games.length})</h1>

      {pendingCount > 0 && (
        <div className="alert alert-warning py-2">
          Bạn có {pendingCount} đơn hàng đang xử lý, game sẽ xuất hiện trong thư viện khi đơn hoàn tất.
        </div>
      )}

      {games.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <p className="text-muted mb-3">Thư viện của bạn chưa có game nào.</p>
            <Link to="/products" className="btn btn-brand px-4">
              Khám phá game
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-3">
          {games.map((g) => {
            const fav = isFavorite(g.productId);
            return (
              <div className="col-12 col-xl-6" key={g.productId}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <GameThumb name={g.name} gradient={g.gradient} />
                      <div className="flex-grow-1">
                        <div className="fw-bold">{g.name}</div>
                        <span className="badge text-bg-dark">{g.platform}</span>
                        <div className="small text-muted mt-1">
                          Mua ngày {formatDateTime(g.purchasedAt)}
                        </div>
                      </div>
                      <button
                        className="btn btn-sm btn-light align-self-start"
                        aria-label={fav ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                        onClick={() => toggle(g.productId)}
                      >
                        <FontAwesomeIcon
                          icon={fav ? faHeart : faHeartRegular}
                          className={fav ? "text-danger" : "text-secondary"}
                        />
                      </button>
                    </div>

                    <div className="d-flex flex-column gap-2 mt-3">
                      {g.keys.map((k) => (
                        <div key={k} className="key-box d-flex justify-content-between align-items-center">
                          <span>{k}</span>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => copyKey(k)}>
                            {copied === k ? "Đã chép" : "Sao chép"}
                          </button>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={`/products/${g.productId}#reviews`}
                      className="btn btn-sm btn-outline-dark mt-3"
                    >
                      Đánh giá game
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
