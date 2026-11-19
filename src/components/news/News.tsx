import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNewsData } from "../../hooks/useNewsData";
import { NewsCard } from "./NewsCard";
import "./newsstyle.css";

function News() {
    const { news } = useNewsData();
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [sort, setSort] = useState("newest");

    const categories = ["Tất cả"];
    news.forEach((n: any) => {
        if (!categories.includes(n.category)) {
            categories.push(n.category);
        }
    });

    const result = news
        .filter((n: any) => n.title.toLowerCase().includes(keyword.toLowerCase()))
        .filter((n: any) => category === "Tất cả" || n.category === category)
        .sort((a: any, b: any) => {
            if (sort === "newest") {
                return b.date.localeCompare(a.date);
            }
            return b.views - a.views;
        });

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

                <p className="news-count">Tìm thấy {result.length} bài viết</p>
                {result.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {result.map((n: any) => (
                            <div className="col" key={n.id}>
                                <NewsCard news={n} />
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
