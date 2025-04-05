<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    protected $fillable = [
        'user_id',
        'friend_id',
        'status',
        'is_following',
    ];

    /**
     * Người gửi lời mời kết bạn.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Người nhận lời mời kết bạn.
     */
    public function friend()
    {
        return $this->belongsTo(User::class, 'friend_id');
    }

    /**
     * Kiểm tra xem đã là bạn bè hay chưa.
     */
    public function isAccepted()
    {
        return $this->status === 'Accepted';
    }

    /**
     * Kiểm tra xem có đang theo dõi hay không.
     */
    public function isFollowing()
    {
        return (bool) $this->is_following;
    }
}
