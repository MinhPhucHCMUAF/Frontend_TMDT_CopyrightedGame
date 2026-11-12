import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faEnvelope,
    faLocationDot,
    faClock,
    faPaperPlane,
    faCircleCheck,
    faCircleQuestion,
    faKey,
    faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import type { ContactForm } from "../../data/contactData.ts";
import { contactTopics } from "../../data/contactData.ts";
import { API_URL } from "../../api/api.ts";
import "./contactstyle.css";

const emptyForm: ContactForm = {
    fullName: "",
    email: "",
    phone: "",
    topic: "",
    orderCode: "",
    message: "",
};

function validate(form: ContactForm) {
    const errors: Partial<Record<keyof ContactForm, string>> = {};
    if (form.fullName.trim().length < 2) errors.fullName = "Vui lòng nhập họ tên.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Email không hợp lệ.";
    if (form.phone && !/^0\d{9}$/.test(form.phone.trim())) errors.phone = "Số điện thoại gồm 10 số, bắt đầu bằng 0.";
    if (!form.topic) errors.topic = "Vui lòng chọn chủ đề.";
    if (form.message.trim().length < 20) errors.message = "Nội dung cần ít nhất 20 ký tự.";
    return errors;
}

function Contact() {
    const [form, setForm] = useState<ContactForm>(emptyForm);
    const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState("");
    const [serverError, setServerError] = useState("");

    const needOrderCode = form.topic === "Đơn hàng" || form.topic === "Kích hoạt key";

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSuccess("");
        setServerError("");
        const newErrors = validate(form);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setSending(true);
        fetch(API_URL + "/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                orderCode: needOrderCode ? form.orderCode : "",
                status: "Mới",
                createdAt: new Date().toISOString(),
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error();
                setSuccess("Cảm ơn " + form.fullName.trim() + "! Chúng tôi đã nhận được tin nhắn và sẽ phản hồi qua email trong vòng 24 giờ.");
                setForm(emptyForm);
            })
            .catch(() => setServerError("Gửi không thành công. Hãy kiểm tra json-server đã chạy chưa rồi thử lại."))
            .finally(() => setSending(false));
    };

    return (
        <div className="contact-page py-4">
            <div className="container">
                <h1 className="contact-title">Liên hệ với KHO GAME</h1>
                <p className="contact-subtitle">
                    Bạn cần hỗ trợ về đơn hàng, key game hay muốn hợp tác? Gửi tin nhắn cho chúng tôi, đội ngũ hỗ trợ phản hồi trong vòng 24 giờ.
                </p>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-4">
                    <div className="col">
                        <div className="contact-channel">
                            <FontAwesomeIcon icon={faPhone} className="contact-channel-icon" />
                            <h3>Hotline</h3>
                            <p className="contact-channel-main">1900 6868</p>
                            <p>8:00 – 22:00 mỗi ngày</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="contact-channel">
                            <FontAwesomeIcon icon={faEnvelope} className="contact-channel-icon" />
                            <h3>Email</h3>
                            <p className="contact-channel-main">hotro@khogame.vn</p>
                            <p>Phản hồi trong 24 giờ</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="contact-channel">
                            <FontAwesomeIcon icon={faFacebookMessenger} className="contact-channel-icon" />
                            <h3>Chat trực tuyến</h3>
                            <p className="contact-channel-main">Messenger / Zalo</p>
                            <p>Trả lời nhanh trong giờ hành chính</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="contact-channel">
                            <FontAwesomeIcon icon={faLocationDot} className="contact-channel-icon" />
                            <h3>Địa chỉ</h3>
                            <p className="contact-channel-main">Trường ĐH Nông Lâm TP.HCM</p>
                            <p>Khu phố 9, Linh Xuân, TP. Hồ Chí Minh</p>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-lg-7">
                        <form className="contact-form" onSubmit={handleSubmit} noValidate>
                            <h2 className="contact-form-title">Gửi tin nhắn cho chúng tôi</h2>

                            {success && (
                                <div className="alert alert-success d-flex gap-2 align-items-start">
                                    <FontAwesomeIcon icon={faCircleCheck} className="mt-1" />
                                    <span>{success}</span>
                                </div>
                            )}
                            {serverError && <div className="alert alert-danger">{serverError}</div>}

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
                                    <label className="form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
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
                                    <label className="form-label" htmlFor="phone">Số điện thoại</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        inputMode="numeric"
                                        className={"form-control" + (errors.phone ? " is-invalid" : "")}
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="0912345678"
                                    />
                                    <div className="invalid-feedback">{errors.phone}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="topic">Chủ đề <span className="text-danger">*</span></label>
                                    <select
                                        id="topic"
                                        name="topic"
                                        className={"form-select" + (errors.topic ? " is-invalid" : "")}
                                        value={form.topic}
                                        onChange={handleChange}
                                    >
                                        <option value="">-- Chọn chủ đề --</option>
                                        {contactTopics.map((topic) => (
                                            <option key={topic} value={topic}>{topic}</option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">{errors.topic}</div>
                                </div>
                                {needOrderCode && (
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="orderCode">Mã đơn hàng</label>
                                        <input
                                            id="orderCode"
                                            name="orderCode"
                                            className="form-control"
                                            value={form.orderCode}
                                            onChange={handleChange}
                                            placeholder="Ví dụ: KG123456"
                                        />
                                    </div>
                                )}
                                <div className="col-12">
                                    <label className="form-label" htmlFor="message">Nội dung <span className="text-danger">*</span></label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        maxLength={1000}
                                        className={"form-control" + (errors.message ? " is-invalid" : "")}
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Mô tả vấn đề bạn gặp phải..."
                                    />
                                    <div className="invalid-feedback">{errors.message}</div>
                                    <div className="contact-counter">{form.message.length}/1000</div>
                                </div>
                            </div>

                            <p className="contact-privacy">
                                Thông tin của bạn chỉ dùng để phản hồi yêu cầu và không chia sẻ cho bên thứ ba.
                            </p>
                            <button type="submit" className="btn btn-danger contact-submit" disabled={sending}>
                                <FontAwesomeIcon icon={faPaperPlane} /> {sending ? "Đang gửi..." : "Gửi tin nhắn"}
                            </button>
                        </form>
                    </div>

                    <div className="col-lg-5 d-flex flex-column gap-4">
                        <div className="contact-box">
                            <h2 className="contact-box-title">Có thể bạn cần</h2>
                            <Link to="/tin-tuc/3" className="contact-quick">
                                <FontAwesomeIcon icon={faKey} /> Hướng dẫn kích hoạt key game
                            </Link>
                            <Link to="/tin-tuc/8" className="contact-quick">
                                <FontAwesomeIcon icon={faRotateLeft} /> Cách nhận hoàn tiền khi key lỗi
                            </Link>
                            <Link to="#" className="contact-quick">
                                <FontAwesomeIcon icon={faCircleQuestion} /> Câu hỏi thường gặp
                            </Link>
                        </div>
                        <div className="contact-box">
                            <h2 className="contact-box-title">
                                <FontAwesomeIcon icon={faClock} /> Giờ làm việc
                            </h2>
                            <p className="mb-1">Thứ 2 – Thứ 6: 8:00 – 22:00</p>
                            <p className="mb-0">Thứ 7, Chủ nhật: 9:00 – 21:00</p>
                        </div>
                        <iframe
                            title="Bản đồ KHO GAME"
                            className="contact-map"
                            src="https://www.google.com/maps?q=Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+N%C3%B4ng+L%C3%A2m+TP.HCM&output=embed"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contact;
