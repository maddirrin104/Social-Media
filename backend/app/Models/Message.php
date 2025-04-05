<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $primaryKey = 'message_id';

    protected $fillable = [
        'sender_id', 'receiver_id', 'content', 'media_url', 'is_deleted'
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function media()
    {
        return $this->hasMany(Media::class, 'message_id');
    }
}
