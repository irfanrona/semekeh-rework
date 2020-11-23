<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'SMK BPI') }}</title>

    @foreach ($data as $a)
<meta {{ $a->type === 'og' ? 'property' : ($a->type === 'google' ? 'itemprop' : 'name') }}="{{ ($a->type ? ($a->type === 'google' ? '' : $a->type.':') : '').$a->key }}" content="{{ $a->value }}">
    @endforeach

    <link rel="manifest" href="{{ asset('manifest.json') }}">
    <link rel="apple-touch-icon" href="{{ asset('img/icon-144.png') }}">
    <link rel="shortcut icon" href="{{ asset('img/icon-144.png') }}">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <script src="{{ asset('js/app.js') }}" defer></script>
</head>
<body>
    <noscript>{{ __('label.noscript', ['app' => config('app.name', 'SMK BPI')]) }}</noscript>
    <div id="app"></div>
</body>
</html>
