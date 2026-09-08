<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;

Route::get('/', function () {
    return redirect('/dashboard');
});
Route::post('/sync_qad_asset', [AssetController::class, 'store'])->name('syncqad');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/items/{encryptedId}', [ItemController::class, 'show'])->name('items.show');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['admin'])->group(function () {
        Route::get('/transactions/fullsto', [TransactionController::class, 'exportSTO'])->name('transactions.fullsto');
        Route::get('/transactions/dailyreport', [TransactionController::class, 'dailyreport'])->name('transactions.dailyreport');
        Route::get('/transactions/dailyreportpage', [TransactionController::class, 'dailyreportpage'])->name('transactions.dailyreportpage');
        Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');
        Route::put('/transactions/{transaction}', [TransactionController::class, 'update'])->name('transactions.update');
        Route::delete('/transactions/{transaction}', [TransactionController::class, 'destroy'])->name('transactions.destroy');
        Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
        Route::get('/transactions/{transaction}/edit', [TransactionController::class, 'edit'])->name('transactions.edit');
        Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
        Route::post('register', [RegisteredUserController::class, 'store']);
    });
    
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');

    Route::get('/items', [ItemController::class, 'index'])->name('items.index');
    Route::get('/items/export/url', [ItemController::class, 'exportUrl'])->name('items.export.url');
});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
