const express = require('express');
const router = express.Router();
const bukuController = require('../controllers/bukuController');

// GET /buku -> Menampilkan semua buku
router.get('/', bukuController.showAllBuku);

// GET /buku/tambah -> Menampilkan form untuk menambah buku
router.get('/tambah', bukuController.showCreateForm);

// POST /buku -> Menyimpan data buku baru
router.post('/', bukuController.createNewBuku);

// GET /buku/edit/:id -> Menampilkan form untuk mengedit buku
router.get('/edit/:id', bukuController.showEditForm);

// PUT /buku/:id -> Mengupdate data buku
router.put('/:id', bukuController.updateExistingBuku);

// DELETE /buku/:id -> Menghapus buku
router.delete('/:id', bukuController.deleteExistingBuku);

module.exports = router;