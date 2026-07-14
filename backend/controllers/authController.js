const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // serve per fare chiamate http
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body; 
    const newUser = new User({ email, password, ruolo: "user"}); // lo user non puo scegliere se essere admin
    await newUser.save(); // aspetto il salvataggio dell utente
    res.status(201).json({ messaggio: "Utente registrato" }); // e vedo se tutto e andato bene o no
  } catch (err) {
    res.status(500).json({ error: "Errore, riprovare" });
  }
};

exports.login = async (req, res) => { 
  try {
    const { email, password } = req.body; 
    const user = await User.findOne({ email }); 
    if (!user) return res.status(400).json({ error: "Utente non trovato" });// e vedo se esiste o meno

    const match_pw = await bcrypt.compare(password, user.password); 
    if (!match_pw) return res.status(400).json({ error: "Password errata" }); 

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); //creo il token che dura una sett, serve cookie parser per o per leggere i cookie ricevuti dal btowser, cioe la res
    res.cookie('token', token, {
       httpOnly: true,
       secure: false,
       sameSite: 'lax',
       maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ user: { id: user._id, email: user.email } }); //risposta: id user e email | ho tolto il token, lo carico dal middleware con il cookie 
  } catch (err) {
    res.status(500).json({ error: "Errore, riprovare" });
  }
};

exports.loginCineca = async (req, res) => { // in questa funzione facciamo da ponte
  try { 
    const { username, password } = req.body; 
    const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'); // cineca accetta auth base64 con autenticazione basic
    const risposta = await axios.get(`${process.env.ESSE3_URL}/login`, { headers: { 'Authorization': authHeader }}); // chiamata http a quell endpoint con quell header
    res.status(200).json(risposta.data); // cineca ha risposto OK 
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: "Credenziali non valide" });
  } 
}

//gestiamo adesso il cookie del consenso

exports.cookieConenso = (req, res) => {
  res.cookie("consensoCookie", "accepted", {
    httpOnly: false, // deve accedere il frontend per cui non per forza protocllo http
    secure: false, // non serve https
    sameSite: 'lax', // per evitare problemi di cors
    maxAge: 365 * 24 * 60 * 60 * 1000 // un anno
  });

  res.json({ message : "Consenso cookie salvato" });
};
