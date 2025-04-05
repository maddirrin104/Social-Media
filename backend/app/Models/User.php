<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $primaryKey = 'user_id';

    //Danh sách các trường cho phép gán hàng loạt (mass assignment)
    protected $fillable = [
        'username',
        'email',
        'phone',
        'password',
        'full_name',
        'gender',
        'birth_date',
        'bio',
        'location',
        'interests',
        'profile_picture',
        'cover_picture',
        'privacy_settings',
        'is_active',
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'birth_date' => 'date',
            'password' => 'hashed',
            'privacy_settings' => 'array',
            'is_active' => 'boolean',
        ];
    }
}





