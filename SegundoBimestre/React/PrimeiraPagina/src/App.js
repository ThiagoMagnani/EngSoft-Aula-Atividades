
import React from "react";
import "./App.css";

function Apresentacao() {
  return (
    <main className="pagina">
      <div className="cartao">
        <img
          className="imagem-faculdade"
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
          alt="Prédio de uma faculdade"
        />

        <div className="conteudo">
          <h1>Thiago Arques</h1>

          <h2>Curso: Análise e Desenvolvimento de Sistemas</h2>

          <p>Seja bem-vindo à nossa faculdade!</p>
        </div>
      </div>
    </main>
  );
}

export default Apresentacao;
