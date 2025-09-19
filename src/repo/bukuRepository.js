// Menggunakan library mysql2 dengan promise-based API
const mysql = require('mysql2/promise');

// Konfigurasi koneksi database diambil dari file .env
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

/**
 * Mengambil semua data buku dari database.
 * @returns {Promise<Array>} Array berisi objek buku.
 */
const getAllBuku = async () => {
    const conn = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await conn.execute('SELECT * FROM buku ORDER BY id DESC');
        return rows;
    } finally {
        conn.end();
    }
};

/**
 * Mengambil satu data buku berdasarkan ID.
 * @param {number} id - ID buku yang akan dicari.
 * @returns {Promise<Object|null>} Objek buku jika ditemukan, atau null jika tidak.
 */
const getBukuById = async (id) => {
    const conn = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await conn.execute('SELECT * FROM buku WHERE id = ?', [id]);
        return rows[0] || null; // Mengembalikan buku pertama atau null
    } finally {
        conn.end();
    }
};

/**
 * Membuat data buku baru di database.
 * @param {Object} dataBuku - Objek berisi data buku (judul, penulis, dll).
 * @returns {Promise<Object>} Hasil dari operasi insert.
 */
const createBuku = async (dataBuku) => {
    const { judul, penulis, penerbit, tahun_terbit } = dataBuku;
    const conn = await mysql.createConnection(dbConfig);
    try {
        const [result] = await conn.execute(
            'INSERT INTO buku (judul, penulis, penerbit, tahun_terbit) VALUES (?, ?, ?, ?)',
            [judul, penulis, penerbit, tahun_terbit]
        );
        return result;
    } finally {
        conn.end();
    }
};

/**
 * Memperbarui data buku yang ada berdasarkan ID.
 * @param {number} id - ID buku yang akan diperbarui.
 * @param {Object} dataBuku - Objek berisi data buku yang baru.
 * @returns {Promise<Object>} Hasil dari operasi update.
 */
const updateBuku = async (id, dataBuku) => {
    const { judul, penulis, penerbit, tahun_terbit } = dataBuku;
    const conn = await mysql.createConnection(dbConfig);
    try {
        const [result] = await conn.execute(
            'UPDATE buku SET judul = ?, penulis = ?, penerbit = ?, tahun_terbit = ? WHERE id = ?',
            [judul, penulis, penerbit, tahun_terbit, id]
        );
        return result;
    } finally {
        conn.end();
    }
};

/**
 * Menghapus data buku dari database berdasarkan ID.
 * @param {number} id - ID buku yang akan dihapus.
 * @returns {Promise<Object>} Hasil dari operasi delete.
 */
const deleteBuku = async (id) => {
    const conn = await mysql.createConnection(dbConfig);
    try {
        const [result] = await conn.execute('DELETE FROM buku WHERE id = ?', [id]);
        return result;
    } finally {
        conn.end();
    }
};

// Ekspor semua fungsi agar bisa digunakan di file lain
module.exports = {
    getAllBuku,
    getBukuById,
    createBuku,
    updateBuku,
    deleteBuku
};