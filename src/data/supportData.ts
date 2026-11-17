export type SupportForm = {
    fullName: string;
    email: string;
    orderCode: string;
    issueType: string;
    platform: string;
    gameKey: string;
    imageUrl: string;
    description: string;
};

export type SupportTicket = SupportForm & {
    id: string;
    code: string;
    status: string;
    createdAt: string;
};

export const issueTypes: string[] = [
    "Key báo đã được sử dụng",
    "Key không hợp lệ",
    "Sai khu vực kích hoạt",
    "Chưa nhận được key",
    "Giao sai game",
    "Lỗi thanh toán",
    "Khác",
];

export const keyIssues: string[] = [
    "Key báo đã được sử dụng",
    "Key không hợp lệ",
    "Sai khu vực kích hoạt",
    "Giao sai game",
];

export const platforms: string[] = ["Steam", "GOG", "Epic Games", "Xbox", "PlayStation", "Khác"];
