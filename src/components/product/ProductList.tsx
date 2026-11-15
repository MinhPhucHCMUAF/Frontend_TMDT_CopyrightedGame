import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheck, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import "../../styles/shop.css";
import { GameThumb } from "../common/GameThumb.tsx";
import { StarRating } from "../common/StarRating.tsx";
import { products } from "../../data/products.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { addToCart } from "../../store/cartSlice.ts";
import { useFavorites } from "../../hooks/useFavorites.ts";
import { formatVND } from "../../utils/format.ts";
import { ratingStats } from "../../utils/rating.ts";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((s) => s.reviews.items);
  const { isFavorite, toggle } = useFavorites();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    dispatch(addToCart({ product }));
    setAddedId(id);
    setTimeout(() => setAddedId((cur) => (cur === id ? null : cur)), 1200);
  };

  return (
    <div className="shop-page">
      <div className="container">
        <h1 className="h3 fw-bold mb-4">Tất cả sản phẩm</h1>
        <div className="row g-4">
          {products.map((p) => {
            const discount = p.originalPrice
              ? Math.round((1 - p.price / p.originalPrice) * 100)
              : 0;
            const { count, average } = ratingStats(reviews, p.id);
            const fav = isFavorite(p.id);
            return (
              <div className="col-12 col-sm-6 col-lg-3" key={p.id}>
                <div className="card product-card h-100">
                  <div className="position-relative">
                    <Link to={`/products/${p.id}`} className="text-decoration-none">
                      <GameThumb name={p.name} gradient={p.gradient} size="lg" />
                    </Link>
                    <button
                      className="fav-btn"
                      aria-label={fav ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                      onClick={() => toggle(p.id)}
                    >
                      <FontAwesomeIcon
                        icon={fav ? faHeart : faHeartRegular}
                        className={fav ? "text-danger" : "text-secondary"}
                      />
                    </button>
                    {discount > 0 && (
                      <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="mb-1">
                      <span className="badge text-bg-dark me-1">{p.platform}</span>
                      <span className="badge text-bg-light border">{p.genre}</span>
                    </div>
                    <h2 className="h6 fw-bold mt-2 mb-1">
                      <Link to={`/products/${p.id}`} className="text-dark text-decoration-none">
                        {p.name}
                      </Link>
                    </h2>
                    <div className="small text-muted mb-2">
                      {count > 0 ? (
                        <>
                          <StarRating value={average} /> {average.toFixed(1)} ({count})
                        </>
                      ) : (
                        "Chưa có đánh giá"
                      )}
                    </div>
                    <div className="mt-auto">
                      <div className="mb-2">
                        <span className="price-now fs-5">{formatVND(p.price)}</span>
                        {p.originalPrice && (
                          <small className="text-muted text-decoration-line-through ms-2">
                            {formatVND(p.originalPrice)}
                          </small>
                        )}
                      </div>
                      <button
                        className={`btn w-100 ${addedId === p.id ? "btn-success" : "btn-warning"}`}
                        onClick={() => handleAdd(p.id)}
                      >
                        <FontAwesomeIcon icon={addedId === p.id ? faCheck : faCartPlus} />{" "}
                        {addedId === p.id ? "Đã thêm" : "Thêm vào giỏ"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
