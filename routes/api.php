<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KebunController;
use App\Http\Controllers\PengajuanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('profile', [ProfileController::class, 'show']);
    Route::post('profile', [ProfileController::class, 'update']);

    // Rute untuk Mahasiswa dan Admin melihat data perkebunan
    Route::get('/kebun', [KebunController::class, 'index']);
    Route::get('/kebun/{id}', [KebunController::class, 'show']);


    Route::get('/pengajuan', [PengajuanController::class, 'index']);
    Route::post('/pengajuan', [PengajuanController::class, 'store']);
    Route::post('/pengajuan/{id}', [PengajuanController::class, 'update']);
    Route::post('/pengajuan-update-status/{id}', [PengajuanController::class, 'updateApproval']);
    Route::delete('/pengajuan/{id}', [PengajuanController::class, 'destroy']);

    Route::middleware('role:admin')->group(function () {
        Route::apiResource('/users', UserController::class);
        Route::post('/kebun', [KebunController::class, 'store']);
        Route::put('/kebun/{id}', [KebunController::class, 'update']);
        Route::delete('/kebun/{id}', [KebunController::class, 'destroy']);
    });
});

// Rute publik
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
