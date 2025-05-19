<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;


class registerController extends Controller
{
    public function register(Request $request)
    {
        // Validate input data
        $data = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'birth_date' => [
                'required',
                'date',
                'before:' . Carbon::now()->subYears(16)->format('Y-m-d'),
            ],
            'gender' => 'required|in:male,female,other',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create new user
        $user = User::create([
            'full_name' => $data['full_name'],
            'email' => $data['email'],
            'birth_date' => $data['birth_date'],
            'gender' => $data['gender'],
            'password' => bcrypt($data['password'])
        ]);

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
