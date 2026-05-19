import React from 'react';
import Login from './pages/Login'; // Assicurati che il percorso sia corretto rispetto a dove si trova App.js

function App() {
  return (
    <div className="App">
      {/* Visualizziamo il componente di Login che punta a AWS Cognito */}
      <Login />
    </div>
  );
}

export default App;