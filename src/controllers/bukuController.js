const bukuRepository = require('../repo/bukuRepository');
// Tampilkan semua buku (GET)
const showAllBuku = async (req, res) => {
    const allBuku = await bukuRepository.getAllBuku();
    res.render('daftar-buku', { allBuku });
};

// Tampilkan form tambah buku (GET)
const showCreateForm = (req, res) => {
    res.render('form-buku', { buku: null }); // Kirim buku: null untuk mode 'tambah'
};

// Proses tambah buku baru (POST)
const createNewBuku = async (req, res) => {
    await bukuRepository.createBuku(req.body);
    res.redirect('/buku');
};

// Tampilkan form edit buku (GET)
const showEditForm = async (req, res) => {
    const buku = await bukuRepository.getBukuById(req.params.id);
    res.render('form-buku', { buku }); // Kirim data buku untuk mode 'edit'
};

// Proses update buku (PUT)
const updateExistingBuku = async (req, res) => {
    await bukuRepository.updateBuku(req.params.id, req.body);
    res.redirect('/buku');
};

// Proses hapus buku (DELETE)
const deleteExistingBuku = async (req, res) => {
    await bukuRepository.deleteBuku(req.params.id);
    res.redirect('/buku');
};

module.exports = {
    showAllBuku,
    showCreateForm,
    createNewBuku,
    showEditForm,
    updateExistingBuku,
    deleteExistingBuku
};