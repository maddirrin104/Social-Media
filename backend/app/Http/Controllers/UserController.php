<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // Đăng ký người dùng mới
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users,username|max:50',
            'email' => 'required|unique:users,email|email',
            'password' => 'required|min:8',
            'full_name' => 'required|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = new User();
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->full_name = $request->full_name;
        $user->save();

        return response()->json(['message' => 'User registered successfully!'], 201);
    }

    // Đăng nhập
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            return response()->json(['message' => 'Login successful', 'user' => $user], 200);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }

    // Cập nhật hồ sơ người dùng
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $user->full_name = $request->full_name ?? $user->full_name;
        $user->bio = $request->bio ?? $user->bio;
        $user->location = $request->location ?? $user->location;
        $user->interests = $request->interests ?? $user->interests;
        $user->profile_picture = $request->profile_picture ?? $user->profile_picture;
        $user->cover_picture = $request->cover_picture ?? $user->cover_picture;
        $user->save();

        return response()->json(['message' => 'Profile updated successfully!', 'user' => $user], 200);
    }
}
