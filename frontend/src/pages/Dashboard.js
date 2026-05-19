import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  // Stato per salvare i dati che arriveranno dal backend Express
  const [datiProtetti, setDatiProtetti] = useState(null);
  const [errore, setErrore] = useState('');
  const [caricamento, setCaricamento] = useState(true);

  // Inseriamo la funzione dentro il componente
  const richiediDatiProtetti = async () => {
    const token = localStorage.getItem("token");

    // Se non c'è il token nel localStorage, blocchiamo subito la chiamata
    if (!token) {
      setErrore("Non sei autenticato. Effettua il login.");
      setCaricamento(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/dati-protetti", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}` // Inviamo il token recuperato da Cognito
        }
      });

      const dati = await response.json();

      if (!response.ok) {
        throw new Error(dati.message || "Impossibile recuperare i dati protetti");
      }

      // Salviamo i dati dello stato di React per mostrarli nella pagina
      setDatiProtetti(dati);
    } catch (err) {
      console.error(err);
      setErrore(err.message);
    } finally {
      setCaricamento(false);
    }
  };

  // Usiamo useEffect per attivare la funzione AUTOMATICAMENTE all'apertura della pagina
  useEffect(() => {
    richiediDatiProtetti();
  }, []); // L'array vuoto significa: "esegui solo una volta all'avvio del componente"

  // Gestione della UI in base allo stato
  if (caricamento) return <p>Caricamento dati in corso...</p>;
  if (errore) return <p style={{ color: 'red' }}>{errore}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Benvenuto nella tua Area Riservata</h1>
      <p>I seguenti dati arrivano dal database MongoDB tramite Express:</p>
      
      {datiProtetti && (
        <pre style={{ background: '#f4f4f4', padding: '10px' }}>
          {JSON.stringify(datiProtetti, null, 2)}
        </pre>
      )}
    </div>
  );
}