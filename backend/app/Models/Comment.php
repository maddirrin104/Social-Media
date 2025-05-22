<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'post_id',
        'user_id',
        'content',
        'parent_comment_id'
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
     * Get the post that the comment belongs to.
     */
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

    /**
     * Get the user that created the comment.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the parent comment.
     */
    public function parentComment()
    {
        return $this->belongsTo(Comment::class, 'parent_comment_id');
    }

    /**
     * Get the child comments.
     */
    public function childComments()
    {
        return $this->hasMany(Comment::class, 'parent_comment_id');
    }

    /**
     * Get the reactions for the comment.
     */
    public function reactions()
    {
        return $this->hasMany(Reaction::class, 'comment_id');
    }

    /**
     * Get the notifications for the comment.
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class, 'comment_id');
    }
}