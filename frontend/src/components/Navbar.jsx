import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const naviga = useNavigate(); 

  function tornaAllaHome() { 
    naviga('/')
  }

  return (
    <nav className="navbar" aria-label="Navigazione principale">
      <a
        onClick={tornaAllaHome}
        className="navbar__link"
        aria-label="Torna alla home"
        title="Home"
      >
        <span aria-hidden="true">⌂</span>
      </a>

      <a
        href="/login"
        className="navbar__link"
        aria-label="Accedi alla tua area personale"
        title="Area personale"
      >
        <span aria-hidden="true">👤</span>
      </a>
    </nav>
  );
}

export default Navbar;