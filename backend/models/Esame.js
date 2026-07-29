// definiamo la struttura dei dati degli esami

const mongoose = require('mongoose');

const SchemaRecensione = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    difficolta: { type: Number, min: 1, max: 5, required: true },
    tempo_di_studio_settimane: { type: Number, required: true },
    tempi_di_correzione : { type: Number, required: true },
    commento: { type: String, required: true }
}, { timestamps: true });


// struttura esame data dal admin
const SchemaEsame = new mongoose.Schema({
    nome: { type: String, required: true },
    descrizione: { type: String, required: true },
    professore: { type: String, required: true },
    recensioni: [SchemaRecensione] ,
    corsoDiStudi: { type: String, required: true },
    tempo_di_studio_settimane: {type: String, required: true},
    tempi_di_correzione : { type: Number, required: true },
    difficolta: { type: Number, min: 1, max: 5, required: true }
});

//esporto 

module.exports = mongoose.model('Esame', SchemaEsame);
