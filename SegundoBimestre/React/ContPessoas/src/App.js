
import React, { useState } from "react";
import "./App.css";

function App() {
  const [homens, setHomens] = useState(0);
  const [mulheres, setMulheres] = useState(0);

  const total = homens + mulheres;

  function reiniciar() {
    setHomens(0);
    setMulheres(0);
  }

  return (
    <main className="pagina">
      <section className="contador">
        <button
          className="reiniciar"
          onClick={reiniciar}
          title="Reiniciar contador"
        >
          ↻
        </button>

        <h1>Total</h1>

        <div className="visor total">{total}</div>

        <div className="grupos">
          <div className="grupo">
            <div className="pessoa">👨🏻‍💼</div>

            <div className="acoes">
              <button
                className="adicionar"
                onClick={() => setHomens(homens + 1)}
                aria-label="Adicionar homem"
              >
                +
              </button>

              <button
                className="remover"
                onClick={() =>
                  setHomens(Math.max(0, homens - 1))
                }
                aria-label="Remover homem"
              >
                −
              </button>
            </div>

            <h2>Homens</h2>
            <div className="visor">{homens}</div>
          </div>

          <div className="grupo">
            <div className="pessoa">👩🏻‍💼</div>

            <div className="acoes">
              <button
                className="adicionar"
                onClick={() => setMulheres(mulheres + 1)}
                aria-label="Adicionar mulher"
              >
                +
              </button>

              <button
                className="remover"
                onClick={() =>
                  setMulheres(Math.max(0, mulheres - 1))
                }
                aria-label="Remover mulher"
              >
                −
              </button>
            </div>

            <h2>Mulheres</h2>
            <div className="visor">{mulheres}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
