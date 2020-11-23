<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\AlumniController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FooterController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\KeywordController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\MetaController;
use App\Http\Controllers\PrestationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\StudyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function(){
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout/{id}', [AuthController::class, 'logout']);
});

Route::group(['prefix' => 'admin', 'middleware' => 'auth:sanctum'], function(){
    Route::post('{path}/upload', [HomepageController::class, 'upload']);
    Route::post('auth', [AuthController::class, 'getUser']);
    Route::post('auth/update', [AuthController::class, 'update']);

    Route::group(['prefix' => 'homepage'], function(){
        Route::get('/', [HomepageController::class, 'index']);

        Route::group(['prefix' => 'carousel'], function(){
            Route::get('/', [CarouselController::class, 'table']);
            Route::post('create', [CarouselController::class, 'create']);
            Route::post('update/{id}', [CarouselController::class, 'update']);
            Route::delete('delete/{id}', [CarouselController::class, 'delete']);
        });

        Route::group(['prefix' => 'video'], function(){
            Route::get('/', [VideoController::class, 'table']);
            Route::post('create', [VideoController::class, 'create']);
            Route::post('update/{id}', [VideoController::class, 'update']);
            Route::delete('delete/{id}', [VideoController::class, 'delete']);
            Route::post('publish/{id}', [VideoController::class, 'publish']);
        });

        Route::post('about/update', [HomepageController::class, 'aboutUpdate']);

        Route::group(['prefix' => 'alumni'], function(){
            Route::get('/', [AlumniController::class, 'table']);
            Route::post('create', [AlumniController::class, 'create']);
            Route::post('update/{id}', [AlumniController::class, 'update']);
            Route::delete('delete/{id}', [AlumniController::class, 'delete']);
            Route::post('publish/{id}', [AlumniController::class, 'publish']);
        });

        Route::group(['prefix' => 'company'], function(){
            Route::get('/', [CompanyController::class, 'table']);
            Route::post('create', [CompanyController::class, 'create']);
            Route::post('update/{id}', [CompanyController::class, 'update']);
            Route::delete('delete/{id}', [CompanyController::class, 'delete']);
        });

        Route::group(['prefix' => 'social'], function(){
            Route::get('/', [SocialController::class, 'table']);
            Route::post('create', [SocialController::class, 'create']);
            Route::post('update/{id}', [SocialController::class, 'update']);
            Route::delete('delete/{id}', [SocialController::class, 'delete']);
        });

        Route::group(['prefix' => 'footer'], function(){
            Route::get('/', [FooterController::class, 'table']);
            Route::post('create', [FooterController::class, 'create']);
            Route::post('update/{id}', [FooterController::class, 'update']);
            Route::delete('delete/{id}', [FooterController::class, 'delete']);
        });

        Route::group(['prefix' => 'section'], function(){
            Route::get('/', [SectionController::class, 'table']);
            Route::post('update/{id}', [SectionController::class, 'update']);
        });
    });

    Route::group(['prefix' => 'profile'], function(){
        Route::get('{id}', [ProfileController::class, 'getData']);
        Route::get('council/get', [ProfileController::class, 'council']);
        Route::post('council/update', [ProfileController::class, 'updateCouncil']);
        Route::post('update/{id}', [ProfileController::class, 'update']);
        Route::post('img/create/{id}', [ProfileController::class, 'createImg']);
        Route::delete('img/delete/{id}', [ProfileController::class, 'deleteImg']);
    });

    Route::group(['prefix' => 'study'], function(){
        Route::get('/', [StudyController::class, 'table']);
        Route::get('edit/{id}', [StudyController::class, 'edit']);
        Route::post('update/{id}', [StudyController::class, 'update']);
    });

    Route::group(['prefix' => 'media'], function(){
        Route::group(['prefix' => 'agenda'], function(){
            Route::get('/', [AgendaController::class, 'table']);
            Route::post('create', [AgendaController::class, 'create']);
            Route::post('update/{id}', [AgendaController::class, 'update']);
            Route::get('edit/{id}', [AgendaController::class, 'edit']);
            Route::delete('delete/{id}', [AgendaController::class, 'delete']);
            Route::post('img/create/{id}', [AgendaController::class, 'createImg']);
            Route::delete('img/delete/{id}', [AgendaController::class, 'deleteImg']);
        });

        Route::group(['prefix' => 'prestation'], function(){
            Route::get('/', [PrestationController::class, 'table']);
            Route::post('create', [PrestationController::class, 'create']);
            Route::post('update/{id}', [PrestationController::class, 'update']);
            Route::delete('delete/{id}', [PrestationController::class, 'delete']);
        });

        Route::group(['prefix' => 'gallery'], function(){
            Route::get('/', [GalleryController::class, 'table']);
            Route::post('create', [GalleryController::class, 'create']);
            Route::delete('delete/{id}', [GalleryController::class, 'delete']);
        });
    });

    Route::group(['prefix' => 'employee'], function(){
        Route::get('/', [EmployeeController::class, 'table']);
        Route::post('create', [EmployeeController::class, 'create']);
        Route::post('update/{id}', [EmployeeController::class, 'update']);
        Route::delete('delete/{id}', [EmployeeController::class, 'delete']);
        Route::post('img/create', [EmployeeController::class, 'createImg']);
        Route::delete('img/delete/{id}', [EmployeeController::class, 'deleteImg']);
    });

    Route::group(['prefix' => 'keyword'], function(){
        Route::get('/', [KeywordController::class, 'table']);
        Route::post('create', [KeywordController::class, 'create']);
        Route::post('update/{id}', [KeywordController::class, 'update']);
        Route::delete('delete/{id}', [KeywordController::class, 'delete']);
    });

    Route::group(['prefix' => 'meta'], function(){
        Route::get('/', [MetaController::class, 'table']);
        Route::post('create', [MetaController::class, 'create']);
        Route::post('update/{id}', [MetaController::class, 'update']);
        Route::delete('delete/{id}', [MetaController::class, 'delete']);
    });

    Route::group(['prefix' => 'user'], function(){
        Route::get('/', [UserController::class, 'table']);
        Route::post('create', [UserController::class, 'create']);
        Route::post('update/{id}', [UserController::class, 'update']);
        Route::post('ban/{id}', [UserController::class, 'ban']);
    });

    Route::group(['prefix' => 'role'], function(){
        Route::get('/', [RoleController::class, 'table']);
        Route::get('create', [RoleController::class, 'create']);
        Route::get('edit/{id}', [RoleController::class, 'edit']);
        Route::post('store', [RoleController::class, 'store']);
        Route::post('update/{id}', [RoleController::class, 'update']);
        Route::delete('delete/{id}', [RoleController::class, 'delete']);
    });

    Route::get('audit', [HomepageController::class, 'audit']);
});

Route::get('navbar', [WelcomeController::class, 'navbar']);
Route::get('footer', [WelcomeController::class, 'footer']);
Route::get('welcome', [WelcomeController::class, 'home']);
Route::get('keyword', [WelcomeController::class, 'keyword']);
Route::get('social', [WelcomeController::class, 'social']);
Route::get('profile/{id}', [WelcomeController::class, 'profile']);
Route::get('study/{id}', [WelcomeController::class, 'study']);
Route::get('agenda', [WelcomeController::class, 'agenda']);
Route::get('agenda/{id}', [WelcomeController::class, 'agendaDetail']);
Route::get('prestation', [WelcomeController::class, 'prestation']);
Route::get('gallery', [WelcomeController::class, 'gallery']);
Route::get('employee', [WelcomeController::class, 'employee']);
Route::get('search', [WelcomeController::class, 'search']);
