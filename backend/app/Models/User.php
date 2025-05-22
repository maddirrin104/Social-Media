<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'password',
        'reset_token',
        'reset_token_expiry',
        'is_active',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'reset_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'last_login' => 'datetime',
        'reset_token_expiry' => 'datetime',
        'is_active' => 'boolean',
        'password' => 'hashed',
    ];

    /**
     * Get the profile associated with the user.
     */
    public function profile()
    {
        return $this->hasOne(UserProfile::class, 'user_id');
    }

    /**
     * Get the sessions associated with the user.
     */
    public function sessions()
    {
        return $this->hasMany(UserSession::class, 'user_id');
    }

    /**
     * Get the posts associated with the user.
     */
    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id');
    }

    /**
     * Get the comments associated with the user.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class, 'user_id');
    }

    /**
     * Get the reactions associated with the user.
     */
    public function reactions()
    {
        return $this->hasMany(Reaction::class, 'user_id');
    }

    /**
     * Get the sent friend requests.
     */
    public function sentFriendRequests()
    {
        return $this->hasMany(FriendRequest::class, 'sender_id');
    }

    /**
     * Get the received friend requests.
     */
    public function receivedFriendRequests()
    {
        return $this->hasMany(FriendRequest::class, 'receiver_id');
    }

    /**
     * Get the friendships where the user is user_id1.
     */
    public function friendshipsAsUser1()
    {
        return $this->hasMany(Friendship::class, 'user_id1');
    }

    /**
     * Get the friendships where the user is user_id2.
     */
    public function friendshipsAsUser2()
    {
        return $this->hasMany(Friendship::class, 'user_id2');
    }

    /**
     * Get all friends of the user.
     */
    public function friends()
    {
        $friends1 = $this->friendshipsAsUser1()->with('user2')->get()->pluck('user2');
        $friends2 = $this->friendshipsAsUser2()->with('user1')->get()->pluck('user1');
        
        return $friends1->merge($friends2);
    }

    /**
     * Get the conversations this user participates in.
     */
    public function conversations()
    {
        return $this->belongsToMany(Conversation::class, 'conversation_participants', 'user_id', 'conversation_id')
                    ->withPivot('joined_at', 'left_at')
                    ->withTimestamps();
    }

    /**
     * Get the messages sent by this user.
     */
    public function messages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    /**
     * Get the notifications for this user.
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class, 'user_id');
    }

    /**
     * Get the admin logs for this user (if admin).
     */
    public function adminLogs()
    {
        return $this->hasMany(AdminLog::class, 'admin_id');
    }

    /**
     * Check if user has a specific permission.
     */
    public function hasPermission($permissionName)
    {
        $permissions = RolePermission::where('role', $this->role)
            ->with('permission')
            ->get()
            ->pluck('permission.name');
        
        return $permissions->contains($permissionName);
    }

    /**
     * Check if user is an admin.
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}