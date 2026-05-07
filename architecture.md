# ARCHITECTURE.md – Seni Bina Penuh NEO OS

**Versi:** 1.0.0  
**Tarikh:** 08 Mei 2026  
**Status:** Blueprint (Peringkat Reka Bentuk)  
**Repositori:** [NEO OS](https://github.com/username/neo-os)

---

## 1. Visi & Misi

NEO OS adalah sistem operasi sumber terbuka yang dibina dari awal dengan fokus kepada **kedaulatan digital**, **komunikasi bersatu**, **reka bentuk modular**, dan **kesejahteraan pengguna**. Ia bukan sekadar OS, tetapi sebuah ekosistem lengkap yang merangkumi ekonomi, pendidikan, budaya, dan gaya hidup lestari.

**Misi:**  
Mencipta platform digital bebas yang selamat, cekap, mesra pengguna, dan lestari, dimiliki sepenuhnya oleh komuniti, tanpa kebergantungan kepada gergasi teknologi sedia ada.

---

## 2. Prinsip Reka Bentuk

| Prinsip | Penerangan |
|---|---|
| **Zero‑Ralat** | Tegas menggunakan Rust & Zig untuk menghapuskan pepijat memori dan memastikan kestabilan tinggi. |
| **Portable Modular System** | OS boleh but dari pemacu kilat (Live USB), berjalan di RAM, bebas perkakasan. |
| **Immutable Core** | Fail teras sistem bersifat baca sahaja (`/sys`) untuk keselamatan. |
| **Atomic Updates** | Kemas kini menggunakan A/B partition; jika gagal, kembali ke versi sebelumnya. |
| **Aplikasi Berkontena** | Setiap aplikasi membawa kebergantungan sendiri, tiada konflik. |
| **Ketelusan Radikal** | Semua proses sistem direkod, ralat dilapor dengan jelas, tiada sorokan. |
| **Kesejahteraan Holistik** | Mod Zen, pengurusan tekanan, dan insentif gaya hidup sihat. |

---

## 3. Seni Bina Sistem

### 3.1 Lapisan Teknologi (Stack)

| Lapisan | Komponen | Bahasa / Teknologi |
|---|---|---|
| **Bootloader** | Pemuat but UEFI/BIOS | Zig, Assembly |
| **Kernel** | Mikrokernel atau Hibrid | Rust (dengan sedikit Zig untuk pemacu) |
| **Peranti & Pemacu** | Rangka Kerja Pemacu Ruang Pengguna | Rust, Zig |
| **Daemon Komunikasi** | Jambatan mesej ke Telegram, WhatsApp, dll. | Go, Elixir |
| **Pelayan Paparan** | Kompositor Wayland | Rust, C |
| **Enjin UI** | Antara muka terapung (Floating UI) | Node.js/React, WebGPU |
| **Perpustakaan Sistem** | Pustaka asas (libc, dll.) | Rust (`relibc`), C |
| **Rantai Alat** | Kompiler, pemaut | Rust, Zig, LLVM |

### 3.2 Hierarki Sistem Fail

```
/ (Root)
├── sys/                # Teras Sistem (Baca Sahaja)
│   ├── kernel/         # Imej kernel dan modul
│   ├── bin/            # Binari sistem kritikal
│   └── lib/            # Pustaka asas
├── comm/               # Enjin Komunikasi
│   ├── bridge/         # API ke Telegram, WhatsApp, X
│   ├── daemons/        # Perkhidmatan latar sesi
│   └── vault/          # Token sesi tersulit
├── apps/               # Aplikasi (format bundle .neo)
│   ├── system/         # Pelayar, Terminal, Tetapan
│   └── user/           # Aplikasi pengguna
├── cfg/                # Fail Konfigurasi
│   ├── os/             # Sistem (YAML/JSON)
│   ├── user/           # Tetapan pengguna
│   └── comm/           # Tetapan komunikasi
├── user/               # Data Peribadi
│   ├── home/           # Dokumen, Media
│   └── cache/          # Fail sementara
├── dev/                # Akses peranti
├── mnt/                # Pelekap luaran
└── tmp/                # Sistem fail meruap (RAM)
```

---

## 4. Ekosistem Digital (The 10 Pillars)

NEO OS melangkaui OS tradisional dengan ekosistem bersepadu yang dipanggil **10 Tunggak**:

### Tunggak 1: **NEO Circle** – Forum Komuniti
Platform bersatu gaya GitHub Issues + Reddit + Discord + Facebook.  
**Teknologi:** Next.js + Vercel + Supabase Realtime.  
**Ciri:** Undian, Komen bersarang, Sembang masa nyata, Suapan sosial.

### Tunggak 2: **NEO Hub** – Kedai Aplikasi
Pasaran aplikasi format `.neo`.  
**Backend:** Go API Server, metadata di Vercel Postgres.  
**Keselamatan:** Tandatangan digital disahkan oleh servis Rust.

### Tunggak 3: **NEO ID** – Identiti & Awan
Sistem Log Masuk Tunggal (SSO) untuk seluruh ekosistem.  
**Auth:** Elixir (fault-tolerant) + Go API Gateway.  
**Storan Peribadi:** NEO Drive (Rust/Zig) disertakan.

### Tunggak 4: **NEO Docs** – Dokumentasi Pembangun
Dokumentasi interaktif menggunakan Next.js MDX.  
**Kandungan:** Panduan, API Reference, SDK, tutorial NL.

### Tunggak 5: **NEO Arts** – Pasaran Aset Digital
Tempat jual beli aset digital (gambar, video, tema, kemahiran).  
**Storan:** Vercel Blob / NEO Drive.  
**Perlindungan:** Aset premium disulitkan; lesen automatik.

### Tunggak 6: **NEO Pay** – Sistem Pembayaran
Mata wang digital **NEO Coin** + integrasi fiat (Stripe).  
**Ledger:** Rust (double-entry accounting).  
**Escrow:** Dana ditahan sehingga pembeli sahkan penerimaan.

### Tunggak 7: **NEO ERC** – Education & Research Center
Pendidikan mikro, penyelidikan terbuka, mentor-mentee.  
**Platform:** NEO Learn (Next.js MDX mikro kursus), NEO Journal, NEO Mentor (Go).  
**Prinsip:** Tanpa tekanan, kos rendah, kualiti tinggi, sokongan mental.

### Tunggak 8: **NEO Culture** – Budaya & Identiti
Nilai teras: Ketelusan, Kecekapan, Kesejahteraan, Keterangkuman.  
**Manifestasi:** NEO Fest, Anugerah Nilai, Kapsul Masa, Gerakan Seni NEO.

### Tunggak 9: **NEO Cycle** – Gaya Hidup Sihat & Mobiliti
Basikal modular, aplikasi NEO Ride, stesen cas kinetik/solar.  
**Integrasi:** Penjejakan automatik, ganjaran NEO Coin, laluan selamat.

### Tunggak 10: **NEO Urban Living** – Kehidupan Bandar Efisyen
Konsep rumah/pejabat modular, inventori digital, perancang makanan.  
**Integrasi:** Dashboard NEO Home, mod Zen, pemantauan tenaga.

---

## 5. Bahasa Pengaturcaraan NEO (NL)

**NL (NEO Language)** adalah bahasa pengaturcaraan sistem rasmi bagi NEO OS, direka dengan falsafah selamat, ringkas, dan berdaulat.

| Aspek | Penerangan |
|---|---|
| **Paradigma** | Imperatif, Funkysional, Konkuren |
| **Jenis** | Statik, Inferens |
| **Pengurusan Ingatan** | Pemilikan (Ownership) + Arena |
| **Backend Kompiler** | LLVM (melalui Rust) |
| **Host Bootstrap** | Rust |
| **Sambungan Fail** | `.nl` |
| **Status** | Fasa 1: Lexer & Parser (dalam pembangunan) |

**Pelan Pembangunan NL:**  
1. Fasa 1: Interpreter tree-walk (Rust).  
2. Fasa 2: Native compiler via LLVM.  
3. Fasa 3: Self-hosted compiler (tulis kompiler NL dalam NL).  
4. Fasa 4: Ekosistem (LSP, pengurus pakej).

---

## 6. Strategi Pembangunan (2.5 Tahun)

### 6.1 Jadual Harian
- **Isnin–Jumaat:** Mencipta 1 fail sehari dengan bantuan AI (Prompt Killer).  
- **Hari ke-6 (Sabtu):** Ujian fungsi, cari pepijat, rekod dalam `debug.md`.  
- **Ahad:** Rehat / Refleksi / `daily-task.md`.

### 6.2 Pelan Induk

| Fasa | Tempoh | Fokus Utama |
|---|---|---|
| **Fasa 1: Asas** | Bulan 1–6 | Kernel asas (Rust), boot dari USB, struktur fail, terminal |
| **Fasa 2: Komunikasi** | Bulan 7–12 | Messaging Daemon (Go/Elixir), UI terapung (Node.js), Wayland |
| **Fasa 3: Platform Web** | Bulan 13–18 | NEO Circle, NEO ID, NEO Pay, NEO Arts (Next.js/Vercel) |
| **Fasa 4: Pendidikan & Budaya** | Bulan 19–24 | NEO ERC, NEO Docs, NL bootstrapping |
| **Fasa 5: Gaya Hidup & Kemuncak** | Bulan 25–30 | NEO Cycle, NEO Urban Living, penggilapan, pelancaran 1.0 |

### 6.3 Alatan & Persekitaran
- **IDE:** VS Code / Antigravity (AI-native).  
- **Kawalan Versi:** Git + GitHub.  
- **CI/CD:** Vercel (untuk platform web).  
- **AI:** Claude, Gemini, DeepSeek sebagai rakan kongsi pembangunan.

---

## 7. Perbandingan dengan OS Sedia Ada

| Ciri | Windows 11 | macOS | Ubuntu | NEO OS |
|---|---|---|---|---|
| **Kernel** | NT (C/C++) | XNU (C/Swift) | Linux (C) | Rust/Zig |
| **UI** | C++/WinRT | SwiftUI | GNOME (JS/C) | Node.js/React (Floating) |
| **Keselamatan** | Sederhana | Tinggi (SIP) | Tinggi | Sangat Tinggi (Immutable, Safe langs) |
| **Kemas Kini** | Sering bermasalah | Lancar | Boleh dipercayai | Atomic, kebal gagal |
| **Ekosistem** | Aplikasi .exe | App Store | Repo Pakej | 10 Tunggak Bersepadu |
| **Fokus** | Umum | Pengalaman Premium | Pelayan & Desktop | Kedaulatan & Komunikasi |

---

## 8. Penutup

NEO OS bukan sekadar projek teknikal; ia adalah manifesto untuk masa depan digital yang lebih adil, telus, dan lestari. Setiap baris kod, setiap modul, dan setiap tunggak direka untuk memupuk kreativiti, kesejahteraan, dan kedaulatan pengguna.

> *“Kami membina bukan sahaja sistem operasi, tetapi sebuah tamadun digital yang meletakkan manusia sebagai teras.”*

**Langkah Seterusnya:**  
- Sediakan repositori GitHub (`neo-os`) dan fail `daily-task.md` pertama.  
- Mulakan Fasa 1 dengan membina kernel Rust minima yang boleh mencetak “NEO OS Active” ke skrin.

--- 
*Dokumen ini akan dikemas kini seiring kemajuan pembangunan.*
