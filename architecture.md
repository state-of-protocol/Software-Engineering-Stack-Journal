---

## 5. Pelan Pengurusan Kemaskini

-   **Atomic Updates:** Menggunakan dual partition (A/B) untuk memastikan kemaskini selamat. Sistem akan boot ke partition B jika kemaskini di partition A gagal.
-   **Rollback Mechanism:** Pengguna boleh kembali ke versi OS sebelumnya jika menghadapi masalah.
-   **Containerized App Updates:** Aplikasi dikemaskini secara berasingan tanpa menjejaskan sistem teras.

---

## 6. Strategi Keselamatan

-   **Secure Boot:** Mengesahkan integriti kernel dan komponen sistem semasa proses boot.
-   **Memory Safety:** Penggunaan Rust secara meluas untuk mengelakkan *buffer overflows* dan *use-after-free*.
-   **Access Control:** Mekanisme pengasingan hak akses (sandboxing) untuk aplikasi dan perkhidmatan.
-   **Encryption:** Semua data sesi komunikasi dan konfigurasi sensitif disimpan dalam bentuk terenkripsi.

---

*Dokumen ini adalah hidup dan akan dikemas kini seiring dengan evolusi seni bina NEO OS.*
*Tarikh Cipta: [07 Mei 2026]*
*Kemaskini Terakhir: [DD Bulan YYYY]*
