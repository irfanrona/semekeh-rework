const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

if (process.env.MIX_APP_ENV === 'production') {
    const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

    mix.webpackConfig({
        plugins: [
            new SWPrecacheWebpackPlugin({
                cacheId: 'pwa',
                filename: 'service-worker.js',
                staticFileGlobs: ['public/**/*.{css,eot,svg,ttf,woff,woff2,js,html}'],
                minify: true,
                stripPrefix: 'public/',
                handleFetch: true,
                dynamicUrlToDependencies: {
                    '/': ['resources/views/welcome.blade.php'],
                },
                staticFileGlobsIgnorePatterns: [/\.map$/, /mix-manifest\.json$/, /manifest\.json$/, /service-worker\.js$/],
                navigateFallback: '/',
            })
        ]
    })
}

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
