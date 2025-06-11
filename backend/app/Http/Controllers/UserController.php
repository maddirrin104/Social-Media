<?php

namespace App\Http\Controllers;

use App\Http\Resources\AllUserResource;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::withCount(['posts', 'comments', 'likes'])
            ->get();

        return AllUserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::with([
            'sentFriendships',
            'receivedFriendships',
            'notificationsSent',
            'notificationsReceived'
        ])->findOrFail($id);

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = auth()->user();

        // Validate request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'hometown' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:100',
            'tiktok' => 'nullable|string|max:100',
            'avatar' => 'nullable|string', // nếu frontend gửi base64 string
            // Nếu bạn upload file avatar thì đổi thành: 'avatar' => 'nullable|image|max:2048',
            'currentPassword' => 'nullable|string|min:6',
            'newPassword' => 'nullable|string|min:6',
            'confirmPassword' => 'nullable|string|min:6|same:newPassword',
        ]);

        // Xử lý avatar (giả sử frontend gửi base64 string)
        if ($request->avatar && !str_starts_with($request->avatar, 'http')) {
            // Lưu ảnh mới (giả sử base64 png/jpg)
            $avatarData = $request->avatar;
            $avatarName = 'avatars/' . uniqid() . '.png';
            Storage::disk('public')->put($avatarName, base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $avatarData)));
            // Xóa ảnh cũ nếu có
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $user->avatar = $avatarName;
        }

        // Đổi mật khẩu nếu có
        if ($request->filled('currentPassword') && $request->filled('newPassword')) {
            if (!Hash::check($request->currentPassword, $user->password)) {
                return response()->json(['message' => 'Mật khẩu hiện tại không đúng.'], 422);
            }
            $user->password = bcrypt($request->newPassword);
        }

        // Cập nhật các trường khác
        $user->name = $request->name;
        $user->bio = $request->bio;
        $user->email = $request->email;
        $user->hometown = $request->hometown;
        $user->instagram = $request->instagram;
        $user->tiktok = $request->tiktok;
        $user->save();

        // Trả về user mới
        return response()->json([
            'message' => 'Cập nhật thành công!',
            'user' => $user->fresh()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
