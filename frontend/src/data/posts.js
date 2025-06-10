export const posts = [
  {
    id: 1,
    userId: 101,
    content: "Đá cho vui mà lỡ vô địch rồi anh em ☀️",
    image: "/public/assets/post/1.jpg",
    likes: 10,
    comments: 3,
    createdAt: new Date("2025-06-10T10:30:00").getTime(),
    likedBy: [102, 103],
    commentList: [
      {
        id: 1,
        userId: 102,
        content: "Đúng rồi!"
      },
      {
        id: 2,
        userId: 103,
        content: "Chúc mừng anh!"
      },
      {
        id: 3,
        userId: 104,
        content: "Quá đỉnh!"
      }
    ]
  },
  {
    id: 2,
    userId: 102,
    content: "đã đến lúc mùa hè nhường cho mùa xuân 🌼🧏🏻‍♀️",
    image: "/public/assets/post/2.jpg",
    likes: 5,
    comments: 1,
    createdAt: new Date("2025-06-10T14:22:00").getTime(),
    likedBy: [101],
    commentList: [
      {
        id: 4,
        userId: 101,
        content: "Cảm ơn bạn!"
      }
    ]
  },
  {
    id: 3,
    userId: 103,
    content: "Đêm noel con ước là..",
    image: "/public/assets/post/3.jpg",
    likes: 8,
    comments: 2,
    createdAt: new Date("2024-03-19T15:45:00").getTime(),
    likedBy: [101, 102, 104],
    commentList: [
      {
        id: 5,
        userId: 101,
        content: "Ước gì?"
      },
      {
        id: 6,
        userId: 102,
        content: "Kể đi!"
      }
    ]
  },
  {
    id: 4,
    userId: 104,
    content: "cảm ơn Đình Khang đã quá trời hỗ trợ t nộp bài 🫶",
    image: "/public/assets/post/4.jpg",
    likes: 13,
    comments: 4,
    createdAt: new Date("2024-03-28T15:10:00").getTime(),
    likedBy: [101, 102, 103, 105],
    commentList: [
      {
        id: 7,
        userId: 101,
        content: "Không có gì!"
      },
      {
        id: 8,
        userId: 102,
        content: "Bạn tốt quá!"
      },
      {
        id: 9,
        userId: 103,
        content: "Đúng rồi!"
      },
      {
        id: 10,
        userId: 105,
        content: "Cảm ơn bạn!"
      }
    ]
  },
  {
    id: 5,
    userId: 105,
    content: "Một ngày tuyệt vời bên bạn bè!",
    image: "/public/assets/post/5.jpg",
    likes: 7,
    comments: 2,
    createdAt: new Date("2024-03-29T10:00:00").getTime(),
    likedBy: [101, 102],
    commentList: [
      { id: 11, userId: 101, content: "Ảnh đẹp quá!" },
      { id: 12, userId: 104, content: "Chill ghê!" }
    ]
  },
  {
    id: 6,
    userId: 104,
    content: "Cuối tuần thư giãn cùng sách và cà phê.",
    image: "/public/assets/post/6.jpg",
    likes: 12,
    comments: 3,
    createdAt: new Date("2024-03-29T14:30:00").getTime(),
    likedBy: [102, 103, 105],
    commentList: [
      { id: 13, userId: 102, content: "Quán này ở đâu vậy?" },
      { id: 14, userId: 105, content: "Cho mình đi với!" },
      { id: 15, userId: 101, content: "Nhìn chill thật!" }
    ]
  },
  {
    id: 7,
    userId: 103,
    content: "Hôm nay trời đẹp, đi dạo thôi!",
    image: "/public/assets/post/7.jpg",
    likes: 9,
    comments: 1,
    createdAt: new Date("2024-03-30T08:20:00").getTime(),
    likedBy: [101, 104],
    commentList: [
      { id: 16, userId: 104, content: "Đi cùng không?" }
    ]
  },
  {
    id: 8,
    userId: 102,
    content: "Mỗi ngày là một trải nghiệm mới.",
    image: "/public/assets/post/8.jpg",
    likes: 6,
    comments: 2,
    createdAt: new Date("2024-03-30T12:10:00").getTime(),
    likedBy: [103, 105],
    commentList: [
      { id: 17, userId: 105, content: "Chuẩn luôn!" },
      { id: 18, userId: 101, content: "Cố lên nhé!" }
    ]
  },
  {
    id: 9,
    userId: 101,
    content: "Thử thách bản thân với điều mới mẻ.",
    image: "/public/assets/post/9.jpg",
    likes: 11,
    comments: 2,
    createdAt: new Date("2024-03-31T09:00:00").getTime(),
    likedBy: [102, 103, 104],
    commentList: [
      { id: 19, userId: 102, content: "Quá tuyệt!" },
      { id: 20, userId: 103, content: "Chúc mừng!" }
    ]
  },
  {
    id: 10,
    userId: 104,
    content: "Cảnh hoàng hôn hôm nay thật đẹp.",
    image: "/public/assets/post/10.jpg",
    likes: 15,
    comments: 3,
    createdAt: new Date("2024-03-31T18:45:00").getTime(),
    likedBy: [101, 105],
    commentList: [
      { id: 21, userId: 101, content: "Ảnh chill quá!" },
      { id: 22, userId: 105, content: "Đẹp thật!" },
      { id: 23, userId: 102, content: "Muốn đi cùng!" }
    ]
  },
  {
    id: 11,
    userId: 105,
    content: "Ăn uống cùng hội bạn thân.",
    image: "/public/assets/post/11.jpg",
    likes: 8,
    comments: 1,
    createdAt: new Date("2024-04-01T11:30:00").getTime(),
    likedBy: [103],
    commentList: [
      { id: 24, userId: 103, content: "Nhìn ngon quá!" }
    ]
  },
  {
    id: 12,
    userId: 102,
    content: "Một góc nhỏ bình yên giữa thành phố.",
    image: "/public/assets/post/12.jpg",
    likes: 10,
    comments: 2,
    createdAt: new Date("2024-04-01T15:00:00").getTime(),
    likedBy: [101, 104],
    commentList: [
      { id: 25, userId: 104, content: "Đẹp quá!" },
      { id: 26, userId: 101, content: "Muốn tới đây!" }
    ]
  },
  {
    id: 13,
    userId: 103,
    content: "Chỉ cần một tách cà phê và một cuốn sách.",
    image: "/public/assets/post/13.jpg",
    likes: 5,
    comments: 1,
    createdAt: new Date("2024-04-02T09:40:00").getTime(),
    likedBy: [105],
    commentList: [
      { id: 27, userId: 105, content: "Sống chậm lại!" }
    ]
  },
  {
    id: 14,
    userId: 101,
    content: "Thành quả sau một ngày làm việc chăm chỉ.",
    image: "/public/assets/post/14.jpg",
    likes: 13,
    comments: 2,
    createdAt: new Date("2024-04-02T20:10:00").getTime(),
    likedBy: [102, 105],
    commentList: [
      { id: 28, userId: 102, content: "Tuyệt vời!" },
      { id: 29, userId: 105, content: "Cố lên!" }
    ]
  },
  {
    id: 15,
    userId: 104,
    content: "Chuyến đi đáng nhớ cùng bạn bè.",
    image: "/public/assets/post/15.jpg",
    likes: 16,
    comments: 3,
    createdAt: new Date("2024-04-03T17:00:00").getTime(),
    likedBy: [101, 102, 103],
    commentList: [
      { id: 30, userId: 101, content: "Nhớ quá!" },
      { id: 31, userId: 102, content: "Bao giờ đi nữa?" },
      { id: 32, userId: 103, content: "Lần sau cho mình đi với!" }
    ]
  }
]; 