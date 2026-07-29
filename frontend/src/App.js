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
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/dettagli"
          element={<Dettagli />}
        />
      </Routes>
    </>
  );
}

export default App;