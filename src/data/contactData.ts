export type ContactForm = {
    fullName: string;
    email: string;
    phone: string;
    topic: string;
    orderCode: string;
    message: string;
};

export const contactTopics: string[] = [
    "Đơn hàng",
    "Kích hoạt key",
    "Thanh toán",
    "Hợp tác kinh doanh",
    "Góp ý",
    "Khác",
];
