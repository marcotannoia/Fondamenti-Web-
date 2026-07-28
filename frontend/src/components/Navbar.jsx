import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar" aria-label="Navigazione principale">
      <a
        href="#home"
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