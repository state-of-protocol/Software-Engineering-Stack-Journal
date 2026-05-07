# Tarikh: 08/05/2026
## Hari Pembangunan NEO OS Ke: 1 / 912
### Fokus Utama: Inisialisasi Projek, Repository & Persekitaran Pembangunan (Environment)

---

## ☀️ 1. Sesi Pagi

### Masa: [07:30 AM - 09:30 AM]
- **Objektif Awal:** Menubuhkan struktur repositori GitHub dan konfigurasi "Toolchain" Rust untuk pembangunan kernel.
- **Proses Kerja:**
  - [07:35 AM] Memulakan repositori Git baru dengan struktur modular (folder `/sys`, `/comm`, `/apps`).
  - [08:15 AM] Memasang target Rust `x86_64-unknown-none` untuk pembangunan *bare-metal*.
  - [09:00 AM] Menulis fail `Cargo.toml` utama dengan dependensi minimal.
- **Cabaran/Masalah Dihadapi:**
  - Ralat pada konfigurasi `rust-toolchain.toml`; versi compiler tidak stabil untuk target *none*.
- **AI Consultation:**
  - Prompt: "Target x86_64-unknown-none not found in current rustup channel. How to fix?"
  - Output AI: Disarankan menggunakan `rustup target add x86_64-unknown-none` dan beralih ke saluran *Nightly*.

---

### Masa: [09:30 AM - 12:30 PM]
- **Objektif Awal:** Menghasilkan fail `main.rs` minimal yang boleh dikompilasi tanpa ralat *linker*.
- **Proses Kerja:**
  - [10:00 AM] Menulis kod `#![no_std]` dan `#![no_main]` untuk mengelakkan library standard.
  - [11:15 AM] Mengimplementasi fungsi `panic_handler` asas.
  - [12:00 PM] Berjaya melakukan *compile* pertama melalui perintah `cargo build`.
- **Cabaran/Masalah Dihadapi:**
  - Linker ralat: "Undefined symbol: _start". Perlu definisikan titik masuk kernel.
- **AI Consultation:**
  - Prompt: "Explain linker requirement for _start in no_main Rust kernel."
  - Output AI: Memberikan struktur `#[no_mangle] pub extern "C" fn _start() -> ! { loop {} }`.

---

## 🌤️ 2. Sesi Petang

### Masa: [02:00 PM - 05:00 PM]
- **Objektif Awal:** Konfigurasi Emulator QEMU untuk memulakan ujian *boot* pertama.
- **Proses Kerja:**
  - [02:15 PM] Pemasangan QEMU di workstation Antigravity.
  - [03:30 PM] Menulis `Makefile` untuk memudahkan proses *Build & Run*.
  - [04:45 PM] Percubaan menjalankan kernel dalam QEMU.
- **Cabaran/Masalah Dihadapi:**
  - Emulator tersekat (stuck) pada skrin hitam. Tiada log output yang kelihatan.
- **AI Consultation:**
  - Prompt: "QEMU shows nothing for basic rust kernel. How to debug serial output?"
  - Output AI: Disarankan menggunakan driver `uart_16550` untuk cetak output ke konsol.

---

## 🌙 3. Sesi Malam

### Masa: [08:00 PM - 11:00 PM]
- **Objektif Awal:** Ringkasan log dan pengarkiban fail architecture.
- **Proses Kerja:**
  - [08:15 PM] Mengemaskini fail `architecture.md` dengan penemuan linker tadi.
  - [09:30 PM] Melakukan "self-review" pada kod hari pertama.
  - [10:30 PM] Menyiapkan entri `daily_task_day1.md` ini.
- **Cabaran/Masalah Dihadapi:**
  - Keletihan mental mula terasa selepas 8 jam mengadap ralat compiler.

---

## 📝 4. Ringkasan Hari Ini
- **Pencapaian Utama:** Struktur repositori siap, persekitaran Rust dikonfigurasi, dan *build* kernel pertama berjaya tanpa ralat library standard.
- **Fail Utama yang Digarap:** `Cargo.toml`, `src/main.rs`, `architecture.md`.
- **Baris Kod (LOC):** +45 LOC (Kod Kernel), +120 LOC (Dokumentasi).

---

## ✨ 5. Pengalaman, Pelajaran & Refleksi Diri
- **Pengalaman Baru:** Belajar betapa ketatnya kawalan Rust terhadap kod yang tiada Sistem Operasi asas (bare-metal).
- **Pelajaran:** Jangan sesekali meremehkan fasa setup. Walaupun nampak mudah, satu salah konfigurasi dalam `linker` boleh membuang masa berjam-jam.
- **Status Mental:** Teruja. Akhirnya idea NEO OS berpindah dari kertas ke dalam bentuk kod sebenar.

---

## ⚠️ 6. Kesilapan & Pencegahan Masa Hadapan
- **Kesilapan Berlaku:**
  1. Terlupa menambah `--target` flag dalam build, menyebabkan ralat kompilasi ke host OS.
  2. Menghabiskan masa terlalu lama cuba membaiki `stable` channel, sedangkan `nightly` diperlukan untuk fitur sistem tertentu.
- **Langkah Pencegahan:**
  1. Sentiasa definisikan `.cargo/config.toml` supaya target disetkan secara kekal.
  2. Mula dengan senarai keperluan (*requirement list*) fitur Rust sebelum memilih toolchain channel.

---
### **Perancangan Day 2:**
- **Objektif:** Implementasi driver UART minimal untuk mengeluarkan teks "NEO OS: System Active" pada konsol QEMU.
