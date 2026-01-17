# Kong API Gateway

Repository ini berisi konfigurasi Docker Compose untuk menjalankan Kong API Gateway beserta Konga Dashboard menggunakan PostgreSQL sebagai database dan environment variables (.env) agar mudah dikonfigurasi


## Arsitektur

```bash
 +-------------+        +----------------+
|   Konga UI  | <----> | Kong Admin API |
|   :1337     |        | :8001 / :8002  |
+-------------+        +----------------+
                               |
                               v
                       +----------------+
                       |  Kong Gateway  |
                       |  :8000 / :8443 |
                       +----------------+
                               |
                               v
                       +----------------+
                       |   PostgreSQL   |
                       |     :5432      |
                       +----------------+

```

## Requirement

- Docker ≥ 20.x
- Docker Compose ≥ v2
- Port yang tersedia:
    8000, 8001, 8002, 1337, 5432

## Struktur File
```bash
├── docker-compose.yml
├── .env
└── README.md
```

## Konfigurasi Environment (.env)

```bash
# POSTGRES
POSTGRES_USER=kong
POSTGRES_PASSWORD=kong
POSTGRES_DB=kong
POSTGRES_PORT=5432

# KONG DATABASE
KONG_DATABASE=postgres
KONG_PG_HOST=postgres
KONG_PG_USER=kong
KONG_PG_PASSWORD=kong
KONG_PG_DATABASE=kong

# KONG PORTS
KONG_PROXY_PORT=8000
KONG_PROXY_SSL_PORT=8443
KONG_ADMIN_API_PORT=8001
KONG_ADMIN_API_SSL_PORT=8444
KONG_ADMIN_GUI_PORT=8002

# KONG LISTEN
KONG_ADMIN_LISTEN=0.0.0.0:8001
KONG_ADMIN_GUI_LISTEN=0.0.0.0:8002

# KONGA
KONGA_PORT=1337
NODE_ENV=production
```

## Running Applikasi
```bash
docker compose up -d
docker compose ps
```

## Access Service

| Service         | URL                                            |
| --------------- | ---------------------------------------------- |
| Kong Proxy      | [http://localhost:8000](http://localhost:8000) |
| Kong Admin API  | [http://localhost:8001](http://localhost:8001) |
| Kong Admin GUI  | [http://localhost:8002](http://localhost:8002) |
| Konga Dashboard | [http://localhost:1337](http://localhost:1337) |


## Setup Awal Konga

- Buka http://localhost:1337
- Buat admin user
- Tambahkan koneksi Kong:
- Name: kong-local
- Kongg Admin URL: http://kong:8001


## Versi Image

- Kong: 3.5
- Konga: 0.14.9
- PostgreSQL: 13


## Catatan 

Struktur Service

- postgres → database untuk Kong & Konga
- kong-migrations → menjalankan migrasi database Kong (sekali jalan)
- kong → Kong API Gateway
- konga → UI dashboard untuk mengelola Kong

```bash
## Jangan expose Admin API & GUI

KONG_ADMIN_LISTEN=127.0.0.1:8001
KONG_ADMIN_GUI_LISTEN=127.0.0.1:8002
```

```bash
## Hapus jika Production

- "${KONG_ADMIN_API_PORT}:8001"
- "${KONG_ADMIN_API_SSL_PORT}:8444"
- "${KONG_ADMIN_GUI_PORT}:8002"
```