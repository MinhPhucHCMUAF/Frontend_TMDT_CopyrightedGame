import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { newsCategories, newsList } from "../../data/newsData.ts";
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
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [sort, setSort] = useState("newest");

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
                    {newsCategories.map((item) => (
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
            </div>
        </div>
    );
}
export default News;