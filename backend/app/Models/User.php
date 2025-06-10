<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $fillable = [
        'name', 'email', 'password', 'avatar', 'bio', 'followers',
        'following', 'posts', 'role', 'friend_count', 'hometown',
        'instagram', 'tiktok'
    ];

    protected $hidden = ['password'];

    // Relationships
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function sentFriendships()
    {
        return $this->hasMany(Friendship::class, 'user1_id');
    }

    public function receivedFriendships()
    {
        return $this->hasMany(Friendship::class, 'user2_id');
    }

    public function notificationsSent()
    {
        return $this->hasMany(Notification::class, 'sender_id');
    }

    public function notificationsReceived()
    {
        return $this->hasMany(Notification::class, 'receiver_id');
    }
}