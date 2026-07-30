import { Route, Routes } from 'react-router-dom';

import './App.css';
import LandingPage from './pages/Landing';
import Dettagli from './pages/Dettagli';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route //rotta landing
          path="/"
          element={<LandingPage />}/>

          <Route // rotta dettagli
          path="/dettagli"
          element={<Dettagli />}
        />
// rotte di autenticazione

      </Routes>
    </>
  );
}

export default App;