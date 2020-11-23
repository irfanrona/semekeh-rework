<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WelcomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/storage/homepage/{any}', [
//     'middleware' => 'cache.headers:public;max_age=2628000;etag',
//     'uses' => [WelcomeController::class, 'viewFile']
// ])->where('any', '.*');

Route::get('/{any}', [WelcomeController::class, 'index'])->where('any', '.*');
