import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEye } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { News } from "../../data/newsData.ts";
import { API_URL } from "../../api/api.ts";
import "./newsstyle.css";

function NewsDetail() {
    const { id } = useParams();
    const [news, setNews] = useState<News | null>(null);
    const [related, setRelated] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        fetch(API_URL + "/news/" + id)
            .then((res) => {
                if (res.status === 404) throw new Error("Không tìm thấy bài viết này.");
                if (!res.ok) throw new Error("Không tải được bài viết. Hãy kiểm tra json-server đã chạy chưa.");
                return res.json();
            })
            .then((data: News) => {
                setNews(data);
                window.scrollTo(0, 0);
                return fetch(API_URL + "/news?category=" + encodeURIComponent(data.category));
            })
            .then((res) => res.json())
            .then((list: News[]) => setRelated(list.filter((item) => String(item.id) !== id).slice(0, 3)))
            .catch((err: Error) =>
                setError(err instanceof TypeError ? "Không tải được bài viết. Hãy kiểm tra json-server đã chạy chưa." : err.message),
            )
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="news-page py-4">
                <div className="container">
                    <div className="news-empty">Đang tải bài viết...</div>
                </div>
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="news-page py-4">
                <div className="container">
                    <div className="news-empty">
                        <p>{error}</p>
                        <Link to="/tin-tuc" className="btn btn-danger">
                            <FontAwesomeIcon icon={faArrowLeft} /> Quay lại trang tin tức
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="news-page py-4">
            <div className="container">
                <nav className="news-breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/tin-tuc">Tin tức</Link>
                    <span>/</span>
                    <span className="text-truncate">{news.title}</span>
                </nav>

                <div className="row g-4">
                    <article className="col-lg-8">
                        <span className="badge news-card-category position-static">{news.category}</span>
                        <h1 className="news-detail-title">{news.title}</h1>
                        <div className="news-detail-meta">
                            <span>
                                <FontAwesomeIcon icon={faCalendar} /> {new Date(news.date).toLocaleDateString("vi-VN")}
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faEye} /> {news.views.toLocaleString("vi-VN")} lượt xem
                            </span>
                        </div>
                        <p className="news-detail-summary">{news.summary}</p>
                        <img src={news.image} alt={news.title} className="news-detail-image" />
                        <div className="news-detail-content">
                            {news.content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <Link to="/tin-tuc" className="news-detail-back">
                            <FontAwesomeIcon icon={faArrowLeft} /> Quay lại trang tin tức
                        </Link>
                    </article>

                    <aside className="col-lg-4">
                        <div className="news-related">
                            <h2 className="news-related-title">Bài viết liên quan</h2>
                            {related.length === 0 && <p className="news-related-empty">Chưa có bài viết cùng danh mục.</p>}
                            {related.map((item) => (
                                <Link to={"/tin-tuc/" + item.id} key={item.id} className="news-related-item">
                                    <img src={item.image} alt={item.title} />
                                    <div>
                                        <h3>{item.title}</h3>
                                        <span>{new Date(item.date).toLocaleDateString("vi-VN")}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
export default NewsDetail;