<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolePermission extends Model
{
    use HasFactory;

    protected $table = 'role_permissions';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'role',
        'permission_id'
    ];

    /**
     * Get the permission for this role permission.
     */
    public function permission()
    {
        return $this->belongsTo(Permission::class, 'permission_id');
    }
}