require('dotenv').config(); // Muat variabel dari .env
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Setup method-override: untuk membaca method PUT/DELETE dari form
app.use(methodOverride('_method'));

// Routes
const bukuRoutes = require('./src/routes/bukuRoutes');
app.use('/buku', bukuRoutes); // Semua rute diawali dengan /buku

// Redirect root URL to /buku
app.get('/', (req, res) => {
    res.redirect('/buku');
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});