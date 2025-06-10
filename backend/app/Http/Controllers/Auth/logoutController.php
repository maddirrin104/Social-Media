<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response([
                'message' => 'Người dùng chưa đăng nhập'
            ], 401);
        }

        try {
            // Nếu logout tất cả thiết bị
            if ($request->input('all_devices', false)) {
                $user->tokens()->delete();
            } else {
                // Chỉ logout thiết bị hiện tại (token hiện tại)
                $currentToken = $request->user()->currentAccessToken();
                if ($currentToken) {
                    $currentToken->delete();
                }
            }

            return response([
                'message' => 'Đăng xuất thành công'
            ], 200);

        } catch (\Exception $e) {
            return response([
                'message' => 'Đã xảy ra lỗi khi đăng xuất',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Đăng xuất khỏi tất cả các thiết bị khác ngoài thiết bị hiện tại.
     */
    public function logoutOtherDevices(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = $request->user();

        if (!$user || !\Hash::check($request->password, $user->password)) {
            return response([
                'message' => 'Mật khẩu không chính xác'
            ], 401);
        }

        // Lấy ID token hiện tại (nếu dùng Sanctum)
        $currentToken = $request->user()->currentAccessToken();
        $currentTokenId = $currentToken ? $currentToken->id : null;

        // Xóa tất cả tokens ngoại trừ token hiện tại
        $user->tokens()->when($currentTokenId, function ($query) use ($currentTokenId) {
            $query->where('id', '!=', $currentTokenId);
        })->delete();

        return response([
            'message' => 'Đã đăng xuất khỏi tất cả các thiết bị khác'
        ], 200);
    }
}