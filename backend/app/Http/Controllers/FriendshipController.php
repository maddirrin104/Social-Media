<?php

namespace App\Http\Controllers;

use App\Models\Friendship;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class FriendshipController extends Controller
{
    // Gửi lời mời kết bạn
    public function sendRequest(Request $request, User $user)
    {
        $me = $request->user();

        // Kiểm tra nếu đã có mối quan hệ
        $exists = DB::table('friendships')->where(function($q) use ($me, $user) {
            $q->where('user1_id', $me->id)->where('user2_id', $user->id);
        })->orWhere(function($q) use ($me, $user) {
            $q->where('user1_id', $user->id)->where('user2_id', $me->id);
        })->exists();

        if ($exists) {
            return response()->json(['message' => 'Đã gửi hoặc đã là bạn.'], 400);
        }

        DB::table('friendships')->insert([
            'user1_id' => $me->id,
            'user2_id' => $user->id,
            'status' => 'pending',
            'created_at' => now()->timestamp * 1000,
        ]);
        // Thêm notification cho user
        DB::table('notifications')->insert([
            'sender_id' => $me->id,
            'receiver_id' => $user->id,
            'type' => 'friend_request',
            'title' => $me->name . ' đã gửi lời mời kết bạn.',
            'created_at' => now(),
            'is_read' => false,
        ]);
        return response()->json(['message' => 'Đã gửi lời mời kết bạn.']);
    }

    // Huỷ lời mời đã gửi (chỉ huỷ pending do mình gửi)
    public function cancelRequest(Request $request, User $user)
    {
        $me = $request->user();

        $deleted = DB::table('friendships')
            ->where('user1_id', $me->id)
            ->where('user2_id', $user->id)
            ->where('status', 'pending')
            ->delete();

        if ($deleted) {
            return response()->json(['message' => 'Đã huỷ lời mời kết bạn.']);
        }
        return response()->json(['message' => 'Không tìm thấy lời mời để huỷ.'], 404);
    }

    // Chấp nhận lời mời (user là người gửi lời mời, me là người nhận)
    public function acceptRequest(Request $request, User $user)
    {
        $me = $request->user();

        $updated = DB::table('friendships')
            ->where('user1_id', $user->id)
            ->where('user2_id', $me->id)
            ->where('status', 'pending')
            ->update(['status' => 'accepted']);

        if ($updated) {
            // Tăng friend_count cho cả hai user
            DB::table('users')->where('id', $me->id)->increment('friend_count');
            DB::table('users')->where('id', $user->id)->increment('friend_count');
            // Notification cho user gửi lời mời
            DB::table('notifications')->insert([
                'sender_id' => $me->id,
                'receiver_id' => $user->id,
                'type' => 'friend_request',
                'title' => $me->name . ' đã chấp nhận lời mời kết bạn.',
                'created_at' => now(),
                'is_read' => false,
            ]);
            return response()->json(['message' => 'Đã chấp nhận lời mời kết bạn.']);
        }
        return response()->json(['message' => 'Không tìm thấy lời mời để chấp nhận.'], 404);
    }

    // Huỷ kết bạn (xoá relationship đã accepted)
    public function unfriend(Request $request, User $user)
    {
        $me = $request->user();

        $deleted = DB::table('friendships')
            ->where(function($q) use ($me, $user) {
                $q->where('user1_id', $me->id)->where('user2_id', $user->id);
            })
            ->orWhere(function($q) use ($me, $user) {
                $q->where('user1_id', $user->id)->where('user2_id', $me->id);
            })
            ->where('status', 'accepted')
            ->delete();

        if ($deleted) {
            // Giảm friend_count cho cả hai user
            DB::table('users')->where('id', $me->id)->decrement('friend_count');
            DB::table('users')->where('id', $user->id)->decrement('friend_count');
            return response()->json(['message' => 'Đã huỷ kết bạn.']);
        }
        return response()->json(['message' => 'Không tìm thấy bạn bè để huỷ.'], 404);
    }

    public function listFriends(Request $request)
    {
        $me = $request->user();

        // Lấy tất cả user là bạn bè accepted với mình
        $friends = DB::table('friendships')
            ->where(function($q) use ($me) {
                $q->where('user1_id', $me->id)->orWhere('user2_id', $me->id);
            })
            ->where('status', 'accepted')
            ->get()
            ->map(function($f) use ($me) {
                $friendId = $f->user1_id == $me->id ? $f->user2_id : $f->user1_id;
                return User::select('id', 'name', 'avatar', 'bio')->find($friendId);
            })
            ->filter();

        return response()->json($friends->values());
    }

    public function listReceivedRequests(Request $request)
    {
        $me = $request->user();

        // Lấy lời mời mình nhận (user2_id là mình, status là pending)
        $requests = DB::table('friendships')
            ->where('user2_id', $me->id)
            ->where('status', 'pending')
            ->get()
            ->map(function($f) {
                return User::select('id', 'name', 'avatar', 'bio')->find($f->user1_id);
            })
            ->filter();

        return response()->json($requests->values());
    }

    public function listSentRequests(Request $request)
    {
        $me = $request->user();

        // Lấy lời mời mình gửi (user1_id là mình, status là pending)
        $requests = DB::table('friendships')
            ->where('user1_id', $me->id)
            ->where('status', 'pending')
            ->get()
            ->map(function($f) {
                return User::select('id', 'name', 'avatar', 'bio')->find($f->user2_id);
            })
            ->filter();

        return response()->json($requests->values());
    }
}
