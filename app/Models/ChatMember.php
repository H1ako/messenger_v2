<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'chat_id',
        'chat_type',
        'friend_id',
        'relationship'
    ];

    public function chat() {
        return $this->belongsTo(Chat::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
