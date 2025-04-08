export const posts = [
    {
      id: 1,
      userId: 101,
      content: "Đá cho vui mà lỡ vô địch rồi anh em ☀️",
      image: "/public/assets/post/1.jpg",
      likes: 10,
      comments: 3,
      createdAt: new Date("2024-03-20T10:30:00").getTime(),
      likedBy: [],
      commentList: [
        {
          id: 1,
          userId: 102,
          content: "Đúng rồi!",
        },
      ],
    },
    {
      id: 2,
      userId: 102,
      content: "đã đến lúc mùa hè nhường cho mùa xuân 🌼🧏🏻‍♀️",
      image: "/public/assets/post/2.jpg",
      likes: 5,
      comments: 1,
      createdAt: new Date("2024-03-20T09:15:00").getTime(),
      likedBy: [],
      commentList: [
        {
          id: 2,
          userId: 101,
          content: "Cảm ơn bạn!",
        },
      ],
    },
    {
      id: 3,
      userId: 103,
      content: "Đêm noel con ước là..",
      image: "/public/assets/post/3.jpg",
      likes: 8,
      comments: 2,
      createdAt: new Date("2024-03-19T15:45:00").getTime(),
      likedBy: [],
      commentList: [],
    },
    {
        id: 4,
        userId: 104,
        content: "cảm ơn Đình Khang đã quá trời hỗ trợ t nộp bài 🫶",
        image: "/public/assets/post/4.jpg",
        likes: 13,
        comments: 4,
        createdAt: new Date("2025-03-28T15:10:00").getTime(),
        likedBy: [],
        commentList: [],
      },
  ];
  