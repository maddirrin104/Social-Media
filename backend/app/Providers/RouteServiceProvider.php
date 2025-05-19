<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define your route model bindings, pattern filters, etc.
     */
    public function boot(): void
    {
        // Load routes/api.php
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        // Load routes/web.php
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }
}
