import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPaperPlane,
    faCircleCheck,
    faMagnifyingGlass,
    faRotateLeft,
    faKey,
    faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import type { SupportForm, SupportTicket } from "../../data/supportData.ts";
import { issueTypes, keyIssues, platforms } from "../../data/supportData.ts";
import { API_URL } from "../../api/api.ts";
import "./supportstyle.css";

const emptyForm: SupportForm = {
    fullName: "",
    email: "",
    orderCode: "",
    issueType: "",
    platform: "",
    gameKey: "",
    imageUrl: "",
    description: "",
};

function validate(form: SupportForm, isKeyIssue: boolean) {
    const errors: Partial<Record<keyof SupportForm, string>> = {};
    if (form.fullName.trim().length < 2) errors.fullName = "Vui lòng nhập họ tên.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Email không hợp lệ.";
    if (!/^KG\d{6}$/i.test(form.orderCode.trim())) errors.orderCode = "Mã đơn hàng gồm KG và 6 chữ số, ví dụ KG123456.";
    if (!form.issueType) errors.issueType = "Vui lòng chọn loại vấn đề.";
    if (isKeyIssue && !form.platform) errors.platform = "Vui lòng chọn nền tảng kích hoạt.";
    if (form.imageUrl && !/^https?:\/\//.test(form.imageUrl.trim())) errors.imageUrl = "Link ảnh phải bắt đầu bằng http:// hoặc https://";
    if (form.description.trim().length < 20) errors.description = "Mô tả cần ít nhất 20 ký tự.";
    return errors;
}

function SupportRequest() {
    const [form, setForm] = useState<SupportForm>(emptyForm);
    const [errors, setErrors] = useState<Partial<Record<keyof SupportForm, string>>>({});
    const [sending, setSending] = useState(false);
    const [ticketCode, setTicketCode] = useState("");
    const [serverError, setServerError] = useState("");

    const [searchCode, setSearchCode] = useState("");
    const [searchResult, setSearchResult] = useState<SupportTicket | null>(null);
    const [searchMessage, setSearchMessage] = useState("");

    const isKeyIssue = keyIssues.includes(form.issueType);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setTicketCode("");
        setServerError("");
        const newErrors = validate(form, isKeyIssue);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const code = "HT" + Date.now().toString().slice(-6);
        setSending(true);
        fetch(API_URL + "/tickets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                orderCode: form.orderCode.trim().toUpperCase(),
                platform: isKeyIssue ? form.platform : "",
                gameKey: isKeyIssue ? form.gameKey : "",
                code: code,
                status: "Đang chờ xử lý",
                createdAt: new Date().toISOString(),
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error();
                setTicketCode(code);
                setForm(emptyForm);
            })
            .catch(() => setServerError("Gửi không thành công. Hãy kiểm tra json-server đã chạy chưa rồi thử lại."))
            .finally(() => setSending(false));
    };

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        setSearchResult(null);
        setSearchMessage("");
        const code = searchCode.trim().toUpperCase();
        if (!code) return;
        fetch(API_URL + "/tickets?code=" + encodeURIComponent(code))
            .then((res) => res.json())
            .then((list: SupportTicket[]) => {
                if (list.length === 0) setSearchMessage("Không tìm thấy yêu cầu có mã " + code + ".");
                else setSearchResult(list[0]);
            })
            .catch(() => setSearchMessage("Không tra cứu được. Hãy kiểm tra json-server đã chạy chưa."));
    };

    return (
        <div className="support-page py-4">
            <div className="container">
                <h1 className="support-title">Gửi yêu cầu hỗ trợ</h1>
                <p className="support-subtitle">
                    Gặp sự cố với đơn hàng hoặc CD Key? Gửi yêu cầu kèm mã đơn hàng, bộ phận hỗ trợ sẽ kiểm tra và phản hồi trong vòng 24 giờ.
                </p>

                <div className="row g-4">
                    <div className="col-lg-8">
                        <form className="support-box" onSubmit={handleSubmit} noValidate>
                            {ticketCode && (
                                <div className="alert alert-success d-flex gap-2 align-items-start">
                                    <FontAwesomeIcon icon={faCircleCheck} className="mt-1" />
                                    <span>
                                        Đã gửi yêu cầu thành công. Mã yêu cầu của bạn là <strong>{ticketCode}</strong>.
                                        Hãy lưu lại mã này để tra cứu tình trạng xử lý.
                                    </span>
                                </div>
                            )}
                            {serverError && <div className="alert alert-danger">{serverError}</div>}

                            <h2 className="support-box-title">Thông tin đơn hàng</h2>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="fullName">Họ và tên <span className="text-danger">*</span></label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        className={"form-control" + (errors.fullName ? " is-invalid" : "")}
                                        value={form.fullName}
                                        onChange={handleChange}
                                        placeholder="Nguyễn Văn A"
                                    />
                                    <div className="invalid-feedback">{errors.fullName}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="email">Email nhận phản hồi <span className="text-danger">*</span></label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={"form-control" + (errors.email ? " is-invalid" : "")}
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="email@gmail.com"
                                    />
                                    <div className="invalid-feedback">{errors.email}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="orderCode">Mã đơn hàng <span className="text-danger">*</span></label>
                                    <input
                                        id="orderCode"
                                        name="orderCode"
                                        className={"form-control" + (errors.orderCode ? " is-invalid" : "")}
                                        value={form.orderCode}
                                        onChange={handleChange}
                                        placeholder="KG123456"
                                    />
                                    <div className="invalid-feedback">{errors.orderCode}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="issueType">Loại vấn đề <span className="text-danger">*</span></label>
                                    <select
                                        id="issueType"
                                        name="issueType"
                                        className={"form-select" + (errors.issueType ? " is-invalid" : "")}
                                        value={form.issueType}
                                        onChange={handleChange}
                                    >
                                        <option value="">-- Chọn loại vấn đề --</option>
                                        {issueTypes.map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">{errors.issueType}</div>
                                </div>
                            </div>

                            {isKeyIssue && (
                                <>
                                    <h2 className="support-box-title mt-4">Thông tin CD Key</h2>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="platform">Nền tảng kích hoạt <span className="text-danger">*</span></label>
                                            <select
                                                id="platform"
                                                name="platform"
                                                className={"form-select" + (errors.platform ? " is-invalid" : "")}
                                                value={form.platform}
                                                onChange={handleChange}
                                            >
                                                <option value="">-- Chọn nền tảng --</option>
                                                {platforms.map((item) => (
                                                    <option key={item} value={item}>{item}</option>
                                                ))}
                                            </select>
                                            <div className="invalid-feedback">{errors.platform}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="gameKey">Mã key gặp lỗi</label>
                                            <input
                                                id="gameKey"
                                                name="gameKey"
                                                className="form-control"
                                                value={form.gameKey}
                                                onChange={handleChange}
                                                placeholder="XXXXX-XXXXX-XXXXX"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <h2 className="support-box-title mt-4">Mô tả sự cố</h2>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="imageUrl">Link ảnh chụp lỗi</label>
                                    <input
                                        id="imageUrl"
                                        name="imageUrl"
                                        className={"form-control" + (errors.imageUrl ? " is-invalid" : "")}
                                        value={form.imageUrl}
                                        onChange={handleChange}
                                        placeholder="https://res.cloudinary.com/..."
                                    />
                                    <div className="invalid-feedback">{errors.imageUrl}</div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="description">Nội dung <span className="text-danger">*</span></label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={5}
                                        maxLength={1000}
                                        className={"form-control" + (errors.description ? " is-invalid" : "")}
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="Mô tả chi tiết lỗi bạn gặp phải, thời điểm mua và các bước đã thử..."
                                    />
                                    <div className="invalid-feedback">{errors.description}</div>
                                    <div className="support-counter">{form.description.length}/1000</div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-danger support-submit mt-3" disabled={sending}>
                                <FontAwesomeIcon icon={faPaperPlane} /> {sending ? "Đang gửi..." : "Gửi yêu cầu"}
                            </button>
                        </form>
                    </div>

                    <div className="col-lg-4 d-flex flex-column gap-4">
                        <form className="support-box" onSubmit={handleSearch}>
                            <h2 className="support-box-title">Tra cứu yêu cầu</h2>
                            <div className="d-flex gap-2">
                                <input
                                    className="form-control"
                                    value={searchCode}
                                    onChange={(e) => setSearchCode(e.target.value)}
                                    placeholder="Nhập mã yêu cầu, ví dụ HT123456"
                                />
                                <button type="submit" className="btn btn-outline-light">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                            {searchMessage && <p className="support-search-message">{searchMessage}</p>}
                            {searchResult && (
                                <div className="support-result">
                                    <p><span>Mã yêu cầu</span><strong>{searchResult.code}</strong></p>
                                    <p><span>Đơn hàng</span><strong>{searchResult.orderCode}</strong></p>
                                    <p><span>Vấn đề</span><strong>{searchResult.issueType}</strong></p>
                                    <p><span>Ngày gửi</span><strong>{new Date(searchResult.createdAt).toLocaleDateString("vi-VN")}</strong></p>
                                    <p><span>Trạng thái</span><strong className="support-status">{searchResult.status}</strong></p>
                                </div>
                            )}
                        </form>

                        <div className="support-box">
                            <h2 className="support-box-title">Quy trình xử lý</h2>
                            <ol className="support-steps">
                                <li>Gửi yêu cầu kèm mã đơn hàng và ảnh chụp lỗi.</li>
                                <li>Bộ phận hỗ trợ kiểm tra trong vòng 24 giờ.</li>
                                <li>Đổi key mới hoặc hoàn tiền nếu key bị lỗi.</li>
                                <li>Kết quả được gửi qua email của bạn.</li>
                            </ol>
                        </div>

                        <div className="support-box">
                            <h2 className="support-box-title">Có thể bạn cần</h2>
                            <Link to="/huong-dan" className="support-link">
                                <FontAwesomeIcon icon={faKey} /> Hướng dẫn kích hoạt key
                            </Link>
                            <Link to="/chinh-sach-doi-tra" className="support-link">
                                <FontAwesomeIcon icon={faRotateLeft} /> Chính sách đổi trả và hoàn tiền
                            </Link>
                            <Link to="/cau-hoi-thuong-gap" className="support-link">
                                <FontAwesomeIcon icon={faCircleQuestion} /> Câu hỏi thường gặp
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SupportRequest;
