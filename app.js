const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Menentukan folder penyimpanan untuk file yang diunggah
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Inisialisasi multer dengan konfigurasi penyimpanan
const upload = multer({ storage: storage });

// Menampilkan halaman beranda dengan formulir unggah
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Menangani permintaan unggah file
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File berhasil diunggah!');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
