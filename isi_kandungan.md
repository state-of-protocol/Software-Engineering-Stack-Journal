# 📘 Isi Kandungan Jurnal Pembangunan NEO OS

Selamat datang ke Jurnal Pembangunan NEO OS! Dokumen ini mengandungi indeks semua catatan harian, laporan debug, dan arkitektur projek.

---

## 📅 Log Harian Pembangunan (`daily_task_dayN.md`)

Setiap entri harian merekodkan proses, cabaran, kesilapan, dan pelajaran yang diperoleh sepanjang pembangunan NEO OS.

- **Fasa 1: Boot & Kernel Core (Anggaran Hari 1 - 20)**
    - [Hari 1: Pengenalan Projek & Persediaan Awal](daily_task_day1.md)
    - [Hari 2: Penulisan Bootloader Minimal (Stage 1)](daily_task_day2.md)
    - [Hari 3: Inisialisasi CPU & Mod 64-bit](daily_task_day3.md)
    - [Hari 4: Pengurusan Memori Asas (Frame Allocator)](daily_task_day4.md)
    - [Hari 5: Implementasi Stack Canary](daily_task_day5.md)
    - [Hari 6: Laporan Debug & Ujian Fasa 1 Minggu 1](debug_week1.md)
    - ... (Tambahkan pautan mengikut perkembangan harian anda)
    - [Hari 20: Kernel Core Stabil: Milestone 1 Tercapai](daily_task_day20.md)

- **Fasa 2: Drivers & HAL (Anggaran Hari 21 - 45)**
    - [Hari 21: Pemacu Papan Kekunci Asas](daily_task_day21.md)
    - [Hari 22: Pengendalian Paparan (Frame-buffer/VGA)](daily_task_day22.md)
    - ... (Teruskan mengikut hari pembangunan)
    - [Hari 45: Drivers Asas Lengkap](daily_task_day45.md)

- **Fasa 3: System Services (Anggaran Hari 46 - 65)**
    - [Hari 46: Pengurus Proses & Penjadual (Scheduler)](daily_task_day46.md)
    - [Hari 47: Sistem Fail Maya (VFS) Asas](daily_task_day47.md)
    - ... (Teruskan mengikut hari pembangunan)
    - [Hari 65: Sistem Servis Utama Aktif](daily_task_day65.md)

- **Fasa 4: Messaging Daemon (Anggaran Hari 66 - 80)**
    - [Hari 66: Persediaan Go/Elixir Backend](daily_task_day66.md)
    - [Hari 67: Integrasi API Telegram Asas](daily_task_day67.md)
    - ... (Teruskan mengikut hari pembangunan)
    - [Hari 80: Messaging Daemon Fungsi Penuh](daily_task_day80.md)

- **Fasa 5: UI Engine & Compositor (Anggaran Hari 81 - 100)**
    - [Hari 81: Wayland Compositor Asas](daily_task_day81.md)
    - [Hari 82: Implementasi Tetingkap Terapung (Floating Window)](daily_task_day82.md)
    - ... (Teruskan mengikut hari pembangunan)
    - [Hari 100: UI Glassmorphism Aktif](daily_task_day100.md)

- **Fasa 6: Onboarding & Userland (Anggaran Hari 101 - 115)**
    - [Hari 101: Reka Bentuk Installer Interaktif](daily_task_day101.md)
    - [Hari 102: Aplikasi Tetapan (Settings App) Awal](daily_task_day102.md)
    - ... (Teruskan mengikut hari pembangunan)
    - [Hari 115: NEO OS Versi 1.0 Sedia](daily_task_day115.md)

---

## 🐞 **Laporan Debug & Audit (`debug_weekN.md`)**

Dokumen ini merekodkan hasil ujian mingguan, pepijat yang dikesan, dan langkah-langkah pembetulan.

- [Laporan Debug Minggu 1](debug_week1.md)
- [Laporan Debug Minggu 2](debug_week2.md)
- ... (Sediakan satu fail debug untuk setiap minggu)
- [Laporan Debug Minggu 130 (Akhir Projek)](debug_week130.md)

---

## ⚙️ **Dokumentasi Arkitektur (`architecture.md`)**

Seni bina terperinci bagi komponen-komponen utama NEO OS.

- [Ikhtisar Sistem Keseluruhan](architecture.md#ikhtisar-sistem-keseluruhan)
- [Seni Bina Kernel (NEO Core)](architecture.md#seni-bina-kernel)
- [Lapisan Komunikasi (Messaging Daemon)](architecture.md#lapisan-komunikasi)
- [Reka Bentuk UI/UX dan Compositor](architecture.md#reka-bentuk-ui/ux)
- [Struktur Fail NEO OS](architecture.md#struktur-fail-neo-os)

---

## 📜 **Manifesto Projek & Visi (`manifesto_awal.md`)**

Dokumen ini mengandungi visi asal, falsafah kejuruteraan, dan matlamat jangka panjang untuk NEO OS.

- [Pengenalan kepada NEO OS](manifesto_awal.md#pengenalan-kepada-neo-os)
- [Falsafah Zero-Ralat](manifesto_awal.md#falsafah-zero-ralat)
- [Matlamat Profesional & Sijil](manifesto_awal.md#matlamat-profesional)
- [Anggaran Garis Masa Projek](manifesto_awal.md#anggaran-garis-masa)

---

## 📚 **Arkib Perbualan & Rujukan (`archives/`)**

Kompilasi perbincangan penting yang menjadi asas kepada perancangan NEO OS.

- [Perbincangan Awal: Falsafah & Stack (2026-05-07)](archives/2026-05-07_Philosophical_Foundations.md)
- [Perbincangan Lanjut: UI/UX & Ketelusan (2026-05-08)](archives/2026-05-08_UIUX_Transparency.md)
- ... (Tambah fail perbincangan penting yang lain)

---

*Jurnal ini akan terus berkembang seiring dengan pembangunan NEO OS. Kemaskini terakhir: [DD Bulan YYYY].*
