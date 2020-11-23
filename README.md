# Requirements
- [Composer](https://getcomposer.org/download) >= 1.7.2
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/current) >= 14.7.0
- [Visual Code](https://code.visualstudio.com/download) *optional*
- [XAMPP](https://www.apachefriends.org/download.html) >= 3.2.4
- PHP >= 7.3
- Mysql >= 15.1 Distrib 10.4.11-MariaDB

# Installation local
### PHP Config
open `php.ini` at `XAMPP\php\php.ini`
find and edit with these:
```
memory_limit=-1
upload_max_filesize=1000M
post_max_size=1000M
```

### Google Recaptcha
Recaptcha key and secret key can be obtained at [Google Recaptcha](https://www.google.com/recaptcha/admin)
- Recaptcha version 2
- domain `localhost` and `127.0.0.1`

### Install
- Clone the project `git clone https://github.com/AnOrdinaryPeople/semekeh-rework.git`
- Duplicate environment `cp .env.example .env`
- Set up environment
  - DB_DATABASE = `db_smk_rework`
  - RECAPTCHA_SITE_KEY = `YOUR_RECAPTCHA_SITE_KEY`
  - RECAPTCHA_SECRET = `YOUR_RECAPTCHA_SECRET_KEY`
- Install composer `composer install`
- Install node.js `npm install && npm run dev`
- Generate key `php artisan key:generate`
- Create storage `php artisan storage:link`
- Run the server `php artisan serve`
- Open new terminal then migrate and seed `php artisan migrate --seed`

# Credentials
- super@smkbpi.sch.id 12345678
- admin@smkbpi.sch.id 12345678
