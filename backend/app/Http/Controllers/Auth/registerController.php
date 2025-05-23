<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class registerController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Validate input data
            $data = $request->validate([
                'full_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
                'date_of_birth' => ['required', 'date', 'before_or_equal:' . now()->subYears(16)->format('Y-m-d')],
                'gender' => 'required|in:male,female,others',
            ]);

            Log::info('Dữ liệu: ', $data);

            // Create new user
            $user = User::create([
                'full_name' => $data['full_name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password'])
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

            // Return success response
            return new Response($res, 201);

        } catch (ValidationException $e) {
            // Check if the error is related to duplicate email
            $errors = $e->validator->errors()->toArray();
            
            if (isset($errors['email']) && in_array('The email has already been taken.', $errors['email'])) {
                return new Response([
                    'message' => 'Registration failed',
                    'errors' => [
                        'email' => ['Email đã tồn tại.']
                    ]
                ], 422);
            }
            
            // Return other validation errors
            return new Response([
                'message' => 'Registration failed',
                'errors' => $errors
            ], 422);
        } catch (\Exception $e) {
            // Handle other exceptions
            Log::error('Registration error: ' . $e->getMessage());
            
            return new Response([
                'message' => 'Registration failed',
                'error' => 'An error occurred during registration. Please try again.'
            ], 500);
        }
    }
}