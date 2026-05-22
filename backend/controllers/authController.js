const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body; // prendo i parametri email e password dal json
    const newUser = new User({ email, password }); // creo un nuovo utente con questi deu parametri e gli viene associato un ID da MONGODB
    await newUser.save(); // aspetto il salvataggio dell utente
    res.status(201).json({ message: "Utente registrato" }); // e vedo se tutto e andato bene o no
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => { 
  try {
    const { email, password } = req.body; 
    const user = await User.findOne({ email }); // prendo i parametri email e password dal json
    if (!user) return res.status(400).json({ error: "Utente non trovato" });// e vedo se esiste o meno

    const isMatch = await bcrypt.compare(password, user.password); // la passowrd e uguale?
    if (!isMatch) return res.status(400).json({ error: "Password errata" }); // no

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' }); // in caso postivio
    res.json({ token, user: { id: user._id, email: user.email } }); // manda come risposta l'id, l';email e la password
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};