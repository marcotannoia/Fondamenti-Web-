const express = require('express');
const router = express.Router();
const ControllerEsame = require('../controllers/ControllerEsame'); // Il tuo controller con le logiche
const authMiddleware = require('../controllers/authMiddleware'); // Il tuo middleware di autenticazione

router.get('/ricerca-esame', ControllerEsame.ricercaEsame);

router.post('/:idEsame/recensione', authMiddleware, ControllerEsame.aggiuntaRecensione);

router.post('/aggiungi', authMiddleware, ControllerEsame.inserimentoEsame);


module.exports = router;
