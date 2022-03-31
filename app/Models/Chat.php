<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'chat_type',
        'name',
        'picture',
    ];

    public function members() {
        return $this->hasMany(ChatMember::class, 'chat_id', 'id')->orderBy('created_at');;
    }

    public function messages() {
        return $this->hasMany(ChatMessage::class, 'chat_id', 'id')->orderBy('created_at');;
    }
}
