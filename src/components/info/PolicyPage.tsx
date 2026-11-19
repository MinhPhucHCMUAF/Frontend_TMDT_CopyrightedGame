import { Link } from "react-router-dom";
import { usePolicyData } from "../../hooks/usePolicyData";
import "./infostyle.css";

function PolicyPage({ policyId }: { policyId: string }) {
    const { policy, loading } = usePolicyData(policyId);

    return (
        <div className="info-page py-4">
            <div className="container">
                {loading && <div className="info-empty">Đang tải nội dung...</div>}
                {!loading && policy === null && <div className="info-empty">Không tìm thấy chính sách.</div>}

                {!loading && policy !== null && (
                    <div className="row g-4">
                        <aside className="col-lg-3">
                            <div className="info-box policy-menu">
                                <h2 className="info-box-title">Nội dung</h2>
                                {policy.sections.map((section: any, index: number) => (
                                    <a href={"#muc-" + (index + 1)} key={section.heading}>
                                        {index + 1}. {section.heading}
                                    </a>
                                ))}
                            </div>
                        </aside>
                        <article className="col-lg-9">
                            <h1 className="info-title">{policy.title}</h1>
                            <p className="policy-date">
                                Cập nhật ngày {new Date(policy.updatedAt).toLocaleDateString("vi-VN")}
                            </p>
                            <p className="policy-summary">{policy.summary}</p>
                            {policy.sections.map((section: any, index: number) => (
                                <section className="policy-section" id={"muc-" + (index + 1)} key={section.heading}>
                                    <h2>{index + 1}. {section.heading}</h2>
                                    <ul>
                                        {section.paragraphs.map((text: any) => (
                                            <li key={text}>{text}</li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                            <div className="info-help">
                                <p className="mb-0">Bạn còn thắc mắc về chính sách này?</p>
                                <Link to="/lien-he" className="btn btn-danger">Liên hệ hỗ trợ</Link>
                            </div>
                        </article>
                    </div>
                )}
            </div>
        </div>
    );
}
export default PolicyPage;
