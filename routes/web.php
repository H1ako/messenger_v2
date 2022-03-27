<?php

// global dependencies
use Illuminate\Support\Facades\Route;
// controllers
use App\Http\Controllers\AuthController;

// for using react-dom-router(SPA)
Route::view('/{any}', 'app')->where('any', '.*')->middleware('auth');

Route::get('/')->name('home');

Route::post('/sign-in', [AuthController::class, 'signIn']);
Route::post('/sign-up', [AuthController::class, 'signUp']);
Route::post('/sign-out', [AuthController::class, 'signOut']);