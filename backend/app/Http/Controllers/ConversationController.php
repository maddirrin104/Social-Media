<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;

class ConversationController extends Controller
{
    /**
     * Lấy danh sách các cuộc trò chuyện cá nhân của người dùng hiện tại.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        
        $conversations = $user->conversations()
            ->where('is_group', false)
            ->whereNull('conversation_participants.left_at')
            ->with(['latestMessage', 'participants' => function($query) use ($user) {
                $query->whereNot('users.id', $user->id)
                      ->whereNull('conversation_participants.left_at')
                      ->with('profile:user_id,profile_picture');
            }])
            ->withCount(['messages'])
            ->get()
            ->map(function ($conversation) use ($user) {
                // Tính số tin nhắn chưa đọc
                $unreadCount = DB::table('messages')
                    ->where('conversation_id', $conversation->id)
                    ->where('sender_id', '!=', $user->id)
                    ->where('is_read', false)
                    ->count();
                
                // Lấy thông tin người dùng khác trong cuộc trò chuyện
                $otherUser = $conversation->participants->first();
                $conversationName = $otherUser ? $otherUser->full_name : 'Người dùng';
                
                return [
                    'id' => $conversation->id,
                    'name' => $conversationName,
                    'created_at' => $conversation->created_at,
                    'updated_at' => $conversation->updated_at,
                    'latest_message' => $conversation->latestMessage,
                    'other_user' => $otherUser,
                    'messages_count' => $conversation->messages_count,
                    'unread_count' => $unreadCount,
                ];
            })
            ->sortByDesc(function ($conversation) {
                // Sắp xếp theo tin nhắn mới nhất
                return $conversation['latest_message'] ? $conversation['latest_message']->created_at : $conversation['created_at'];
            })
            ->values();
        
        return response()->json($conversations);
    }

    /**
     * Tạo một cuộc trò chuyện cá nhân mới.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);
        
        $userId = Auth::id();
        $otherUserId = $request->user_id;
        
        // Kiểm tra không được tạo chat với chính mình
        if ($userId == $otherUserId) {
            return response()->json(['message' => 'Không thể tạo cuộc trò chuyện với chính mình'], 400);
        }
        
        DB::beginTransaction();
        
        try {
            // Kiểm tra xem đã có cuộc trò chuyện giữa 2 người chưa
            $existingConversation = Conversation::whereHas('participants', function (Builder $query) use ($userId) {
                $query->where('users.id', $userId)
                      ->whereNull('conversation_participants.left_at');
            })->whereHas('participants', function (Builder $query) use ($otherUserId) {
                $query->where('users.id', $otherUserId)
                      ->whereNull('conversation_participants.left_at');
            })->where('is_group', false)
            ->whereDoesntHave('participants', function (Builder $query) use ($userId, $otherUserId) {
                $query->whereNotIn('users.id', [$userId, $otherUserId])
                      ->whereNull('conversation_participants.left_at');
            })
            ->first();
            
            if ($existingConversation) {
                DB::commit();
                return response()->json($this->getConversationDetails($existingConversation->id));
            }
            
            // Tạo cuộc trò chuyện mới
            $conversation = Conversation::create([
                'name' => null,
                'is_group' => false,
            ]);
            
            // Thêm người tham gia
            $now = now();
            $conversation->participants()->attach([$userId, $otherUserId], [
                'joined_at' => $now,
            ]);
            
            DB::commit();
            
            return response()->json($this->getConversationDetails($conversation->id), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Đã có lỗi xảy ra: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Hiển thị chi tiết một cuộc trò chuyện.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return response()->json($this->getConversationDetails($id));
    }
    
    /**
     * Lấy chi tiết một cuộc trò chuyện, bao gồm tin nhắn và người tham gia.
     *
     * @param  int  $id
     * @return array
     */
    private function getConversationDetails($id)
    {
        $user = Auth::user();
        
        // Kiểm tra quyền truy cập
        $conversation = Conversation::whereHas('participants', function (Builder $query) use ($user) {
            $query->where('users.id', $user->id)
                  ->whereNull('conversation_participants.left_at');
        })->with([
            'participants' => function ($query) use ($user) {
                $query->whereNull('conversation_participants.left_at')
                      ->with('profile:user_id,profile_picture');
            },
            'messages' => function ($query) {
                $query->orderBy('created_at', 'asc')
                      ->with('sender:id,full_name', 'sender.profile:user_id,profile_picture');
            }
        ])->findOrFail($id);
        
        // Đánh dấu tất cả tin nhắn chưa đọc là đã đọc
        DB::table('messages')
            ->where('conversation_id', $id)
            ->where('sender_id', '!=', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);
        
        // Lấy thông tin người dùng khác
        $otherUser = $conversation->participants->where('id', '!=', $user->id)->first();
        $conversationName = $otherUser ? $otherUser->full_name : 'Người dùng';
        
        return [
            'id' => $conversation->id,
            'name' => $conversationName,
            'created_at' => $conversation->created_at,
            'updated_at' => $conversation->updated_at,
            'other_user' => $otherUser,
            'messages' => $conversation->messages,
        ];
    }
}