const mongoose = require('mongoose');

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connesso a MongoDB");
  } catch (err) {
    console.error("Errore di connessione a MongoDB:", err);
    process.exit(1); // Blocca l'app se non si connette al DB
  }
};

module.exports = connectDB;
