# ☪ TTS Interaktif — Khulafaur Rasyidin & Peradaban Islam

Teka-Teki Silang (TTS) interaktif berbasis web untuk pembelajaran sejarah dan peradaban Islam. Dilengkapi input nama mahasiswa, penyimpanan skor ke Google Sheets, dan papan skor (leaderboard).

## 🎮 Demo Langsung

👉 **https://saidul2017.github.io/tts-islam-interaktif/**

## 📋 Konten

| Puzzle | Topik | Jumlah Kata |
|--------|-------|-------------|
| TTS I | Khulafaur Rasyidin: Politik, Hukum, Militer & Ekonomi | 40 kata |
| TTS II | Peradaban Islam: Ilmu Pengetahuan, Seni & Arsitektur | 30 kata |
| **Total** | **70 istilah unik** | |

## ✨ Fitur

- 👤 **Input Nama & NIM** — identitas mahasiswa tersimpan selama sesi
- 📊 **Simpan Skor ke Google Sheets** — otomatis via Google Apps Script
- 🏆 **Papan Skor (Leaderboard)** — peringkat per puzzle, real-time
- ⏱ **Timer** — otomatis berjalan, bisa di-pause (⏸)
- 🏆 **Skor otomatis** — panjang kata × 10 poin
- 💡 **Sistem Hint** — buka 1 huruf per klik (penalti −50%)
- ✓ **Cek per kata** — hijau = benar, merah = salah
- 🔄 **Toggle arah** — ketuk sel yang sama di perpotongan untuk ganti arah
- 📱 **Responsif** — optimal di HP, tablet, dan laptop
- 🔒 **Anti-curang** — jawaban di-encode ROT13

---

## 🔧 Setup Google Sheets (Wajib untuk Simpan Skor)

### Langkah 1: Buat Spreadsheet

1. Buka **https://sheets.google.com**
2. Klik **Blank spreadsheet** (spreadsheet kosong)
3. Beri nama: `Skor TTS Islam`
4. Rename tab sheet menjadi **Skor** (klik kanan tab "Sheet1" → Rename)
5. Isi header di **baris 1**:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Nama | NIM | Puzzle | Skor | Waktu | Hint | Total Kata | Kata Benar |

### Langkah 2: Buat Apps Script

1. Di spreadsheet, klik **Extensions → Apps Script**
2. Hapus semua kode default
3. Salin & tempel seluruh isi file **`apps-script/Code.gs`** dari folder ini
4. Klik 💾 **Save** (Ctrl+S)

### Langkah 3: Deploy sebagai Web App

1. Klik **Deploy → New deployment**
2. Klik ⚙️ icon → pilih **Web app**
3. Isi:
   - **Description**: `TTS Skor API`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Klik **Deploy**
5. Klik **Authorize access** → pilih akun Google Anda
6. Jika muncul "Google hasn't verified this app":
   - Klik **Advanced** → **Go to TTS Skor API (unsafe)**
   - Klik **Allow**
7. **Copy URL** yang muncul (seperti: `https://script.google.com/macros/s/AKfycbx.../exec`)

### Langkah 4: Pasang URL di Aplikasi

1. Buka file **`docs/index.html`**
2. Cari baris (sekitar baris 18):
   ```javascript
   const SCRIPT_URL = "";
   ```
3. Tempel URL dari langkah 3:
   ```javascript
   const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
   ```
4. Simpan file

### Langkah 5: Test

1. Buka `index.html` di browser
2. Isi nama → pilih puzzle → selesaikan → klik **Simpan Skor**
3. Cek spreadsheet — data harus muncul di baris baru
4. Klik **🏆 Papan Skor** — leaderboard harus tampil

> ⚠️ **Catatan**: Jika URL tidak diisi (`SCRIPT_URL = ""`), aplikasi tetap berjalan normal dalam **mode offline** — skor tidak disimpan ke cloud.

---

## 🚀 Deploy ke GitHub Pages

### Cara Cepat (3 menit):

1. **Buat repository baru** di GitHub
2. **Upload semua file** (docs/, README.md, .gitignore)
3. **Aktifkan GitHub Pages:**
   - Buka **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** → folder **/docs**
   - Klik **Save**
4. Tunggu 1-2 menit, akses di `https://saidul2017.github.io/tts-islam-interaktif/`

### Cara Terminal:

```bash
git init
git add .
git commit -m "Initial commit - TTS Interaktif v2.1"
git branch -M main
git remote add origin https://github.com/saidul2017/tts-islam-interaktif.git
git push -u origin main
```

---

## 📁 Struktur File

```
tts-islam-interaktif/
├── README.md                  ← Dokumentasi ini
├── .gitignore
├── apps-script/
│   └── Code.gs                ← Kode Google Apps Script (copy ke spreadsheet)
├── docs/
│   └── index.html             ← Aplikasi web (single file, siap deploy)
└── print/
    ├── tts_cetak_qr.docx      ← Lembar kerja cetak + area QR
    ├── tts_hemat_tinta.docx   ← Versi hemat tinta
    └── panduan_tts.docx       ← Panduan penggunaan lengkap
```

## 📊 Data yang Tersimpan di Google Sheets

Setiap kali mahasiswa klik "Simpan Skor":

| Kolom | Isi | Contoh |
|-------|-----|--------|
| Timestamp | Waktu pengiriman | 2026-03-02 10:30:00 |
| Nama | Nama lengkap | Ahmad Fauzi |
| NIM | Nomor induk | 2024010123 |
| Puzzle | TTS mana | TTS I |
| Skor | Total poin | 350 |
| Waktu | Durasi pengerjaan | 12:45 |
| Hint | Jumlah hint dipakai | 3 |
| Total Kata | Kata dalam puzzle | 40 |
| Kata Benar | Kata yang terjawab | 40 |

## 🖨 Versi Cetak

Folder `/print/` berisi file DOCX:

- **tts_cetak_qr.docx** — Lembar soal + area QR code
- **tts_hemat_tinta.docx** — Versi hemat tinta
- **panduan_tts.docx** — Panduan penggunaan lengkap

## 📱 Membuat QR Code

1. Buka [qr-code-generator.com](https://www.qr-code-generator.com/)
2. Masukkan URL GitHub Pages Anda
3. Download QR → tempel di file DOCX cetak

## 🛠 Kustomisasi

### Mengganti Kata/Soal

Edit variabel `ENC` di `docs/index.html`. Kata dalam format ROT13:
```
A↔N  B↔O  C↔P  D↔Q  E↔R  F↔S  G↔T  H↔U  I↔V  J↔W  K↔X  L↔Y  M↔Z
```

Format: `[nomor, "KATA_ROT13", "Petunjuk", baris, kolom, 1=mendatar/0=menurun]`

## 📄 Lisensi

Bebas digunakan untuk keperluan pendidikan.
