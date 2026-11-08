import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import type { News as NewsItem } from "../../data/newsData.ts";
import { API_URL } from "../../api/api.ts";
import { NewsCard } from "./NewsCard.tsx";
import "./newsstyle.css";

function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d");
}

function News() {
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [sort, setSort] = useState("newest");

    useEffect(() => {
        fetch(API_URL + "/news")
            .then((res) => {
                if (!res.ok) throw new Error("Lỗi " + res.status);
                return res.json();
            })
            .then((data: NewsItem[]) => setNewsList(data))
            .catch(() => setError("Không tải được tin tức. Hãy kiểm tra json-server đã chạy chưa."))
            .finally(() => setLoading(false));
    }, []);

    const categories = ["Tất cả", ...new Set(newsList.map((news) => news.category))];

    const result = newsList
        .filter((news) => normalize(news.title).includes(normalize(keyword.trim())))
        .filter((news) => category === "Tất cả" || news.category === category)
        .sort((a, b) =>
            sort === "newest"
                ? b.date.localeCompare(a.date)
                : b.views - a.views,
        );

    return (
        <div className="news-page py-4">
            <div className="container">
                <h1 className="news-page-title">Tin tức game</h1>
                <p className="news-page-subtitle">
                    Cập nhật tin mới, khuyến mãi, đánh giá và hướng dẫn mua game bản quyền
                </p>

                <div className="news-toolbar">
                    <div className="news-search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="news-search-icon" />
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Tìm bài viết theo tiêu đề..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <select
                        className="form-select news-sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="popular">Nổi bật</option>
                    </select>
                </div>

                <div className="news-categories">
                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={"news-category" + (item === category ? " active" : "")}
                            onClick={() => setCategory(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {loading && <div className="news-empty">Đang tải tin tức...</div>}

                {!loading && error && <div className="news-empty">{error}</div>}

                {!loading && !error && (
                    <>
                        <p className="news-count">Tìm thấy {result.length} bài viết</p>
                        {result.length > 0 ? (
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                {result.map((news) => (
                                    <div className="col" key={news.id}>
                                        <NewsCard news={news} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="news-empty">
                                Không có bài viết nào phù hợp. Hãy thử từ khóa hoặc danh mục khác.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
export default News;