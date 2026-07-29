// gli permetto di ricercalo 
const Esame = require('../models/Esame');
const axios = require('axios');

exports.aggiuntaRecensione = async (req, res) => {
    try {
        const { idEsame } = req.params; // anche se non lo ho nello schema comunque sia mongo me ne assegna 1 
        const { difficolta, tempo_di_studio_settimane , tempi_di_correzione, commento } = req.body;
        
        const userId = req.user.id; 

        const esameAggiornato = await Esame.findByIdAndUpdate( // ha 3 parametri: cosa modifica, come lo modifica, come te lo consegna
            idEsame,
            {
                $push: { // metodo di mongo, serve per inserire qualcosa
                    recensioni: {
                        userId,
                        difficolta,
                        tempo_di_studio_settimane,
                        tempi_di_correzione,
                        commento
                    }
                }
            },
            { new: true } // Restituisce l'esame aggiornato
        );

        if (!esameAggiornato) {
            return res.status(404).json({ message: "Esame non trovato" });
        }

        res.status(200).json({ message: "Recensione inserita con successo", esame: esameAggiornato });
    } catch (error) {
        res.status(500).json({ message: "Errore durante l'inserimento della recensione", error });
    }
};

exports.ricercaEsame = async (req, res) => {
    try {
        const nome = req.query.nome?.trim();

        if (!nome) {
            return res.status(400).json({
                message: "Inserire un esame"
            });
        }

        const esame = await Esame
            .findOne({ nome })
            .collation({
                locale: 'it',
                strength: 2
            });

        if (!esame) {
            return res.status(404).json({
                message: "Esame non trovato"
            });
        }

        return res.status(200).json(esame);
    } catch (err) {
        return res.status(500).json({
            message: "Errore generico"
        });
    }
};


// SOLO PER ADMIN
exports.inserimentoEsame  = async (req, res) => {
    try {
        const { nome, descrizione, professore, corsoDiStudi } = req.body; 
        
        const nuovoEsame = new Esame({
            nome,
            descrizione,
            professore,
            corsoDiStudi, 
            recensioni: [] 
        });

        await nuovoEsame.save();
        res.status(201).json({ message: "Esame inserito con successo", esame: nuovoEsame });
    } catch (error) {
        res.status(500).json({ message: "Errore durante l'inserimento", error });
    }
};

