export const posts = [
  {
    id: 1,
    userId: 1,
    content: "Đá cho vui mà lỡ vô địch rồi anh em ☀️",
    image: "/public/assets/post/1.jpg",
    likes: 10,
    comments: 3,
    createdAt: new Date("2025-06-10T10:30:00").getTime(),
    likedBy: [2, 3],
    commentList: [
      {
        id: 1,
        userId: 2,
        content: "Đúng rồi!"
      },
      {
        id: 2,
        userId: 3,
        content: "Chúc mừng anh!"
      },
      {
        id: 3,
        userId: 4,
        content: "Quá đỉnh!"
      }
    ]
  },
  {
    id: 2,
    userId: 2,
    content: "đã đến lúc mùa hè nhường cho mùa xuân 🌼🧏🏻‍♀️",
    image: "/public/assets/post/2.jpg",
    likes: 5,
    comments: 1,
    createdAt: new Date("2025-06-10T14:22:00").getTime(),
    likedBy: [1],
    commentList: [
      {
        id: 4,
        userId: 1,
        content: "Cảm ơn bạn!"
      }
    ]
  },
  {
    id: 3,
    userId: 3,
    content: "Đêm noel con ước là..",
    image: "/public/assets/post/3.jpg",
    likes: 8,
    comments: 2,
    createdAt: new Date("2024-03-19T15:45:00").getTime(),
    likedBy: [1, 2, 4],
    commentList: [
      {
        id: 5,
        userId: 1,
        content: "Ước gì?"
      },
      {
        id: 6,
        userId: 2,
        content: "Kể đi!"
      }
    ]
  },
  {
    id: 4,
    userId: 4,
    content: "cảm ơn Đình Khang đã quá trời hỗ trợ t nộp bài 🫶",
    image: "/public/assets/post/4.jpg",
    likes: 13,
    comments: 4,
    createdAt: new Date("2024-03-28T15:10:00").getTime(),
    likedBy: [1, 2, 3, 5],
    commentList: [
      {
        id: 7,
        userId: 1,
        content: "Không có gì!"
      },
      {
        id: 8,
        userId: 2,
        content: "Bạn tốt quá!"
      },
      {
        id: 9,
        userId: 3,
        content: "Đúng rồi!"
      },
      {
        id: 10,
        userId: 5,
        content: "Cảm ơn bạn!"
      }
    ]
  },
  {
    id: 5,
    userId: 5,
    content: "Một ngày tuyệt vời bên bạn bè!",
    image: "/public/assets/post/5.jpg",
    likes: 7,
    comments: 2,
    createdAt: new Date("2024-03-29T10:00:00").getTime(),
    likedBy: [1, 2],
    commentList: [
      { id: 11, userId: 1, content: "Ảnh đẹp quá!" },
      { id: 12, userId: 4, content: "Chill ghê!" }
    ]
  },
  {
    id: 6,
    userId: 4,
    content: "Cuối tuần thư giãn cùng sách và cà phê.",
    image: "/public/assets/post/6.jpg",
    likes: 12,
    comments: 3,
    createdAt: new Date("2024-03-29T14:30:00").getTime(),
    likedBy: [2, 3, 5],
    commentList: [
      { id: 13, userId: 2, content: "Quán này ở đâu vậy?" },
      { id: 14, userId: 5, content: "Cho mình đi với!" },
      { id: 15, userId: 1, content: "Nhìn chill thật!" }
    ]
  },
  {
    id: 7,
    userId: 3,
    content: "Hôm nay trời đẹp, đi dạo thôi!",
    image: "/public/assets/post/7.jpg",
    likes: 9,
    comments: 1,
    createdAt: new Date("2024-03-30T08:20:00").getTime(),
    likedBy: [1, 4],
    commentList: [
      { id: 16, userId: 4, content: "Đi cùng không?" }
    ]
  },
  {
    id: 8,
    userId: 2,
    content: "Mỗi ngày là một trải nghiệm mới.",
    image: "/public/assets/post/8.jpg",
    likes: 6,
    comments: 2,
    createdAt: new Date("2024-03-30T12:10:00").getTime(),
    likedBy: [3, 5],
    commentList: [
      { id: 17, userId: 5, content: "Chuẩn luôn!" },
      { id: 18, userId: 1, content: "Cố lên nhé!" }
    ]
  },
  {
    id: 9,
    userId: 1,
    content: "Thử thách bản thân với điều mới mẻ.",
    image: "/public/assets/post/9.jpg",
    likes: 11,
    comments: 2,
    createdAt: new Date("2024-03-31T09:00:00").getTime(),
    likedBy: [2, 3, 4],
    commentList: [
      { id: 19, userId: 2, content: "Quá tuyệt!" },
      { id: 20, userId: 3, content: "Chúc mừng!" }
    ]
  },
  {
    id: 10,
    userId: 4,
    content: "Cảnh hoàng hôn hôm nay thật đẹp.",
    image: "/public/assets/post/10.jpg",
    likes: 15,
    comments: 3,
    createdAt: new Date("2024-03-31T18:45:00").getTime(),
    likedBy: [1, 5],
    commentList: [
      { id: 21, userId: 1, content: "Ảnh chill quá!" },
      { id: 22, userId: 5, content: "Đẹp thật!" },
      { id: 23, userId: 2, content: "Muốn đi cùng!" }
    ]
  },
  {
    id: 11,
    userId: 5,
    content: "Ăn uống cùng hội bạn thân.",
    image: "/public/assets/post/11.jpg",
    likes: 8,
    comments: 1,
    createdAt: new Date("2024-04-01T11:30:00").getTime(),
    likedBy: [3],
    commentList: [
      { id: 24, userId: 3, content: "Nhìn ngon quá!" }
    ]
  },
  {
    id: 12,
    userId: 2,
    content: "Một góc nhỏ bình yên giữa thành phố.",
    image: "/public/assets/post/12.jpg",
    likes: 10,
    comments: 2,
    createdAt: new Date("2024-04-01T15:00:00").getTime(),
    likedBy: [1, 4],
    commentList: [
      { id: 25, userId: 4, content: "Đẹp quá!" },
      { id: 26, userId: 1, content: "Muốn tới đây!" }
    ]
  },
  {
    id: 13,
    userId: 3,
    content: "Chỉ cần một tách cà phê và một cuốn sách.",
    image: "/public/assets/post/13.jpg",
    likes: 5,
    comments: 1,
    createdAt: new Date("2024-04-02T09:40:00").getTime(),
    likedBy: [5],
    commentList: [
      { id: 27, userId: 5, content: "Sống chậm lại!" }
    ]
  },
  {
    id: 14,
    userId: 1,
    content: "Thành quả sau một ngày làm việc chăm chỉ.",
    image: "/public/assets/post/14.jpg",
    likes: 13,
    comments: 2,
    createdAt: new Date("2024-04-02T20:10:00").getTime(),
    likedBy: [2, 5],
    commentList: [
      { id: 28, userId: 2, content: "Tuyệt vời!" },
      { id: 29, userId: 5, content: "Cố lên!" }
    ]
  },
  {
    id: 15,
    userId: 4,
    content: "Chuyến đi đáng nhớ cùng bạn bè.",
    image: "/public/assets/post/15.jpg",
    likes: 16,
    comments: 3,
    createdAt: new Date("2024-04-03T17:00:00").getTime(),
    likedBy: [1, 2, 3],
    commentList: [
      { id: 30, userId: 1, content: "Nhớ quá!" },
      { id: 31, userId: 2, content: "Bao giờ đi nữa?" },
      { id: 32, userId: 3, content: "Lần sau cho mình đi với!" }
    ]
  }
]; 