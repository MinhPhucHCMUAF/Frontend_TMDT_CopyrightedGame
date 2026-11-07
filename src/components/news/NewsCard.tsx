import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEye } from "@fortawesome/free-regular-svg-icons";
import type { News } from "../../data/newsData.ts";

type NewsCardProps = {
    news: News;
};

export function NewsCard({ news }: NewsCardProps) {
    return (
        <Link to={"/tin-tuc/" + news.id} className="news-card">
            <div className="news-card-image">
                <img src={news.image} alt={news.title} />
                <span className="badge news-card-category">{news.category}</span>
            </div>
            <div className="news-card-body">
                <h3 className="news-card-title">{news.title}</h3>
                <p className="news-card-summary">{news.summary}</p>
                <div className="news-card-meta">
          <span>
            <FontAwesomeIcon icon={faCalendar} />{" "}
              {new Date(news.date).toLocaleDateString("vi-VN")}
          </span>
                    <span>
            <FontAwesomeIcon icon={faEye} /> {news.views.toLocaleString("vi-VN")}
          </span>
                </div>
            </div>
        </Link>
    );
}