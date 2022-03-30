<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'text',
        'sender',
        'chat_id'
    ];


    public function chat() {
        return $this->belongsTo(Chat::class);
    }

    public function getCreatedAtAttribute($created_at) {
        $date = Carbon::parse($created_at);
        return $date->format('H:i');
    }
}
