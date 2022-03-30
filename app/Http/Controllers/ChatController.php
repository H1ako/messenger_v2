<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function newMessage($chat_id, Request $request) {
        if (!Auth::check()) return

        $messageData = $request->validate([
            "text" => "required"
        ]);

        $newMessage = new ChatMessage([
            'chat_id' => $chat_id,
            'text' => $request->input('text'),
            'sender' => Auth::id()
        ]);
        $newMessage->save();
    }
}
