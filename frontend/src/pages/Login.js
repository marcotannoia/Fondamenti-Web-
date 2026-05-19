import React, { useState } from 'react';

const REGION = import.meta.env.VITE_COGNITO_REGION ; 
const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');

  const loginUtente = async (e) => {
    e.preventDefault(); 
    setErrore('');

    try {
      const response = await fetch(`https://cognito-idp.${REGION}.amazonaws.com/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-amz-json-1.1",
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" 
        },
        body: JSON.stringify({
          ClientId: CLIENT_ID,
          AuthFlow: "USER_PASSWORD_AUTH",
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // AWS Cognito restituisce l'errore dentro il campo __type o message
        throw new Error(data.message || "Email o password errati");
      }

      // Se il login ha successo, estraiamo i token
      const idToken = data.AuthenticationResult.IdToken;
      
      console.log("Login effettuato con successo!");
      
      // Salva il token nel localStorage per le chiamate API protette
      localStorage.setItem("token", idToken);
      
      // Qui potrai reindirizzare l'utente alla Dashboard (es. usando react-router-dom)

    } catch (error) {
      console.error("Errore:", error.message);
      setErrore(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Accedi al Sistema</h2>
      {errore && <p style={{ color: 'red' }}>{errore}</p>}
      
      <form onSubmit={loginUtente}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Accedi
        </button>
      </form>
    </div>
  );
}