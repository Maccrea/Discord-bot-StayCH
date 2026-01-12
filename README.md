# 🤖 StayCH - Discord Voice Stay Bot

**StayCH** adalah bot Discord sederhana dan ringan yang dirancang untuk masuk dan "menetap" di dalam Voice Channel (VC). Bot ini berguna untuk membuat server terlihat ramai, menemani user, atau sekadar menjaga agar room tidak kosong.

Dibuat menggunakan **Discord.js v14** dan **@discordjs/voice**.

---

## ✨ Fitur Utama

* **🚀 Perintah Simpel**: Cukup ketik `!masuk` atau `!keluar`.
* **🎯 Target Fleksibel**: Bisa masuk ke room tempat kamu berada, ATAU masuk ke room tertentu menggunakan ID.
* **🛡️ Anti-Crash**: Dilengkapi dengan *uncaughtException handler* agar bot tidak mati total jika ada error kecil.
* **🔊 Status Aktif**: Bot bergabung tanpa status "Deafen" atau "Mute" (bisa diubah di codingan).

---

## 📋 Daftar Perintah (Commands)

Prefix default adalah `!`

| Perintah | Alias | Fungsi |
| :--- | :--- | :--- |
| `!masuk` | `!join` | Memasukkan bot ke Voice Channel tempat kamu berada saat ini. |
| `!masuk <ID>` | `!join <ID>` | Memasukkan bot ke Voice Channel spesifik berdasarkan ID Channel. |
| `!keluar` | `!leave` | Menyuruh bot keluar/disconnect dari Voice Channel. |

**Contoh Penggunaan:**
* `!masuk` (Kamu harus ada di VC dulu)
* `!masuk 123456789012345` (Bot akan masuk ke channel ID tersebut)

---

## 🛠️ Instalasi & Cara Pakai

Ikuti langkah ini untuk menjalankannya di komputer atau VPS kamu.

### 1. Persiapan (Prerequisites)
* **Node.js** (Versi 16.9.0 ke atas).
* **Bot Token** (Dari Discord Developer Portal).

### 2. Clone Repository
```bash
git clone https://github.com/username-kamu/StayCH.git
cd StayCH
```

### 3. Install Dependencies
Bot ini membutuhkan library `discord.js`, voice adapter, dan library enkripsi suara (`libsodium`).

```bash
npm install discord.js @discordjs/voice dotenv libsodium-wrappers
```

### 4. Konfigurasi Token
Buat file baru bernama `.env` di folder proyek kamu. Isi dengan token bot kamu:

```env
TOKEN=masukkan_token_bot_disini_tanpa_spasi
```

### 5. Jalankan Bot
```bash
node index.js
```

Jika berhasil, akan muncul pesan di terminal:
```text
✅ BOT ONLINE: StayCH#1234
👉 Cara pakai:
   1. !masuk (Bot masuk ke room kamu)
   ...
```

---

## ⚠️ Troubleshooting

**Q: Bot masuk tapi langsung keluar lagi?**
A: Pastikan kamu sudah menginstall `libsodium-wrappers` atau `sodium-native`. Discord Voice butuh library enkripsi ini.
`npm install libsodium-wrappers`

**Q: Bot tidak merespon perintah?**
A:
1. Pastikan Bot sudah on (online).
2. Cek **Privileged Gateway Intents** di Discord Developer Portal. Pastikan **"Message Content Intent"** sudah dicentang (ON).
3. Pastikan bot punya izin **View Channel** dan **Connect** di server Discord.

---

## 📜 License
Project ini open-source. Bebas digunakan dan dimodifikasi