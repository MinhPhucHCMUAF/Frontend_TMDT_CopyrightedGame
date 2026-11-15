import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import type { Guide as GuideItem } from "../../data/infoData.ts";
import { useInfoData } from "../../hooks/useInfoData.ts";
import "./infostyle.css";

function Guide() {
    const { data: guides, loading, error } = useInfoData<GuideItem[]>("/guides", []);
    const [platform, setPlatform] = useState("steam");

    const buyGuide = guides.find((item) => item.id === "mua-hang");
    const activeGuides = guides.filter((item) => item.id !== "mua-hang");
    const currentGuide = activeGuides.find((item) => item.id === platform);

    return (
        <div className="info-page py-4">
            <div className="container">
                <h1 className="info-title">Hướng dẫn mua và kích hoạt game</h1>
                <p className="info-subtitle">
                    Chỉ vài bước để mua game bản quyền và kích hoạt key trên nền tảng bạn dùng.
                </p>

                {loading && <div className="info-empty">Đang tải hướng dẫn...</div>}
                {!loading && error && <div className="info-empty">{error}</div>}

                {!loading && !error && (
                    <>
                        {buyGuide && (
                            <section className="info-box mb-4">
                                <h2 className="info-box-title">{buyGuide.title}</h2>
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                                    {buyGuide.steps.map((step, index) => (
                                        <div className="col" key={step.title}>
                                            <div className="guide-step">
                                                <span className="guide-step-number">{index + 1}</span>
                                                <h3>{step.title}</h3>
                                                <p>{step.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="info-box mb-4">
                            <h2 className="info-box-title">Kích hoạt key theo nền tảng</h2>
                            <div className="info-tabs">
                                {activeGuides.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={"info-tab" + (item.id === platform ? " active" : "")}
                                        onClick={() => setPlatform(item.id)}
                                    >
                                        {item.platform}
                                    </button>
                                ))}
                            </div>
                            {currentGuide && (
                                <ol className="guide-list">
                                    {currentGuide.steps.map((step) => (
                                        <li key={step.title}>
                                            <strong>{step.title}</strong>
                                            <p>{step.text}</p>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </section>
                    </>
                )}

                <div className="info-help">
                    <p className="mb-0">Vẫn gặp khó khăn khi mua hoặc kích hoạt key?</p>
                    <div className="d-flex flex-wrap gap-2">
                        <Link to="/cau-hoi-thuong-gap" className="btn btn-outline-light">
                            <FontAwesomeIcon icon={faCircleQuestion} /> Câu hỏi thường gặp
                        </Link>
                        <Link to="/lien-he" className="btn btn-danger">
                            <FontAwesomeIcon icon={faHeadset} /> Liên hệ hỗ trợ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Guide;
