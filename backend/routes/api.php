<?php

use Illuminate\Support\Facades\Route;

Route::post('/upload', [\App\Http\Controllers\FileUploadController::class, 'upload']);
Route::get('/files', [\App\Http\Controllers\FileUploadController::class, 'index']);
