import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useFaqData } from "../../hooks/useFaqData";
import "./infostyle.css";

function Faq() {
    const { faqs, loading } = useFaqData();
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [openId, setOpenId] = useState(0);

    const categories = ["Tất cả"];
    faqs.forEach((item: any) => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }
    });

    const result = faqs
        .filter((item: any) => category === "Tất cả" || item.category === category)
        .filter((item: any) => item.question.toLowerCase().includes(keyword.toLowerCase()));

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
                {!loading && faqs.length === 0 && <div className="info-empty">Không tải được câu hỏi. Hãy kiểm tra json-server đã chạy chưa.</div>}
                {!loading && faqs.length > 0 && result.length === 0 && (
                    <div className="info-empty">Không tìm thấy câu hỏi phù hợp.</div>
                )}

                <div className="faq-list">
                    {result.map((item: any) => (
                        <div className={"faq-item" + (openId === item.id ? " open" : "")} key={item.id}>
                            <button
                                type="button"
                                className="faq-question"
                                onClick={() => setOpenId(openId === item.id ? 0 : item.id)}
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
