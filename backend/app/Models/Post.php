<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'content',
        'media_url',
        'privacy'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that created the post.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the comments for the post.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }

    /**
     * Get the reactions for the post.
     */
    public function reactions()
    {
        return $this->hasMany(Reaction::class, 'post_id');
    }

    /**
     * Get the notifications for the post.
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class, 'post_id');
    }

    /**
     * Count reactions by type.
     */
    public function countReactionsByType($type)
    {
        return $this->reactions()->where('reaction_type', $type)->count();
    }
}