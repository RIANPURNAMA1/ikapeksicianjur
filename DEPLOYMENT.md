# Dokumentasi Deployment di VPS (Tanpa Docker)

Panduan lengkap untuk men-deploy project **Ikapeksi Cianjur** ke VPS (Linux/Ubuntu)
**tanpa menggunakan Docker**, menggunakan stack tradisional:

| Komponen | Teknologi |
|----------|-----------|
| **Frontend** | Next.js 15 (App Router) — dijalankan dengan PM2 (`next start`) |
| **Backend** | Laravel 13 (PHP 8.3+) — dijalankan dengan PHP-FPM + Nginx |
| **Database** | MySQL / MariaDB (default pada `.env`) |
| **Web Server** | Nginx (reverse proxy + serve backend) |
| **Process Manager** | PM2 untuk frontend |

---

## 1. Arsitektur Deployment

```
                        Internet
                           │
                    ┌──────▼──────┐
                    │    Nginx    │  port 80/443 (domain.com)
                    └───┬─────┬───┘
                        │     │
          ┌─────────────▼┐   ┌▼──────────────────┐
          │   Frontend   │   │      Backend      │
          │  Next.js 15   │   │   Laravel 13 API  │
          │  PM2 :3000    │   │  PHP-FPM :9000    │
          └──────────────┘   └────────┬───────────┘
                                      │
                                 ┌────▼────┐
                                 │  MySQL  │  db_ikapeksi
                                 └─────────┘
```

- **Frontend** diakses publik di `https://domain.com`.
- **Backend API** diakses di `https://api.domain.com` (rute `api/*`).
- Frontend memanggil backend melalui variabel `NEXT_PUBLIC_API_BASE_URL`.

---

## 2. Prasyarat VPS

### 2.1 Spesifikasi Minimum
- OS: **Ubuntu 22.04 / 24.04 LTS** (atau Debian 12)
- RAM: **2 GB** (4 GB direkomendasikan)
- CPU: 1–2 core
- Disk: 20 GB + (termasuk storage upload)
- **Node.js v20 LTS** atau lebih baru (direkomendasikan v22 LTS)
- **PHP 8.3+**

