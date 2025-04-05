<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    // Gửi tin nhắn
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:Users,user_id',
            'content' => 'nullable|string|max:1000',
            'media_url' => 'nullable|url',
        ]);

        $senderId = Auth::id(); // Lấy ID người gửi (người dùng hiện tại)
        $receiverId = $request->receiver_id;
        $content = $request->content;
        $mediaUrl = $request->media_url;

        // Tạo và lưu tin nhắn mới
        $message = new Message();
        $message->sender_id = $senderId;
        $message->receiver_id = $receiverId;
        $message->content = $content;
        $message->media_url = $mediaUrl;
        $message->save();

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message
        ], 201);
    }

    // Lấy tin nhắn giữa người dùng và bạn bè
    public function getChat($friendId)
    {
        $userId = Auth::id(); // Lấy ID người dùng hiện tại

        // Lấy tất cả các tin nhắn giữa người dùng và bạn bè (theo sender_id và receiver_id)
        $messages = Message::where(function ($query) use ($userId, $friendId) {
            $query->where('sender_id', $userId)
                  ->where('receiver_id', $friendId);
        })
        ->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('sender_id', $friendId)
                  ->where('receiver_id', $userId);
        })
        ->orderBy('created_at', 'asc')
        ->get();

        return response()->json([
            'data' => $messages
        ], 200);
    }

    // Xóa tin nhắn
    public function deleteMessage($messageId)
    {
        $message = Message::find($messageId);

        // Kiểm tra tin nhắn có tồn tại và người dùng có quyền xóa hay không
        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        if ($message->sender_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $message->is_deleted = true;
        $message->save();

        return response()->json([
            'message' => 'Message deleted successfully',
            'data' => $message
        ], 200);
    }
}
