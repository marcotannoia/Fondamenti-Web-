import './Review.css';

const URL_API = process.env.REACT_APP_API_URL;

export default function Review({idEsame, setEsame}) { 
        async function inviaRecensione(event) { 
            event.preventDefault(); 
            const modulo = event.currentTarget;
            const schema = modulo.elements;

            const recensione = {
                        usernameCineca: schema.usernameCineca.value.trim(),
                        passwordCineca: schema.passwordCineca.value,
                        difficolta: Number(schema.difficolta.value),
                        tempo_di_studio_settimane: Number(schema.tempoStudio.value),
                        tempi_di_correzione: Number(schema.tempoCorrezione.value),
                        commento: schema.commento.value.trim()
                        };
            try {

                const risposta = await fetch(`${URL_API}/api/esami/${idEsame}/recensione`,
                    {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(recensione)
                    }
                );
                const dati = await risposta.json(); 
                 if (!risposta.ok) {
                alert(dati.message || dati.error);
                return;
                }

                setEsame(dati.esame);
                modulo.reset();
                alert(dati.message);

                    } catch {
                    alert('Impossibile contattare il server.');
                    }
                }

return (
    <form
      className="review"
      onSubmit={inviaRecensione}
    >
      <h3>Lascia una recensione</h3>

      <p className="review__nota">
        Inserisci le credenziali Cineca per verificare che sei uno studente.
      </p>

      <label htmlFor="usernameCineca">
        Username Cineca
      </label>

      <input
        id="usernameCineca"
        name="usernameCineca"
        type="text"
        autoComplete="username"
        required
      />

      <label htmlFor="passwordCineca">
        Password Cineca
      </label>

      <input
        id="passwordCineca"
        name="passwordCineca"
        type="password"
        autoComplete="current-password"
        required
      />

      <label htmlFor="difficolta">
        Difficoltà
      </label>

      <select
        id="difficolta"
        name="difficolta"
        required
      >
        <option value="">Seleziona</option>
        <option value="1">1 - Molto facile</option>
        <option value="2">2 - Facile</option>
        <option value="3">3 - Media</option>
        <option value="4">4 - Difficile</option>
        <option value="5">5 - Molto difficile</option>
      </select>

      <label htmlFor="tempoStudio">
        Tempo di studio in settimane
      </label>

      <input
        id="tempoStudio"
        name="tempoStudio"
        type="number"
        min="1"
        required
      />

      <label htmlFor="tempoCorrezione">
        Tempo di correzione in giorni
      </label>

      <input
        id="tempoCorrezione"
        name="tempoCorrezione"
        type="number"
        min="0"
        required
      />

      <label htmlFor="commento">
        Commento
      </label>

      <textarea
        id="commento"
        name="commento"
        rows="4"
        required
      />

      <button type="submit">
        Pubblica recensione
      </button>
    </form>
  );
}