<?php

// global dependencies
use Illuminate\Support\Facades\Route;
// controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\UserController;

// home page
Route::view('/', 'app')->name('home')->middleware('auth');

Route::post('/friend/remove-friend', [UserController::class, 'removeFriend']);
Route::post('/friend/send-request', [UserController::class, 'sendRequest']);
Route::post('/friend/cancel-request', [UserController::class, 'cancelRequest']);
Route::post('/friend/accept-request', [UserController::class, 'acceptRequest']);
Route::post('/friend/decline-request', [UserController::class, 'declineRequest']);
// login page
Route::view('/sign-up', 'app')->name('signUp');
Route::view('/sign-out', 'app')->name('signOut');
Route::view('/sign-in', 'app')->name('signIn');

Route::post('/sign-in', [AuthController::class, 'signIn']);
Route::post('/sign-up', [AuthController::class, 'signUp']);
Route::post('/sign-out', [AuthController::class, 'signOut']);
// chat page
Route::view('/chats', 'app')->name('chats')->middleware('auth');
Route::view('/chats/{chat_id}', 'app')->name('chatN')->middleware('auth', 'chat.access');
Route::view('/new-groupchat', 'app')->name('newGroupchat')->middleware('auth');

Route::post('/chat/check/{friendId}', [ChatController::class, 'checkChat'])->middleware('auth');
Route::post('/chats/{chat_id}/new-message', [ChatController::class, 'newMessage'])->middleware('auth', 'chat.access');
Route::post('/new-groupchat', [ChatController::class, 'newGroupchat'])->middleware('auth');
// user page
Route::view('/user/{userId}', 'app')->middleware('auth');