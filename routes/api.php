<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShortenerUrlController;
use Illuminate\Http\Request;

Route::middleware('auth:sanctum')
    ->prefix('shortenerUrl')
    ->name('api.shortenerUrl.')
    ->group(function () {
        Route::get('/link/{shortenLink}', [ShortenerUrlController::class, 'shortenLink'])->name('link');
        Route::post('/', [ShortenerUrlController::class, 'store'])->name('store');
        Route::patch('/{id}', [ShortenerUrlController::class, 'update'])->name('update');
        Route::delete('/{id}', [ShortenerUrlController::class, 'destroy'])->name('destroy');
    });

