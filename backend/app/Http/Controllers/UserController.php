<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Tìm kiếm người dùng để bắt đầu cuộc trò chuyện.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:2',
        ]);
        
        $user = Auth::user();
        $query = $request->query('query');
        
        // Tìm người dùng theo tên hoặc email
        $users = User::where('id', '!=', $user->id)
            ->where(function ($q) use ($query) {
                $q->where('full_name', 'like', "%{$query}%")
                  ->orWhere('email', 'like', "%{$query}%");
            })
            ->with('profile:user_id,profile_picture')
            ->limit(10)
            ->get(['id', 'full_name', 'email']);
        
        return response()->json($users);
    }

    /**
     * Lấy danh sách bạn bè để bắt đầu cuộc trò chuyện.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function friends()
    {
        $user = Auth::user();
        
        // Lấy danh sách bạn bè
        $friends = $user->friends();
        
        return response()->json($friends);
    }
}