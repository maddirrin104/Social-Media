<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // Gửi tin nhắn
    public function send(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string'
        ]);
        $sender_id = $request->user()->id;
        $message = Message::create([
            'sender_id' => $sender_id,
            'receiver_id' => $request->receiver_id,
            'content' => $request->content,
            'created_at' => now()->getTimestampMs(),
        ]);
        return response()->json($message, 201);
    }

    // Lấy tin nhắn giữa 2 người
    public function getMessages(Request $request)
    {
        $user_id = $request->user()->id;
        $other_id = $request->query('user_id');

        if (!$other_id || !User::find($other_id)) {
            return response()->json(['error' => 'Invalid user_id'], 400);
        }

        $messages = Message::where(function($q) use ($user_id, $other_id) {
            $q->where('sender_id', $user_id)->where('receiver_id', $other_id);
        })->orWhere(function($q) use ($user_id, $other_id) {
            $q->where('sender_id', $other_id)->where('receiver_id', $user_id);
        })->orderBy('created_at', 'asc')->get();

        return response()->json($messages);
    }

    // Lấy danh sách hội thoại (user đã chat, kèm tin nhắn cuối cùng)
    public function getConversations(Request $request)
    {
        $user_id = $request->user()->id;
        // Lấy id các user đã chat
        $userIds = Message::where('sender_id', $user_id)
            ->orWhere('receiver_id', $user_id)
            ->get()
            ->flatMap(function($m) use ($user_id) {
                return [$m->sender_id, $m->receiver_id];
            })
            ->unique()
            ->reject(fn($id) => $id == $user_id)
            ->values();

        // Lấy tin nhắn cuối cùng giữa user hiện tại và từng user
        $conversations = $userIds->map(function($other_id) use ($user_id) {
            $lastMessage = Message::where(function($q) use ($user_id, $other_id) {
                $q->where('sender_id', $user_id)->where('receiver_id', $other_id);
            })->orWhere(function($q) use ($user_id, $other_id) {
                $q->where('sender_id', $other_id)->where('receiver_id', $user_id);
            })->orderBy('created_at', 'desc')->first();

            $user = User::find($other_id);

            return [
                'user' => $user,
                'last_message' => $lastMessage,
            ];
        });

        return response()->json($conversations);
    }
}
