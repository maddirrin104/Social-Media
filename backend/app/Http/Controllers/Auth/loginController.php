<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Str;

class loginController extends Controller
{
    public function login(Request $request)
    {
        // Validate dữ liệu đầu vào
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response([
                'msg' => 'incorrect username or password'
            ], 401);
        }

        $user->is_active = true;

        // Cập nhật thời gian đăng nhập
        $user->last_login = Carbon::now();
        $user->save();

        $token = $user->createToken('apiToken')->plainTextToken;

        // Lưu thông tin phiên đăng nhập
        UserSession::create([
            'session_id' => Str::uuid(),
            'user_id' => $user->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'expires_at' => Carbon::now()->addDays(7) // Token hết hạn sau 7 ngày
        ]);

        // Lấy thông tin profile nếu cần
        $user->load('profile');

        $res = [
            'user' => $user,
            'token' => $token
        ];

        return response($res, 201);
    }

    public function me(Request $request)
    {
        // Lấy thông tin người dùng hiện tại với profile
        $user = $request->user()->load('profile');
        
        return response([
            'user' => $user
        ]);
    }
}
