<?php

use App\Http\Controllers\Api\AlumniController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\PendaftaranController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WilayahController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/me', [AuthController::class, 'me']);

Route::post('/pendaftaran', [PendaftaranController::class, 'store']);

Route::get('/berita-publik', [BeritaController::class, 'publik']);
Route::get('/berita-publik/{berita}', [BeritaController::class, 'publikShow']);

Route::get('/wilayah/provinces', [WilayahController::class, 'provinces']);
Route::get('/wilayah/regencies/{provinceId}', [WilayahController::class, 'regencies']);
Route::get('/wilayah/districts/{regencyId}', [WilayahController::class, 'districts']);
Route::get('/wilayah/villages/{districtId}', [WilayahController::class, 'villages']);

Route::middleware('auth.api_token')->group(function () {
    Route::post('/upload', [UploadController::class, 'store']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/alumni', [AlumniController::class, 'index']);

    Route::get('/berita', [BeritaController::class, 'index']);
    Route::post('/berita', [BeritaController::class, 'store']);
    Route::get('/berita/{berita}', [BeritaController::class, 'show']);
    Route::put('/berita/{berita}', [BeritaController::class, 'update']);
    Route::delete('/berita/{berita}', [BeritaController::class, 'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

    Route::get('/pendaftaran', [PendaftaranController::class, 'index']);
    Route::get('/pendaftaran/{pendaftaran}', [PendaftaranController::class, 'show']);
    Route::delete('/pendaftaran/{pendaftaran}', [PendaftaranController::class, 'destroy']);
});
