<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public $timestamps = false; // vì bạn dùng created_at là timestamp ms tự custom
    protected $table = 'messages';
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'content',
        'created_at',
    ];

    // Quan hệ tới User
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
