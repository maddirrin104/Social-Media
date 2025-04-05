<?php

namespace App\Http\Controllers;

use App\Models\Friendship;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendshipController extends Controller
{
    // Gửi lời mời kết bạn
    public function sendFriendRequest($friendId)
    {
        $user = Auth::user();
        $friend = User::findOrFail($friendId);

        $friendship = Friendship::create([
            'user_id' => $user->user_id,
            'friend_id' => $friend->user_id,
            'status' => 'Pending',
        ]);

        return response()->json(['message' => 'Friend request sent'], 200);
    }

    // Chấp nhận lời mời kết bạn
    public function acceptFriendRequest($friendId)
    {
        $friendship = Friendship::where('user_id', Auth::id())
            ->where('friend_id', $friendId)
            ->where('status', 'Pending')
            ->firstOrFail();

        $friendship->status = 'Accepted';
        $friendship->save();

        return response()->json(['message' => 'Friend request accepted'], 200);
    }

    // Hủy kết bạn
    public function unfriend($friendId)
    {
        $friendship = Friendship::where('user_id', Auth::id())
            ->where('friend_id', $friendId)
            ->orWhere('friend_id', Auth::id())
            ->where('user_id', $friendId)
            ->firstOrFail();

        $friendship->delete();

        return response()->json(['message' => 'Unfriended successfully'], 200);
    }
}
