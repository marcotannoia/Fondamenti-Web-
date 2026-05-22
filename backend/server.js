require('dotenv').config(); // Carica le variabili dal file .env
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connessione al Database
connectDB();

// Middleware base
app.use(cors());
app.use(express.json()); // Necessario per leggere il corpo delle richieste (body)

// TODO: Qui importeremo e useremo le rotte (es. app.use('/api/auth', authRoutes);)

// Rotta base di test
app.get('/', (req, res) => {
  res.send('Il server è attivo e la struttura è pronta!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT} ⚡`);
});