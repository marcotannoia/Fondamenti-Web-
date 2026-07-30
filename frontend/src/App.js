import { Route, Routes } from 'react-router-dom';

import './App.css';
import LandingPage from './pages/Landing';
import Dettagli from './pages/Dettagli';
import Login from './pages/Login';
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

  <Route
    path="/login"
    element={<Login />}
  />
</Routes>
    </>
  );
}

export default App;