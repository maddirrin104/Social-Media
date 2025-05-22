<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;


class registerController extends Controller
{
    public function register(Request $request)
    {
        // Validate input data
        $data = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'date_of_birth' => ['required', 'date', 'before_or_equal:' . now()->subYears(16)->format('Y-m-d')],
            'gender' => 'required|string|in:male,female,others',
        ]);

        // Create new user
        $user = User::create([
            'full_name' => $data['full_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        // Create user profile
        UserProfile::create([
            'user_id' => $user->id,
            'full_name' => $data['full_name'],
            'date_of_birth' => $data['date_of_birth'],
            'gender' => $data['gender'],
        ]);

        $user->load('profile');

        $token = $user->createToken('apiToken')->plainTextToken;

        $res = [
            'message' => 'Registration successful',
            'user' => $user,
            'token' => $token   
        ];

        // Return response
        return response($res, 201);
    }
}
