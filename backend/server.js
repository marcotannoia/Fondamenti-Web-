require('dotenv').config(); // Carica le variabili dal file .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware base
app.use(cors());
app.use(express.json()); // Necessario per leggere il corpo delle richieste (body)

// Connessione a MongoDB
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connesso a MongoDB Atlas!");
    app.listen(PORT, () => {
      console.log(`Server in ascolto sulla porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Errore di connessione a MongoDB:", err);
  });

// Esempio di rotta base
app.get('/', (req, res) => {
  res.send('Il server è attivo e connesso al database!');
});