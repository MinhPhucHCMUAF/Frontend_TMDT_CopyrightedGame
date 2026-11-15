import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import type { Faq as FaqItem } from "../../data/infoData.ts";
import { useInfoData } from "../../hooks/useInfoData.ts";
import "./infostyle.css";

function Faq() {
    const { data: faqs, loading, error } = useInfoData<FaqItem[]>("/faqs", []);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [openId, setOpenId] = useState<number | null>(null);

    const categories = ["Tất cả", ...new Set(faqs.map((item) => item.category))];

    const result = faqs
        .filter((item) => category === "Tất cả" || item.category === category)
        .filter((item) => item.question.toLowerCase().includes(keyword.trim().toLowerCase()));

    return (
        <div className="info-page py-4">
            <div className="container">
                <h1 className="info-title">Câu hỏi thường gặp</h1>
                <p className="info-subtitle">
                    Giải đáp nhanh các thắc mắc về mua hàng, thanh toán, kích hoạt key và đổi trả.
                </p>

                <div className="info-search mb-3">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="info-search-icon" />
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Nhập câu hỏi bạn cần tìm..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>

                <div className="info-tabs">
                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={"info-tab" + (item === category ? " active" : "")}
                            onClick={() => setCategory(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {loading && <div className="info-empty">Đang tải câu hỏi...</div>}
                {!loading && error && <div className="info-empty">{error}</div>}
                {!loading && !error && result.length === 0 && (
                    <div className="info-empty">Không tìm thấy câu hỏi phù hợp.</div>
                )}

                <div className="faq-list">
                    {result.map((item) => (
                        <div className={"faq-item" + (openId === item.id ? " open" : "")} key={item.id}>
                            <button
                                type="button"
                                className="faq-question"
                                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                            >
                                <span>{item.question}</span>
                                <FontAwesomeIcon icon={faChevronDown} className="faq-icon" />
                            </button>
                            {openId === item.id && <p className="faq-answer">{item.answer}</p>}
                        </div>
                    ))}
                </div>

                <div className="info-help mt-4">
                    <p className="mb-0">Không tìm thấy câu trả lời bạn cần?</p>
                    <Link to="/lien-he" className="btn btn-danger">Gửi câu hỏi cho chúng tôi</Link>
                </div>
            </div>
        </div>
    );
}
export default Faq;
