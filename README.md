# ☪ TTS Interaktif — Khulafaur Rasyidin & Peradaban Islam

Teka-Teki Silang (TTS) interaktif berbasis web untuk pembelajaran sejarah dan peradaban Islam. Dirancang untuk mahasiswa, dapat diakses langsung dari browser HP atau laptop tanpa perlu instalasi.

## 🎮 Demo Langsung

👉 **https://USERNAME.github.io/tts-islam-interaktif/**

> Ganti `USERNAME` dengan username GitHub Anda setelah deploy.

## 📋 Konten

| Puzzle | Topik | Jumlah Kata |
|--------|-------|-------------|
| TTS I | Khulafaur Rasyidin: Politik, Hukum, Militer & Ekonomi | 40 kata |
| TTS II | Peradaban Islam: Ilmu Pengetahuan, Seni & Arsitektur | 30 kata |
| **Total** | **70 istilah unik** | |

## ✨ Fitur

- ⏱ **Timer otomatis** — waktu pengerjaan tercatat sejak mulai
- 🏆 **Skor otomatis** — panjang kata × 10 poin
- 💡 **Sistem Hint** — buka 1 huruf per klik (penalti -50% skor kata)
- ✓ **Cek per kata** — hijau = benar, merah = salah, langsung per kata
- 📱 **Responsif** — optimal di HP, tablet, dan laptop
- 🖨 **Versi cetak** — file DOCX hemat tinta tersedia (lihat `/print/`)
- ⌨️ **Auto-advance** — kursor otomatis maju ke huruf berikutnya
- ⬅️ **Backspace smart** — kembali ke huruf sebelumnya

## 🚀 Deploy ke GitHub Pages

### Cara Cepat (3 menit):

1. **Buat repository baru** di GitHub
2. **Upload folder `docs/`** ke repository
3. **Aktifkan GitHub Pages:**
   - Buka **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** → folder **/docs**
   - Klik **Save**
4. Tunggu 1-2 menit, akses di `https://USERNAME.github.io/REPO-NAME/`

### Cara Terminal:

```bash
git init
git add .
git commit -m "Initial commit - TTS Interaktif"
git branch -M main
git remote add origin https://github.com/USERNAME/tts-islam-interaktif.git
git push -u origin main
```

Lalu aktifkan GitHub Pages di Settings → Pages → Branch: main → /docs.

## 📁 Struktur File

```
tts-islam-interaktif/
├── README.md              ← Dokumentasi ini
├── docs/
│   └── index.html         ← Aplikasi web (single file, siap deploy)
└── print/
    ├── tts_cetak_qr.docx  ← Lembar kerja cetak + area QR
    ├── tts_hemat_tinta.docx ← Versi hemat tinta
    └── panduan_tts.docx   ← Panduan penggunaan lengkap
```

## 🖨 Versi Cetak

Folder `/print/` berisi file DOCX untuk dicetak dan dibagikan ke mahasiswa:

- **tts_cetak_qr.docx** — 3 halaman: 2 lembar soal + 1 kunci jawaban, dengan area QR code
- **tts_hemat_tinta.docx** — Versi ultra-hemat tinta (blok abu-abu muda)
- **panduan_tts.docx** — Panduan lengkap untuk dosen dan mahasiswa

## 📱 Membuat QR Code

Setelah deploy, buat QR code dari URL GitHub Pages Anda:

1. Buka [qr-code-generator.com](https://www.qr-code-generator.com/) atau site sejenis
2. Masukkan URL: `https://USERNAME.github.io/tts-islam-interaktif/`
3. Download QR code
4. Tempelkan pada lembar cetak DOCX (ganti placeholder)

## 🛠 Kustomisasi

### Mengganti Kata/Soal

Edit variabel `RAW` di dalam `docs/index.html`. Format data:

```javascript
[nomor, "KATA", "Petunjuk/clue", baris, kolom, 1=mendatar/0=menurun]
```

### Mengganti Tema Warna

Aplikasi menggunakan Tailwind CSS. Ganti class warna (`stone-`, `sky-`, `emerald-`) sesuai preferensi.

## 📄 Lisensi

Bebas digunakan untuk keperluan pendidikan. Dibuat dengan Claude AI.
