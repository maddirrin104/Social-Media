<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $primaryKey = 'notification_id';

    protected $fillable = [
        'user_id', 'type', 'related_id', 'is_read'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
