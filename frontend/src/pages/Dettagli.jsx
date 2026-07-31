import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Review from '../components/Review';
import './Dettagli.css';

export default function Dettagli() {
  const posizione = useLocation();
  const naviga = useNavigate();

  const esameRicevuto = posizione.state?.esame;
  const [esame, setEsame] = useState(esameRicevuto);

  function tornaAllaHome() {
    naviga('/');
  }

  if (!esame) {
    return (
      <main className="pagina-dettagli">
        <p>Nessun esame selezionato.</p>
      </main>
    );
  }

  const recensioni = esame.recensioni || [];

  return (
    <main className="pagina-dettagli">
      <div className="dettagli">
        <button
          type="button"
          className="dettagli__indietro"
          onClick={tornaAllaHome}
        >
          ← Torna alla ricerca
        </button>

        <section className="scheda-esame">
          <div className="caratteristica caratteristica--titolo">
            <strong>Esame</strong>
            <h1>{esame.nome}</h1>
          </div>

          <div className="caratteristica">
            <strong>Descrizione</strong>
            <p>{esame.descrizione}</p>
          </div>

          <div className="caratteristica">
            <strong>Professore</strong>
            <p>{esame.professore}</p>
          </div>

          <div className="caratteristica">
            <strong>Corso di studi</strong>
            <p>{esame.corsoDiStudi}</p>
          </div>

          <div className="caratteristica">
            <strong>Difficoltà</strong>
            <p>{esame.difficolta}/5</p>
          </div>

          <div className="caratteristica">
            <strong>Tempo di studio</strong>
            <p>
              {esame.tempo_di_studio_settimane} settimane
            </p>
          </div>

          <div className="caratteristica">
            <strong>Tempo di correzione</strong>
            <p>
              {esame.tempi_di_correzione} giorni
            </p>
          </div>
        </section>

        <section className="sezione-recensioni">
          <h2>Recensioni</h2>

          {recensioni.length === 0 ? (
            <p>Non sono ancora presenti recensioni.</p>
          ) : (
            recensioni.map((recensione) => (
              <article
                className="recensione"
                key={recensione._id}
              >
                <p>
                  <strong>Difficoltà:</strong>{' '}
                  {recensione.difficolta}/5
                </p>

                <p>
                  <strong>Tempo di studio:</strong>{' '}
                  {recensione.tempo_di_studio_settimane} settimane
                </p>

                <p>
                  <strong>Tempo di correzione:</strong>{' '}
                  {recensione.tempi_di_correzione} giorni
                </p>

                <p>
                  <strong>Commento:</strong>{' '}
                  {recensione.commento}
                </p>
              </article>
            ))
          )}
          <Review
            idEsame={esame._id}
            setEsame={setEsame}
          />
        </section>
      </div>
    </main>
  );
}