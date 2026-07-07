const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // praticamente importiamo cookie-parser per poter introdurre i cookie 


require('dotenv').config();

const rotteAutenticazione = require('./rotte/rotteAutenticazione');
const rotteEsami = require('./rotte/rotteEsami'); 

const app = express();
app.use(express.json());
app.use(cors({ // non basta attivare generalmente il cors ma bisogna esplicitare da chi accetto richieste (e di tipo sensibile)
  origin: process.env.FRONTEND_URL, // poi ci mettiamo il nostro url del sito 
  credentials: true,
}));
app.use(cookieParser()); // aggiungo il parser dei cookie
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connesso"))
  .catch(err => console.log(err));


app.use('/api/autenticazione', rotteAutenticazione);
app.use('/api/esami', rotteEsami); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server in esecuzione sulla porta ${PORT}`));
