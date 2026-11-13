import { useState, type FormEvent } from "react";
import { PasswordField, TextField } from "../common/FormFields.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { setUser } from "../../store/authSlice.ts";
import { changePassword, updateProfile } from "../../services/authService.ts";
import { formatDateTime, getErrorMessage } from "../../utils/format.ts";
import { MIN_PASSWORD, isPhone } from "../../utils/validators.ts";

export default function Profile() {
  return (
    <>
      <ProfileCard />
      <ChangePasswordCard />
    </>
  );
}

function ProfileCard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const [form, setForm] = useState({
    fullName: user?.fullName ?? "",
    phone: user?.phone ?? "",
    dob: user?.dob ?? "",
    address: user?.address ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: "success" | "danger"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const set = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setMessage(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.fullName.trim().length < 2) next.fullName = "Vui lòng nhập họ tên.";
    if (!isPhone(form.phone)) next.phone = "Số điện thoại không hợp lệ.";
    if (form.dob && new Date(form.dob) > new Date()) next.dob = "Ngày sinh không hợp lệ.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const updated = await updateProfile(user.id, {
        fullName: form.fullName.trim(),
        phone: form.phone.replace(/\s/g, ""),
        dob: form.dob,
        address: form.address.trim(),
      });
      dispatch(setUser(updated));
      setMessage({ type: "success", text: "Cập nhật thông tin thành công." });
    } catch (err) {
      setMessage({ type: "danger", text: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <h1 className="h4 fw-bold mb-1">Hồ sơ cá nhân</h1>
        <p className="text-muted small">
          Thành viên từ {formatDateTime(user.createdAt)}
        </p>

        {message && <div className={`alert alert-${message.type} py-2`}>{message.text}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="col-md-6">
              <TextField
                id="pf-name"
                label="Họ và tên"
                value={form.fullName}
                onValue={set("fullName")}
                error={errors.fullName}
              />
            </div>
            <div className="col-md-6">
              <TextField
                id="pf-email"
                label="Email"
                value={user.email}
                readOnly
                disabled
                onValue={() => {}}
                hint="Email dùng để đăng nhập, không thể thay đổi."
              />
            </div>
            <div className="col-md-6">
              <TextField
                id="pf-phone"
                label="Số điện thoại"
                type="tel"
                value={form.phone}
                onValue={set("phone")}
                error={errors.phone}
              />
            </div>
            <div className="col-md-6">
              <TextField
                id="pf-dob"
                label="Ngày sinh"
                type="date"
                value={form.dob}
                onValue={set("dob")}
                error={errors.dob}
              />
            </div>
          </div>
          <TextField
            id="pf-address"
            label="Địa chỉ"
            value={form.address}
            onValue={set("address")}
            placeholder="Số nhà, đường, phường/xã, tỉnh/thành"
          />
          <button className="btn btn-brand px-4" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Đang lưu...
              </>
            ) : (
              "Lưu thay đổi"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function ChangePasswordCard() {
  const user = useAppSelector((s) => s.auth.user);
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: "success" | "danger"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const set = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setMessage(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.current) next.current = "Vui lòng nhập mật khẩu hiện tại.";
    if (form.next.length < MIN_PASSWORD)
      next.next = `Mật khẩu mới tối thiểu ${MIN_PASSWORD} ký tự.`;
    else if (form.next === form.current)
      next.next = "Mật khẩu mới phải khác mật khẩu hiện tại.";
    if (form.confirm !== form.next) next.confirm = "Mật khẩu nhập lại không khớp.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      await changePassword(user.id, form.current, form.next);
      setForm({ current: "", next: "", confirm: "" });
      setMessage({ type: "success", text: "Đổi mật khẩu thành công." });
    } catch (err) {
      setMessage({ type: "danger", text: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="h5 fw-bold mb-3">Đổi mật khẩu</h2>
        {message && <div className={`alert alert-${message.type} py-2`}>{message.text}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="col-md-4">
              <PasswordField
                id="pw-current"
                label="Mật khẩu hiện tại"
                autoComplete="current-password"
                value={form.current}
                onValue={set("current")}
                error={errors.current}
              />
            </div>
            <div className="col-md-4">
              <PasswordField
                id="pw-new"
                label="Mật khẩu mới"
                autoComplete="new-password"
                value={form.next}
                onValue={set("next")}
                error={errors.next}
              />
            </div>
            <div className="col-md-4">
              <PasswordField
                id="pw-confirm"
                label="Nhập lại mật khẩu mới"
                autoComplete="new-password"
                value={form.confirm}
                onValue={set("confirm")}
                error={errors.confirm}
              />
            </div>
          </div>
          <button className="btn btn-outline-dark px-4" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm" /> : "Đổi mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
}
