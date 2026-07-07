const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const rotteAutenticazione = require('./rotte/rotteAutenticazione');
const rotteEsami = require('./rotte/rotteEsami'); 

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connesso"))
  .catch(err => console.log(err));


app.use('/api/autenticazione', rotteAutenticazione);
app.use('/api/esami', rotteEsami); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server in esecuzione sulla porta ${PORT}`));
