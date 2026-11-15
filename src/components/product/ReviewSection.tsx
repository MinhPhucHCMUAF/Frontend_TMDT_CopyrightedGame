import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { StarRating } from "../common/StarRating.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { deleteReview, saveReview } from "../../store/reviewsSlice.ts";
import { formatDateTime } from "../../utils/format.ts";
import { ratingStats } from "../../utils/rating.ts";

const MIN_COMMENT = 10;
const MAX_COMMENT = 500;

export function ReviewSection({ productId }: { productId: string }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const allReviews = useAppSelector((s) => s.reviews.items);

  const reviews = allReviews
    .filter((r) => r.productId === productId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const mine = reviews.find((r) => r.userId === user?.id);
  const { count, average } = ratingStats(allReviews, productId);

  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const startEdit = () => {
    if (!mine) return;
    setRating(mine.rating);
    setComment(mine.comment);
    setError("");
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setRating(0);
    setComment("");
    setError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    if (rating < 1) return setError("Vui lòng chọn số sao.");
    if (comment.trim().length < MIN_COMMENT)
      return setError(`Nhận xét tối thiểu ${MIN_COMMENT} ký tự.`);
    dispatch(
      saveReview({
        productId,
        userId: user.id,
        userName: user.fullName,
        rating,
        comment: comment.trim(),
      }),
    );
    cancelEdit();
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa đánh giá này?")) return;
    dispatch(deleteReview(id));
    cancelEdit();
  };

  const showForm = user && (!mine || editing);

  return (
    <div className="card border-0 shadow-sm" id="reviews">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <h2 className="h5 fw-bold mb-0">Đánh giá từ người chơi ({count})</h2>
          {count > 0 && (
            <div>
              <span className="fs-4 fw-bold me-2">{average.toFixed(1)}</span>
              <StarRating value={average} />
            </div>
          )}
        </div>

        {!user && (
          <div className="alert alert-info py-2">
            <Link to="/login" state={{ from: `/products/${productId}` }}>
              Đăng nhập
            </Link>{" "}
            để viết đánh giá.
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} noValidate className="border rounded-3 p-3 mb-4 bg-light">
            <div className="fw-semibold mb-1">
              {editing ? "Sửa đánh giá của bạn" : "Viết đánh giá của bạn"}
            </div>
            <div className="fs-4 mb-2">
              <StarRating value={rating} onChange={setRating} />
            </div>
            <textarea
              className="form-control mb-1"
              rows={3}
              maxLength={MAX_COMMENT}
              placeholder="Chia sẻ cảm nhận của bạn về game này..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setError("");
              }}
            />
            <div className="small text-muted text-end">
              {comment.length}/{MAX_COMMENT}
            </div>
            {error && <div className="text-danger small mb-2">{error}</div>}
            <div className="d-flex gap-2">
              <button className="btn btn-brand px-4">
                {editing ? "Lưu thay đổi" : "Gửi đánh giá"}
              </button>
              {editing && (
                <button type="button" className="btn btn-outline-secondary" onClick={cancelEdit}>
                  Hủy
                </button>
              )}
            </div>
          </form>
        )}

        {reviews.length === 0 ? (
          <p className="text-muted mb-0">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
        ) : (
          <ul className="list-unstyled mb-0">
            {reviews.map((r) => {
              const own = r.userId === user?.id;
              return (
                <li key={r.id} className="py-3 border-top">
                  <div className="d-flex justify-content-between flex-wrap gap-2">
                    <div>
                      <strong>{r.userName}</strong>
                      {own && <span className="badge text-bg-primary ms-2">Của bạn</span>}
                      <div>
                        <StarRating value={r.rating} />
                      </div>
                    </div>
                    <small className="text-muted">
                      {formatDateTime(r.updatedAt)}
                      {r.updatedAt !== r.createdAt && " (đã chỉnh sửa)"}
                    </small>
                  </div>
                  <p className="mt-2 mb-1" style={{ whiteSpace: "pre-line" }}>
                    {r.comment}
                  </p>
                  {own && !editing && (
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-dark" onClick={startEdit}>
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(r.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
