import React from "react";
import "./App.css";

function Apresentacao() {
  return (
    <main className="pagina">
      <section className="cartao">
        <img
          className="imagem-faculdade"
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
          alt="Campus universitário com prédios e estudantes"
        />

        <div className="conteudo">
          <h1>João da Silva</h1>

          <h2>Curso: Análise e Desenvolvimento de Sistemas</h2>

          <p>Seja bem-vindo à nossa faculdade!</p>
        </div>
      </section>
    </main>
  );
}

export default Apresentacao;
