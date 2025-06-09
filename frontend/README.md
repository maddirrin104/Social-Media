# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Chức năng bình luận (Comment)

- **CommentList**: Hiển thị danh sách bình luận cho từng bài viết, hiệu ứng fade-in, style hiện đại.
- **CommentItem**: Hiển thị từng bình luận với avatar, tên, nội dung, thời gian tương đối.
- **CommentForm**: Cho phép nhập và gửi bình luận mới (giả lập, userId=101), tự động cập nhật danh sách bình luận.
- Nhấn nút comment trên PostCard sẽ hiện/ẩn danh sách bình luận.
- Dữ liệu bình luận lấy từ post.commentList (posts.js), không lưu vĩnh viễn, chỉ cập nhật state trong PostCard.
- Giao diện đẹp, màu sắc đồng bộ, hiệu ứng mượt.
