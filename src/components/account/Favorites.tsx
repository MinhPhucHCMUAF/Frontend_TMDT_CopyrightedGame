import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { GameThumb } from "../common/GameThumb.tsx";
import { products } from "../../data/products.ts";
import { useAppDispatch } from "../../store/hooks.ts";
import { addToCart } from "../../store/cartSlice.ts";
import { useFavorites } from "../../hooks/useFavorites.ts";
import { formatVND } from "../../utils/format.ts";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const { ids, toggle } = useFavorites();
  const favorites = products.filter((p) => ids.includes(p.id));

  return (
    <div>
      <h1 className="h4 fw-bold mb-3">Game yêu thích ({favorites.length})</h1>

      {favorites.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <p className="text-muted mb-3">Bạn chưa lưu game yêu thích nào.</p>
            <Link to="/products" className="btn btn-brand px-4">
              Khám phá game
            </Link>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <ul className="list-group list-group-flush">
            {favorites.map((p) => (
              <li key={p.id} className="list-group-item p-3 d-flex flex-wrap align-items-center gap-3">
                <GameThumb name={p.name} gradient={p.gradient} />
                <div className="flex-grow-1" style={{ minWidth: 160 }}>
                  <Link to={`/products/${p.id}`} className="fw-bold text-dark">
                    {p.name}
                  </Link>
                  <div>
                    <span className="badge text-bg-dark">{p.platform}</span>
                  </div>
                </div>
                <div className="price-now">{formatVND(p.price)}</div>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => dispatch(addToCart({ product: p }))}
                >
                  <FontAwesomeIcon icon={faCartPlus} /> Thêm vào giỏ
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  aria-label={`Bỏ yêu thích ${p.name}`}
                  onClick={() => toggle(p.id)}
                >
                  <FontAwesomeIcon icon={faHeartCrack} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
