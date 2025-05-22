<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'conversation_id',
        'sender_id',
        'content',
        'media_url',
        'is_read'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_read' => 'boolean',
        'created_at' => 'datetime',
    ];

    /**
     * Get the conversation that the message belongs to.
     */
    public function conversation()
    {
        return $this->belongsTo(Conversation::class, 'conversation_id');
    }

    /**
     * Get the user that sent the message.
     */
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * Get the read status for each participant.
     */
    public function readStatus()
    {
        return $this->hasMany(MessageStatus::class, 'message_id');
    }

    /**
     * Get the notifications for this message.
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class, 'message_id');
    }
}