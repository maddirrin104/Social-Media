# IS207
Đồ án Phát triển ứng dụng Web

# Hướng dẫn cài đặt và chạy dự án

## Yêu cầu hệ thống

### Backend (Laravel)
- PHP >= 8.1
- Composer
- MySQL/MariaDB
- Node.js và npm (cho Vite)

### Frontend (React)
- Node.js >= 16.x
- npm >= 8.x

## Cài đặt Backend

1. Cài đặt PHP và Composer:
   - Tải và cài đặt PHP từ: https://www.php.net/downloads.php
   - Tải và cài đặt Composer từ: https://getcomposer.org/download/

2. Cài đặt các dependencies:
   ```bash
   cd backend
   composer install
   ```

3. Cấu hình môi trường:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Cấu hình database:
   - Mở file `.env` và cập nhật các thông tin kết nối database:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. Chạy migrations:
   ```bash
   php artisan migrate
   ```

6. Chạy server:
   ```bash
   php artisan serve
   ```

Backend sẽ chạy ở địa chỉ: http://127.0.0.1:8000

## Cài đặt Frontend

1. Cài đặt các dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Cấu hình môi trường:
   - Tạo file `.env` trong thư mục frontend với nội dung:
   ```
   REACT_APP_API_URL=http://127.0.0.1:8000
   ```

3. Chạy development server:
   ```bash
   npm start
   ```

Frontend sẽ chạy ở địa chỉ: http://localhost:3000

## Lưu ý

1. Đảm bảo các port cần thiết không bị chặn:
   - 8000: Backend Laravel
   - 3000: Frontend React
   - 3306: MySQL/MariaDB

2. Nếu gặp lỗi về quyền truy cập thư mục trong backend:
   ```bash
   chmod -R 775 storage bootstrap/cache
   ```

3. Để chạy cả frontend và backend cùng lúc, mở 2 terminal riêng biệt:
   - Terminal 1: `cd backend && php artisan serve`
   - Terminal 2: `cd frontend && npm start`

## Troubleshooting

1. Lỗi kết nối database:
   - Kiểm tra thông tin kết nối trong file `.env`
   - Đảm bảo MySQL service đang chạy
   - Kiểm tra username và password có đúng không

2. Lỗi npm install:
   - Xóa thư mục node_modules và file package-lock.json
   - Chạy lại `npm install`

3. Lỗi composer install:
   - Xóa thư mục vendor và file composer.lock
   - Chạy lại `composer install`

## Liên hệ

Nếu gặp vấn đề trong quá trình cài đặt, vui lòng liên hệ với nhóm phát triển.
