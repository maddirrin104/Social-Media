<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\UserSession;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class logoutController extends Controller
{
    public function logout(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response([
                'message' => 'Người dùng chưa đăng nhập'
            ], 401);
        }

        // Lấy token hiện tại để tìm phiên tương ứng
        $currentToken = $request->bearerToken();
        
        try {
            // Cập nhật trạng thái phiên đăng nhập
            if ($currentToken) {
                UserSession::where('user_id', $user->id)
                    ->where(function($query) use ($currentToken) {
                        // Tìm phiên theo session_id hoặc cập nhật tất cả nếu log out tất cả thiết bị
                        $query->where('session_id', $currentToken)
                              ->orWhere('ip_address', request()->ip());
                    })
                    ->update([
                        'expires_at' => Carbon::now()
                    ]);
            }
            
            // Xóa token hiện tại hoặc tất cả tokens
            if ($request->input('all_devices', false)) {
                // Đăng xuất khỏi tất cả thiết bị
                $user->tokens()->delete();
            } else {
                // Chỉ đăng xuất khỏi thiết bị hiện tại
                $request->user()->currentAccessToken()->delete();
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
     * Đăng xuất khỏi tất cả các thiết bị khác.
     */
    public function logoutOtherDevices(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);
        
        $user = Auth::user();
        
        if (!$user || !password_verify($request->password, $user->password)) {
            return response([
                'message' => 'Mật khẩu không chính xác'
            ], 401);
        }
        
        // Lấy ID token hiện tại
        $currentTokenId = $request->user()->currentAccessToken()->id;
        
        // Xóa tất cả tokens ngoại trừ token hiện tại
        $user->tokens()->where('id', '!=', $currentTokenId)->delete();
        
        // Cập nhật trạng thái phiên đăng nhập
        UserSession::where('user_id', $user->id)
            ->where('session_id', '!=', $request->bearerToken())
            ->update([
                'expires_at' => Carbon::now()
            ]);
        
        return response([
            'message' => 'Đã đăng xuất khỏi tất cả các thiết bị khác'
        ], 200);
    }
}