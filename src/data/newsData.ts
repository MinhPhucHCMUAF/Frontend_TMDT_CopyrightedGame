export type News = {
    id: number;
    title: string;
    summary: string;
    category: string;
    image: string;
    date: string;
    views: number;
};

export const newsCategories: string[] = [
    "Tất cả",
    "Tin game",
    "Khuyến mãi",
    "Đánh giá",
    "Hướng dẫn",
];

const IMG = "https://images.gog-statics.com/";

export const newsList: News[] = [
    {
        id: 1,
        title: "Cyberpunk 2077 giảm 50% trong đợt siêu sale tháng 11",
        summary: "Bản Ultimate kèm Phantom Liberty có giá tốt nhất năm, áp dụng đến hết 30/11.",
        category: "Khuyến mãi",
        image: IMG + "1b6963d25e96ca334bd3a2f85cb2899c252403b63d84e65835427d4df4ddb86a_ggvgl_2x.jpg",
        date: "2026-11-06",
        views: 5320,
    },
    {
        id: 2,
        title: "Đánh giá Clair Obscur: Expedition 33 – nhập vai theo lượt đáng chơi nhất",
        summary: "Hệ thống chiến đấu kết hợp phản xạ, cốt truyện cảm xúc và âm nhạc ấn tượng.",
        category: "Đánh giá",
        image: IMG + "b6f1a88d2ea8cb900d67390c96023afb6bb8e96d6383dd39c405e6918cd83d9b_ggvgl_2x.jpg",
        date: "2026-11-04",
        views: 8740,
    },
    {
        id: 3,
        title: "Hướng dẫn kích hoạt key GOG trong 3 bước",
        summary: "Đăng nhập GOG Galaxy, nhập mã và tải game về máy chỉ trong vài phút.",
        category: "Hướng dẫn",
        image: IMG + "18c6036abe2e41d0e5042ad3959213ec412d3423b52dc22b21e16aca04394024_ggvgl_2x.jpg",
        date: "2026-11-02",
        views: 12450,
    },
    {
        id: 4,
        title: "Baldur's Gate 3 cập nhật bản vá mới, sửa lỗi lưu game",
        summary: "Bản vá cải thiện hiệu năng ở màn 3 và bổ sung nhiều tùy chọn giao diện.",
        category: "Tin game",
        image: IMG + "48327bab9f9d3b910cb476a59f9123fdb523fafe408cf3f72059073bf3360619_ggvgl_2x.jpg",
        date: "2026-10-30",
        views: 3980,
    },
    {
        id: 5,
        title: "Kingdom Come: Deliverance II – thế giới mở trung cổ chân thực",
        summary: "Bohemia thế kỷ 15 hiện lên sống động với hệ thống nhập vai sâu.",
        category: "Đánh giá",
        image: IMG + "17d4b63ea7e56638f6f642e1c6ee5fd9d16baab402fab30fab7e0269890cfd78_ggvgl_2x.jpg",
        date: "2026-10-27",
        views: 6210,
    },
    {
        id: 6,
        title: "Tuần lễ CD PROJEKT RED: The Witcher 3 chỉ còn 180.000đ",
        summary: "Bộ sưu tập The Witcher giảm đến 80%, số lượng key có hạn.",
        category: "Khuyến mãi",
        image: IMG + "cace52b541391f95311bb24c2cb029f540fde9bef5172424ca67c28dcc7da9ce_ggvgl_2x.jpg",
        date: "2026-10-25",
        views: 4570,
    },
    {
        id: 7,
        title: "Hollow Knight: Silksong vượt mốc triệu người chơi",
        summary: "Phần tiếp theo được chờ đợi nhất của dòng game metroidvania tiếp tục gây sốt.",
        category: "Tin game",
        image: IMG + "1737cec646ad2fab614da7fedb2648ba52f714eb487d0af7d49ea75517345c2d_ggvgl_2x.jpg",
        date: "2026-10-21",
        views: 9930,
    },
    {
        id: 8,
        title: "Cách nhận hoàn tiền khi key game bị lỗi",
        summary: "Gửi yêu cầu hỗ trợ trong 7 ngày kèm ảnh chụp lỗi để được đổi key hoặc hoàn tiền.",
        category: "Hướng dẫn",
        image: IMG + "c2b5fafe3295f9c8a34f1df45446236fbeeaea2336846629cd8e194d4b69691a_ggvgl_2x.jpg",
        date: "2026-10-18",
        views: 2840,
    },
    {
        id: 9,
        title: "Frostpunk 2 và mùa game chiến lược giảm đến 60%",
        summary: "Hơn 300 tựa game chiến lược đang giảm giá sâu trong tháng này.",
        category: "Khuyến mãi",
        image: IMG + "e3e7cc2207175bfde3d4198f2c82a32c30b20760a54c60d7dfd87fd6e857710f_ggvgl_2x.jpg",
        date: "2026-10-15",
        views: 3150,
    },
];