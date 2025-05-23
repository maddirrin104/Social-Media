<?php

use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Kênh cuộc trò chuyện - chỉ cho phép những người tham gia trong cuộc trò chuyện
Broadcast::channel('conversation.{id}', function ($user, $id) {
    // Kiểm tra xem người dùng có quyền truy cập vào cuộc trò chuyện này không
    $conversation = Conversation::find($id);
    
    // Đảm bảo cuộc trò chuyện tồn tại và là cuộc trò chuyện cá nhân
    if (!$conversation || $conversation->is_group) {
        return false;
    }
    
    // Kiểm tra xem người dùng có phải là thành viên của cuộc trò chuyện
    return $user->conversations()
                ->where('conversations.id', $id)
                ->where('conversations.is_group', false)  // Chỉ cho phép cuộc trò chuyện cá nhân
                ->whereNull('conversation_participants.left_at')
                ->exists();
});