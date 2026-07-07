const jwt = require('jsonwebtoken'); // lo usiamo per convalidare jwt

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // header... Auth : Bearer TOKEN, con [1] prendo il token 
  if (!token) return res.status(401).json({ error: "Accesso negato" }); // se non esiste

  try {
    const verificato = jwt.verify(token, process.env.JWT_SECRET); // quando si logga riceve un token firmato con jwt valido per 1h 
    req.user = verificato;
    next(); // facciamo valere il login
  } catch (err) {
    res.status(400).json({ error: "Token non valido" });
  }
}; 