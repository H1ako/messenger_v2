<?php

namespace App\Http\Controllers;

use App\Events\ChatUpdate;
use App\Events\MessageSend;
use App\Models\Chat;
use App\Models\ChatMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function newMessage($chat_id, Request $request) {
        $messageData = $request->validate([
            "text" => "required"
        ]);

        $user = Auth::user();
        $chatMemebrship = $user->chats()->where('chat_id', $chat_id)->first();
        $chat = Chat::find($chatMemebrship->chat_id);

        $text = $request->input('text');

        $newMessage = $chat->messages()->create([
            'chat_id' => $chat_id,
            'text' => $text,
            'sender' => $user->id
        ]);

        if ($newMessage) {
            $chat->last_message_sender = $user->id;
            $chat->last_message = $text;
            $chat->save();
        }
        $newMessage->sender = $user;
        if ($chat->last_message_sender && $chat->chat_type === 'groupchat') {
            $chat->last_message_sender = User::find($chat->last_message_sender);
        }
        if ($chat->chat_type === 'dialog') {
            $chat->companion = $user;
        }
        $chatMembers = $chat->members()->pluck('member_id');

        event(new MessageSend($newMessage));
        foreach ($chatMembers as $chatMember) {
            event(new ChatUpdate($chat, $chatMember));
        }
        error_log("$user");
    }

    public function checkChat($friendId, Request $request) {
        $user = Auth::user();

        $userChatsIds = $user->dialogs()->pluck('chat_id');
        $friend = User::find($friendId);
        
        $chat = $friend->dialogs()->whereIn('chat_id', $userChatsIds)->first();
        if ($chat) return ["url" => "/chats/$chat->chat_id"];

        $newChat = Chat::make(['chat_type' => 'dialog']);
        $newChat->save();

        $user->dialogs()->create([
            'chat_id' => $newChat->id,
            'chat_type' => 'dialog'
        ]);
        $friend->dialogs()->create([
            'chat_id' => $newChat->id,
            'chat_type' => 'dialog'
        ]);
        return ["url" => "/chats/$newChat->id"];
    }

    public function newGroupchat(Request $request) {
        $request->validate([
            'name' => 'required',
            'picture' => 'image'
        ]);

        $user = Auth::user();
        $name = $request->input('name');
        $chatMembersIds = explode(',', $request->input('chatMembers'));
        $newChat = Chat::make();
        $newChat->name = $name;
        $newChat->chat_type = 'groupchat';
        $newChat->save();

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $destinationPath = 'for_chats/avatars';
            $extension = $file->getClientOriginalExtension();
            $fileName = $newChat->id . "." . $extension;
        
            $file->move($destinationPath, $fileName);
        
            $newChat->picture = '/' . $destinationPath . '/' . $fileName;
            $newChat->save();
        }

        $newChat->members()->create([
            'chat_type' => 'groupchat',
            'member_id' => $user->id,
            'role' => 'owner'
        ]);

        foreach ($chatMembersIds as $chatMemberId) {
            $chatMember = $user->friends()->where('friend_id', $chatMemberId)->first();
            if (! $chatMember) break; // if chat member is user's friend
            $newChat->members()->create([
                'chat_type' => 'groupchat',
                'member_id' => $chatMemberId,
                'role' => 'user'
            ]);
        }

        return ["url" => "/chats/$newChat->id"];
    }
}
