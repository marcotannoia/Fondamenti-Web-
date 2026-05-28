const express = require('express');
const router = express.Router();

// Importiamo il controller con le funzioni di login e registrazione
const authController = require('../controllers/authController');

// Importiamo il middleware di protezione per le rotte private
const authMiddleware = require('../controllers/authMiddleware');

// 1. Rotta pubblica per la registrazione
router.post('/register', authController.register);

// 2. Rotta pubblica per il login
router.post('/login', authController.login);

// 3. Esempio di rotta PROTETTA (Accessibile solo se il token è valido)
router.get('/me', authMiddleware, (req, res) => {
    // Se siamo qui, significa che authMiddleware ha chiamato next()!
    // I dati estratti dal token sono ora dentro req.user
    res.json({ message: "Accesso consentito alla rotta protetta", user: req.user });
});


router.post('/login-cineca', authController.loginCineca);
// Esportiamo il router in modo che server.js possa importarlo e usarlo
module.exports = router;