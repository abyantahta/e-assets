<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->environment('production') || $this->app->environment('dev')) {
            URL::forceScheme('https');
        }
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
    	$this->app['request']->server->set('HTTPS','on');
        Vite::prefetch(concurrency: 3);
    }
}
