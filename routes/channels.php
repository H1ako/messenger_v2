<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chatbox.{chatId}', function ($user, $chatId) {
    if (!$user) return false;
    $isUserChatMember = $user->chats->where('chat_id', $chatId)->first();
    if (!$isUserChatMember) return false;
    return true;
});