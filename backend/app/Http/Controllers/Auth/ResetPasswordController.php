<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\ResetPasswordRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    /**
     * Create token password reset.
     *
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function sendMail(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email not found'], 404);
        }

        // Lưu token trực tiếp vào bảng users
        $token = Str::random(60);
        $user->reset_token = $token;
        $user->reset_token_expiry = Carbon::now()->addMinutes(720); // 12 giờ
        $user->save();
        
        $user->notify(new ResetPasswordRequest($token));
  
        return response()->json([
            'message' => 'We have e-mailed your password reset link!'
        ]);
    }

    public function reset(Request $request, $token)
    {
        $request->validate([
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::where('reset_token', $token)->first();

        if (!$user) {
            return response()->json([
                'message' => 'This password reset token is invalid.',
            ], 422);
        }

        if (Carbon::parse($user->reset_token_expiry)->isPast()) {
            $user->reset_token = null;
            $user->reset_token_expiry = null;
            $user->save();

            return response()->json([
                'message' => 'This password reset token has expired.',
            ], 422);
        }

        $user->password = Hash::make($request->password);
        $user->reset_token = null;
        $user->reset_token_expiry = null;
        $user->save();

        return response()->json([
            'message' => 'Password has been successfully reset.',
        ]);
    }
}