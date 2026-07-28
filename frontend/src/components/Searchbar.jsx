import { useState } from 'react';
import './Searchbar.css';

export default function SearchBar() {
  const [testo, setTesto] = useState('');

  function gestisciRicerca(event) {
    event.preventDefault();
  }

  return (
    <div className="search-area">
      <form className="search-bar" onSubmit={gestisciRicerca}>
        <span className="search-bar__icon" aria-hidden="true">
          🔍
        </span>

        <input
          type="text"
          value={testo}
          onChange={(event) => setTesto(event.target.value)}
          placeholder="Cerca un esame..."
        />

        <button type="submit">
          Cerca
        </button>
      </form>
    </div>
  );
}