// gli permetto di ricercalo 
const Esame = require('../models/Esame');
const axios = require('axios');

exports.cercaEsame = async (req, res) => {
  try {
    const { nome } = req.params; 
    const exam = await Esame.findOne({ nome });
    if (!exam) return res.status(404).json({ error: "Esame non trovato" });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: "Errore generico, riprovare. " });
  }
};

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

exports.ottieniDataEsame = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // prendo la richiesta
    const axiosConfig = {
        headers: {
            'Authorization': authHeader // e costruisco una richietsas
        }
    };
    const { nomeEsame } = req.body;
   const listaTuttiEsami = await axios.get(`${process.env.ESSE3_URL}/calesa-service-v1/appelli?fields=cdsDefAppId,adDefAppId,adDes`, axiosConfig); // prendo TUTTI gli esami
    const esame = listaTuttiEsami.data.find((app) => app.adDes.trim().toLowerCase() === nomeEsame.trim().toLowerCase()); // prendo solamente quello

    if (!esame) return res.status(404).json({ error: "Esame non trovato" }); 

    const dateEsame = await axios.get(`${process.env.ESSE3_URL}/calesa-service-v1/appelli/${esame.cdsDefAppId}/${esame.adDefAppId}/?fields=dataInizioApp,adDes`, axiosConfig); //qui prendo le date di quell esame
    
    // doppio check
    res.status(200).json({esame: esame.adDes, appelli: dateEsame.data}); // date ricevute

  } catch (error) {
    res.status(500).json({ message: "Errore durante il recupero dei dati" }); //errore
  }
};
