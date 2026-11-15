import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheck, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import "../../styles/shop.css";
import { GameThumb } from "../common/GameThumb.tsx";
import { StarRating } from "../common/StarRating.tsx";
import { ReviewSection } from "./ReviewSection.tsx";
import { products } from "../../data/products.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { addToCart } from "../../store/cartSlice.ts";
import { useFavorites } from "../../hooks/useFavorites.ts";
import { formatVND } from "../../utils/format.ts";
import { ratingStats } from "../../utils/rating.ts";

export default function ProductDetail() {
  const { id } = useParams();
  const { hash } = useLocation();
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((s) => s.reviews.items);
  const { isFavorite, toggle } = useFavorites();
  const [added, setAdded] = useState(false);

  // Link dạng /products/p1#reviews: cuộn tới phần đánh giá
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, [hash, id]);

  const product = products.find((p) => p.id === id);
  if (!product) {
    return (
      <div className="shop-page">
        <div className="container text-center py-5">
          <h1 className="h4">Không tìm thấy sản phẩm</h1>
          <Link to="/products" className="btn btn-brand px-4 mt-3">
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const { count, average } = ratingStats(reviews, product.id);
  const fav = isFavorite(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    dispatch(addToCart({ product }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="shop-page">
      <div className="container">
        <nav className="small mb-3">
          <Link to="/products">Sản phẩm</Link> / {product.name}
        </nav>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-md-5">
                <div style={{ borderRadius: 12, overflow: "hidden" }}>
                  <GameThumb name={product.name} gradient={product.gradient} size="lg" />
                </div>
              </div>
              <div className="col-md-7">
                <span className="badge text-bg-dark me-1">{product.platform}</span>
                <span className="badge text-bg-light border">{product.genre}</span>
                <h1 className="h3 fw-bold mt-2">{product.name}</h1>
                <div className="mb-3 text-muted">
                  {count > 0 ? (
                    <>
                      <StarRating value={average} /> {average.toFixed(1)} · {count} đánh giá
                    </>
                  ) : (
                    "Chưa có đánh giá"
                  )}
                </div>
                <p>{product.description}</p>
                <div className="mb-3">
                  <span className="price-now fs-3">{formatVND(product.price)}</span>
                  {product.originalPrice && (
                    <>
                      <small className="text-muted text-decoration-line-through ms-2">
                        {formatVND(product.originalPrice)}
                      </small>
                      <span className="badge bg-danger ms-2">-{discount}%</span>
                    </>
                  )}
                </div>
                <div className="d-flex gap-2">
                  <button
                    className={`btn px-4 ${added ? "btn-success" : "btn-warning"}`}
                    onClick={handleAdd}
                  >
                    <FontAwesomeIcon icon={added ? faCheck : faCartPlus} />{" "}
                    {added ? "Đã thêm" : "Thêm vào giỏ"}
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => toggle(product.id)}>
                    <FontAwesomeIcon icon={fav ? faHeart : faHeartRegular} />{" "}
                    {fav ? "Đã yêu thích" : "Yêu thích"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReviewSection productId={product.id} />
      </div>
    </div>
  );
}
