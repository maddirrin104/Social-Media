<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class MessageController extends Controller
{
    /**
     * Lấy danh sách tin nhắn của một cuộc trò chuyện.
     *
     * @param  int  $conversationId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($conversationId)
    {
        $user = Auth::user();
        
        // Kiểm tra quyền truy cập
        $conversation = Conversation::whereHas('participants', function (Builder $query) use ($user) {
            $query->where('users.id', $user->id)
                  ->whereNull('conversation_participants.left_at');
        })->findOrFail($conversationId);
        
        $messages = $conversation->messages()
            ->with('sender:id,full_name', 'sender.profile:user_id,profile_picture')
            ->orderBy('created_at', 'asc')
            ->get();
        
        // Đánh dấu tất cả tin nhắn là đã đọc
        $conversation->messages()
            ->where('sender_id', '!=', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);
        
        return response()->json($messages);
    }

    /**
     * Lưu một tin nhắn mới.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $conversationId
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, $conversationId)
    {
        $request->validate([
            'content' => 'required_without:media|string',
            'media' => 'nullable|file|max:10240', // Tối đa 10MB
        ]);
        
        $user = Auth::user();
        
        // Kiểm tra quyền truy cập
        $conversation = Conversation::whereHas('participants', function (Builder $query) use ($user) {
            $query->where('users.id', $user->id)
                  ->whereNull('conversation_participants.left_at');
        })->findOrFail($conversationId);
        
        // Xử lý file đính kèm nếu có
        $mediaUrl = null;
        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $path = $file->store('chat_media', 'public');
            $mediaUrl = Storage::url($path);
        }
        
        // Tạo tin nhắn mới
        $message = new Message([
            'conversation_id' => $conversationId,
            'sender_id' => $user->id,
            'content' => $request->content ?? '',
            'media_url' => $mediaUrl,
            'is_read' => false,
            'created_at' => now(),
        ]);
        
        $message->save();
        
        // Eager load các quan hệ
        $message->load('sender:id,full_name', 'sender.profile:user_id,profile_picture');
        
        // Phát sóng sự kiện
        broadcast(new NewMessage($message))->toOthers();
        
        // Cập nhật thời gian cập nhật cho cuộc trò chuyện
        $conversation->touch();
        
        return response()->json($message, 201);
    }

    /**
     * Đánh dấu tin nhắn là đã đọc.
     *
     * @param  int  $messageId
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsRead($messageId)
    {
        $user = Auth::user();
        
        // Kiểm tra quyền truy cập
        $message = Message::whereHas('conversation.participants', function (Builder $query) use ($user) {
            $query->where('users.id', $user->id)
                  ->whereNull('conversation_participants.left_at');
        })->findOrFail($messageId);
        
        // Chỉ cập nhật nếu người dùng không phải là người gửi
        if ($message->sender_id !== $user->id) {
            $message->update(['is_read' => true]);
        }
        
        return response()->json(['message' => 'Đã đánh dấu tin nhắn là đã đọc']);
    }

    /**
     * Đánh dấu tất cả tin nhắn trong cuộc trò chuyện là đã đọc.
     *
     * @param  int  $conversationId
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAllAsRead($conversationId)
    {
        $user = Auth::user();
        
        // Kiểm tra quyền truy cập
        $conversation = Conversation::whereHas('participants', function (Builder $query) use ($user) {
            $query->where('users.id', $user->id)
                  ->whereNull('conversation_participants.left_at');
        })->findOrFail($conversationId);
        
        // Đánh dấu tất cả tin nhắn chưa đọc từ người khác là đã đọc
        $conversation->messages()
            ->where('sender_id', '!=', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);
        
        return response()->json(['message' => 'Đã đánh dấu tất cả tin nhắn là đã đọc']);
    }

    /**
     * Xóa tin nhắn (chỉ có thể xóa tin nhắn của chính mình).
     *
     * @param  int  $messageId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($messageId)
    {
        $user = Auth::user();
        
        // Tìm tin nhắn và kiểm tra quyền truy cập
        $message = Message::whereHas('conversation.participants', function (Builder $query) use ($user) {
            $query->where('users.id', $user->id)
                  ->whereNull('conversation_participants.left_at');
        })->where('sender_id', $user->id) // Chỉ cho phép xóa tin nhắn của chính mình
        ->findOrFail($messageId);
        
        // Xóa file đính kèm nếu có
        if ($message->media_url) {
            $path = str_replace('/storage/', '', $message->media_url);
            Storage::disk('public')->delete($path);
        }
        
        $message->delete();
        
        return response()->json(['message' => 'Đã xóa tin nhắn thành công']);
    }
}