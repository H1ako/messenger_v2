<?php

use Illuminate\Support\Facades\Route;

// for using react-dom-router(SPA)
Route::view('/{any}', 'app')->where('any', '.*');
