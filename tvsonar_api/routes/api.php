<?php

use App\Http\Controllers\ShowsController;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'shows', 'middleware' => 'throttle:shows'], function() {
    Route::get('/', [ShowsController::class, 'list']);
    Route::get('/search', [ShowsController::class, 'search']);
});