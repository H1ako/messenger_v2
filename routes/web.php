<?php

// global dependencies
use Illuminate\Support\Facades\Route;
// controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;

// home page
Route::view('/', 'app')->name('home')->middleware('auth');
// login page
Route::view('/sign-up', 'app')->name('signUp');
Route::view('/sign-out', 'app')->name('signOut');
Route::view('/sign-in', 'app')->name('signIn');

Route::post('/sign-in', [AuthController::class, 'signIn']);
Route::post('/sign-up', [AuthController::class, 'signUp']);
Route::post('/sign-out', [AuthController::class, 'signOut']);
// chat page
Route::view('/chats', 'app')->name('chats')->middleware('auth');
Route::view('/chats/{id}', 'app')->name('chatN')->middleware('auth');
Route::view('/new-groupchat', 'app')->name('newGroupchat')->middleware('auth');

Route::post('/chats/{chat_id}/new-message', [ChatController::class, 'newMessage']);