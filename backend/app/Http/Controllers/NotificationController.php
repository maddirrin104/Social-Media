<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Lấy tất cả thông báo của người dùng.
     *
     * @param int $userId
     * @return \Illuminate\Http\Response
     */
    public function getNotifications($userId)
    {
        // Kiểm tra xem người dùng có tồn tại không
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Lấy thông báo chưa đọc và chưa bị xóa
        $notifications = Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notifications);
    }

    /**
     * Đánh dấu thông báo là đã đọc.
     *
     * @param int $notificationId
     * @return \Illuminate\Http\Response
     */
    public function markAsRead($notificationId)
    {
        // Tìm thông báo cần đánh dấu
        $notification = Notification::find($notificationId);
        if (!$notification) {
            return response()->json(['error' => 'Notification not found'], 404);
        }

        // Đánh dấu thông báo là đã đọc
        $notification->is_read = true;
        $notification->save();

        return response()->json(['message' => 'Notification marked as read']);
    }

    /**
     * Xóa thông báo.
     *
     * @param int $notificationId
     * @return \Illuminate\Http\Response
     */
    public function deleteNotification($notificationId)
    {
        // Tìm thông báo cần xóa
        $notification = Notification::find($notificationId);
        if (!$notification) {
            return response()->json(['error' => 'Notification not found'], 404);
        }

        // Xóa thông báo
        $notification->delete();

        return response()->json(['message' => 'Notification deleted']);
    }

    /**
     * Tạo thông báo mới cho người dùng.
     *
     * @param int $userId
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function createNotification($userId, Request $request)
    {
        // Kiểm tra xem người dùng có tồn tại không
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Xác thực dữ liệu request
        $request->validate([
            'type' => 'required|in:Like,Comment,FriendRequest,Tag,Other',
            'related_id' => 'required|integer',
        ]);

        // Tạo thông báo mới
        $notification = new Notification();
        $notification->user_id = $userId;
        $notification->type = $request->type;
        $notification->related_id = $request->related_id;
        $notification->is_read = false; // Mặc định là chưa đọc
        $notification->save();

        return response()->json(['message' => 'Notification created successfully']);
    }

    /**
     * Lấy tất cả thông báo (bao gồm cả đã đọc và chưa đọc).
     *
     * @param int $userId
     * @return \Illuminate\Http\Response
     */
    public function getAllNotifications($userId)
    {
        // Kiểm tra xem người dùng có tồn tại không
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Lấy tất cả thông báo
        $notifications = Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notifications);
    }
}
