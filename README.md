# Belajar Vibe Coding — Scaffolding API

Backend RESTful API yang dibangun menggunakan **Bun**, **Elysia**, **Drizzle ORM**, dan **PostgreSQL**.

---

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Elysia](https://elysiajs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: PostgreSQL (driver `postgres`)
- **Language**: TypeScript

---

## 📁 Struktur Direktori

```text
src/
├── index.ts          # Entry point server Elysia
├── db/
│   ├── index.ts      # Koneksi client Drizzle ORM
│   └── schema.ts     # Definisi schema database (contoh tabel `users`)
└── routes/
    └── index.ts      # Definisi endpoint REST API
drizzle.config.ts     # Konfigurasi Drizzle Kit untuk migrasi
.env.example          # Variabel lingkungan template
.gitignore            # File pengecualian Git
package.json          # Script & dependensi
tsconfig.json         # Konfigurasi TypeScript
```

---

## 🚀 Memulai

### 1. Pasang Dependensi
Pastikan [Bun](https://bun.sh/) telah terpasang di sistem:
```bash
bun install
```

### 2. Konfigurasi Variabel Lingkungan
Salin `.env.example` ke `.env` dan sesuaikan koneksi database PostgreSQL Anda:
```bash
cp .env.example .env
```

### 3. Database Migration
Generate dan jalankan migrasi database:
```bash
bun run db:generate
bun run db:migrate
```

### 4. Jalankan Server
Mode development (hot reload):
```bash
bun run dev
```

Server akan aktif di `http://localhost:3000`.

---

## 📡 Endpoint API

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/` | Health-check server (`{"status":"ok"}`) |
| `GET` | `/users` | Mengambil seluruh daftar pengguna |
| `GET` | `/users/:id` | Mengambil detail pengguna berdasarkan ID |
| `POST` | `/users` | Membuat pengguna baru (body: `name`, `email`) |
| `PUT` | `/users/:id` | Memperbarui data pengguna |
| `DELETE` | `/users/:id` | Menghapus data pengguna |
