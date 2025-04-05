<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $primaryKey = 'media_id';

    protected $fillable = [
        'post_id', 'message_id', 'media_url', 'media_type'
    ];

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

    public function message()
    {
        return $this->belongsTo(Message::class, 'message_id');
    }
}