### 2.2 Opsional disarankan
- Pointing 2 domain: `domain.com` dan `api.domain.com` (atau 1 domain dengan subfolder).
- Konfigurasi SSL (disarankan Let's Encrypt via Certbot).

---

## 3. Persiapan Awal Server (Ubuntu)

Login sebagai user dengan hak sudo, lalu update sistem:

```bash
sudo apt update && sudo apt upgrade -y
```

Install paket dasar:

```bash
sudo apt install -y git curl wget unzip nginx software-properties-common \
    build-essential sqlite3 mysql-server
```

> **Catatan:** Jika hanya ingin menggunakan **SQLite** (tanpa MySQL), skip instalasi
> `mysql-server` dan atur `DB_CONNECTION=sqlite` di `.env` backend.

---

## 4. Instalasi Node.js (untuk Frontend)

Menggunakan NodeSource (Node 22 LTS):

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

node -v   # pastikan >= 20
npm -v
```

Instal PM2 secara global:

```bash
sudo npm install -g pm2
```

---

## 5. Instalasi PHP + Ekstensi (untuk Backend)

```bash
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update

sudo apt install -y php8.3 php8.3-cli php8.3-fpm php8.3-mysql \
    php8.3-sqlite3 php8.3-mbstring php8.3-xml php8.3-curl php8.3-zip \
    php8.3-gd php8.3-intl php8.3-bcmath php8.3-redis

php -v   # pastikan 8.3.x
```

Instal Composer:

```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
composer --version
```

---

## 6. Persiapan Direktori Project

```bash
sudo mkdir -p /var/www/ikapeksi
sudo chown -R $USER:$USER /var/www/ikapeksi
cd /var/www/ikapeksi

# Clone repository
git clone <url-repository-anda> .
```

> Asumsikan struktur repo memiliki folder `backend/` dan `frontend/` seperti project ini.


---

## 7. Deployment Backend (Laravel)

### 7.1 Instalasi Dependensi

```bash
cd /var/www/ikapeksi/backend

# Instal dependensi PHP (production optimization)
composer install --no-dev --optimize-autoloader
```

### 7.2 Konfigurasi Environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit **`.env`** dengan pengaturan production:

```env
APP_NAME=IkapeksiCianjur
APP_ENV=production
APP_KEY=            # sudah terisi dari key:generate
APP_DEBUG=false
APP_URL=https://api.domain.com

# Sesuaikan dengan konfigurasi database Anda
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_ikapeksi
DB_USERNAME=ikapeksi_user
DB_PASSWORD=<password-kuat>

# CORS - izinkan origin frontend
CORS_ALLOWED_ORIGINS=https://domain.com

SESSION_DRIVER=database
SESSION_LIFETIME=120
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=local
```

> **Penting `CORS_ALLOWED_ORIGINS`:** nilai ini harus persis sama dengan origin
> frontend Anda (`https://domain.com`), tanpa trailing slash. File `config/cors.php`
> membaca nilai tersebut dan di-`explode` dengan koma (bisa diisi beberapa origin).


### 7.3 Siapkan Database MySQL

```bash
sudo mysql
```

Di dalam prompt MySQL:

```sql
CREATE DATABASE db_ikapeksi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ikapeksi_user'@'localhost' IDENTIFIED BY '<password-kuat>';
GRANT ALL PRIVILEGES ON db_ikapeksi.* TO 'ikapeksi_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

> **Alternatif SQLite** (opsional):
> ```bash
> touch /var/www/ikapeksi/backend/database/database.sqlite
> ```
> dan set `DB_CONNECTION=sqlite` di `.env`.

### 7.4 Migrasi + Seed

```bash
cd /var/www/ikapeksi/backend

# Jalankan migrasi
php artisan migrate --force

# (opsional) isi data awal
php artisan db:seed --force
```

**Buat user admin untuk login panel:** project ini menggunakan token API untuk
autentikasi admin. Pastikan Anda telah membuat user admin melalui seeder, atau
buat langsung di database:

```php
php artisan tinker
```

```php
use App\Models\User;
User::updateOrCreate(
    ['email' => 'admin@domain.com'],
    ['name' => 'Admin', 'password' => bcrypt('password-kuat')]
);
```

### 7.5 Storage Link + Permission

```bash
cd /var/www/ikapeksi/backend

# Buat symlink public/storage -> storage/app/public
php artisan storage:link

# Beri permission pada storage & bootstrap cache
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

> Folder `storage/app/public/uploads` otomatis terisi saat upload foto pada fitur
> berita/pengguna. Symlink `public/storage` memungkinkan file tersebut bisa diakses
> dari web.

### 7.6 Optimasi Cache Production

```bash
cd /var/www/ikapeksi/backend

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

> Gunakan perintah `php artisan optimize:clear` saat ingin menghapus semua cache
> (misal saat update kode).

### 7.7 Pastikan PHP-FPM Berjalan

```bash
sudo systemctl enable --now php8.3-fpm
sudo systemctl status php8.3-fpm
```


---

## 8. Deployment Frontend (Next.js)

### 8.1 Instalasi Dependensi

```bash
cd /var/www/ikapeksi/frontend
npm ci
```

> Gunakan `npm ci` untuk instalasi deterministic berdasarkan `package-lock.json`.

### 8.2 Konfigurasi Environment

Buat file `.env.production` (atau `.env`):

```env
# URL backend API. Wajib diisi dengan domain API production Anda.
# Tanpa trailing slash.
NEXT_PUBLIC_API_BASE_URL=https://api.domain.com
```

> File `next.config.ts` membaca variabel ini untuk menambahkan host API ke
> `remotePatterns` gambar. Nilai defaultnya `http://localhost:8000`, jadi **harus**
> diubah agar frontend bisa memuat gambar/upload dari backend.

### 8.3 Build + Jalankan dengan PM2

```bash
cd /var/www/ikapeksi/frontend

# Build production Next.js
npm run build

# Jalankan dengan PM2 (next start pada port 3000)
pm2 start "npm run start -- -p 3000" --name ikapeksi-frontend

# Auto-restart saat VPS reboot
pm2 startup
pm2 save
```

Verifikasi:

```bash
pm2 status
curl -I http://localhost:3000
```


---

## 9. Konfigurasi Nginx

### 9.1 Virtual Host Backend (`api.domain.com`)

Buat file `/etc/nginx/sites-available/backend`:

```nginx
server {
    listen 80;
    server_name api.domain.com;

    root /var/www/ikapeksi/backend/public;
    index index.php index.html;

    # Log
    access_log /var/log/nginx/ikapeksi-backend.access.log;
    error_log  /var/log/nginx/ikapeksi-backend.error.log;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # File statis kalau ada
    location ~* \.(js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?)$ {
        expires max;
        log_not_found off;
        access_log off;
    }

    # PHP-FPM
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Blokir file sensitif Laravel
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Aktifkan:

```bash
sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
```

### 9.2 Virtual Host Frontend (`domain.com`)

Buat file `/etc/nginx/sites-available/frontend`:

```nginx
server {
    listen 80;
    server_name domain.com www.domain.com;

    access_log /var/log/nginx/ikapeksi-frontend.access.log;
    error_log  /var/log/nginx/ikapeksi-frontend.error.log;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Batasi ukuran upload (foto berita/alumni)
    client_max_body_size 10M;
}
```

Aktifkan dan tes konfigurasi:

```bash
sudo ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```


---

## 10. SSL (HTTPS) dengan Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx

# Generate SSL untuk kedua domain
sudo certbot --nginx -d domain.com -d api.domain.com
```

Certbot otomatis mengubah konfigurasi Nginx menjadi HTTPS dan menambah redirect.
Cek auto-renewal:

```bash
sudo certbot renew --dry-run
```

Setelah SSL aktif, **perbarui** `.env` backend dan frontend agar menggunakan HTTPS:

- Backend: `APP_URL=https://api.domain.com`, `CORS_ALLOWED_ORIGINS=https://domain.com`
- Frontend: `NEXT_PUBLIC_API_BASE_URL=https://api.domain.com`

Lalu rebuild ulang frontend dan reload cache backend.

---

## 11. Uji Coba Deployment

### 11.1 Tes Backend
```bash
# Health check Laravel
curl -I https://api.domain.com/up

# Endpoint publik
curl https://api.domain.com/api/berita-publik
```

### 11.2 Tes Frontend
```bash
curl -I https://domain.com
# Buka https://domain.com/admin/login di browser
```

---

## 12. Proses Update (Deploy Revisi Baru)

### Backend
```bash
cd /var/www/ikapeksi/backend
git pull origin main

composer install --no-dev --optimize-autoloader   # jika ada dependency baru
php artisan migrate --force                        # jika ada migrasi baru

# Bersihkan & rebuild cache production
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Frontend
```bash
cd /var/www/ikapeksi/frontend
git pull origin main

npm ci                        # jika ada dependency baru
npm run build                 # rebuild

pm2 restart ikapeksi-frontend
```


---

## 13. Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Frontend tidak bisa memuat gambar dari backend | Pastikan `NEXT_PUBLIC_API_BASE_URL` benar & sudah rebuild. Cek `remotePatterns` di `next.config.ts`. |
| Error `419` / CORS saat login dari frontend | Perbarui `CORS_ALLOWED_ORIGINS` di `.env` backend dengan origin frontend yang tepat, lalu `php artisan config:cache`. |
| Error `Permission denied` pada storage | Jalankan: `sudo chown -R www-data:www-data storage bootstrap/cache` |
| Gambar upload 404 | Pastikan `php artisan storage:link` sudah dijalankan. |
| 502 Bad Gateway pada frontend | PM2 mati — jalankan `pm2 start` dan `pm2 save`. |
| 502 pada backend | PHP-FPM tidak jalan — cek `sudo systemctl status php8.3-fpm`. |
| `config:cache` memberi error saat update | Jalankan `php artisan optimize:clear` sebelum `config:cache`. |
| Perubahan `.env` tidak berefek | Karena cache config — jalankan `php artisan config:clear` lalu `config:cache`. |

### Cek log
```bash
# Frontend (PM2)
pm2 logs ikapeksi-frontend

# Backend (Laravel)
tail -f /var/www/ikapeksi/backend/storage/logs/laravel.log

# Nginx
tail -f /var/log/nginx/error.log
```

---

## 14. Keamanan Singkat

1. **Jangan pernah commit** `.env`, gunakan `.env.example`.
2. Set `APP_DEBUG=false` di production.
3. Gunakan password database yang kuat & user database khusus (bukan root).
4. Aktifkan HTTPS (Certbot).
5. Update berkala: `sudo apt update && sudo apt upgrade`.
6. Nonaktifkan akses langsung ke file sensitif di Nginx (sudah dicover di config backend).
7. Gunakan key baru di app key saat pindah server: `php artisan key:generate`.

---

## 15. Daftar Variabel Lingkungan Penting

### Backend (`backend/.env`)
| Variabel | Contoh | Keterangan |
|----------|--------|------------|
| `APP_ENV` | `production` | Mode aplikasi |
| `APP_DEBUG` | `false` | Debug di nonaktifkan |
| `APP_URL` | `https://api.domain.com` | URL publik backend |
| `DB_CONNECTION` | `mysql` / `sqlite` | Driver database |
| `DB_DATABASE` | `db_ikapeksi` | Nama database |
| `CORS_ALLOWED_ORIGINS` | `https://domain.com` | Origin frontend yang diizinkan |

### Frontend (`frontend/.env.production`)
| Variabel | Contoh | Keterangan |
|----------|--------|------------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://api.domain.com` | URL backend API (tanpa trailing slash) |

