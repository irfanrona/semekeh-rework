<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    public static function getAll(){
        return self::leftJoin('users', 'users.id', '=', 'user_id')
            ->orderBy('audits.created_at', 'desc')
            ->get();
    }
}
