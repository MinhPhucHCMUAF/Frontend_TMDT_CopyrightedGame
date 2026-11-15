import { useEffect, useState } from "react";
import { API_URL } from "../api/api";

export function useInfoData<T>(path: string, initialValue: T) {
    const [data, setData] = useState<T>(initialValue);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        fetch(API_URL + path)
            .then((res) => {
                if (!res.ok) throw new Error("Lỗi " + res.status);
                return res.json();
            })
            .then((result: T) => setData(result))
            .catch(() => setError("Không tải được dữ liệu. Hãy kiểm tra json-server đã chạy chưa."))
            .finally(() => setLoading(false));
    }, [path]);

    return { data, loading, error };
}
