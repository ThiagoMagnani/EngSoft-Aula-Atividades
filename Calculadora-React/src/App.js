import React, { useState } from "react";
import "./App.css";

function Botao({ valor, onClick, tipo = "" }) {
  return (
    <button
      className={`botao ${tipo}`}
      onClick={() => onClick(valor)}
    >
      {valor}
    </button>
  );
}

function App() {
  const [visor, setVisor] = useState("0");
  const [expressao, setExpressao] = useState("");
  const [primeiroNumero, setPrimeiroNumero] = useState(null);
  const [operacao, setOperacao] = useState(null);
  const [novoNumero, setNovoNumero] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState(false);

  function digitarNumero(numero) {
    if (visor === "Erro" || novoNumero) {
      setVisor(numero);
      setNovoNumero(false);
      setResultadoFinal(false);
    } else {
      setVisor(visor === "0" ? numero : visor + numero);
    }

    if (resultadoFinal) {
      setExpressao("");
      setResultadoFinal(false);
    }
  }

  function digitarDecimal() {
    if (visor === "Erro") return;

    if (novoNumero) {
      setVisor("0.");
      setNovoNumero(false);
      setResultadoFinal(false);
    } else if (!visor.includes(".")) {
      setVisor(visor + ".");
    }
  }

  function selecionarOperacao(op) {
    if (visor === "Erro") return;

    const numero = parseFloat(visor);

    setPrimeiroNumero(numero);
    setOperacao(op);
    setExpressao(`${visor} ${op}`);
    setNovoNumero(true);
    setResultadoFinal(false);
  }

  function calcular() {
    if (operacao === null || primeiroNumero === null) return;

    const segundoNumero = parseFloat(visor);
    let resultado;

    setExpressao(
      `${primeiroNumero} ${operacao} ${visor} =`
    );

    switch (operacao) {
      case "+":
        resultado = primeiroNumero + segundoNumero;
        break;
      case "−":
        resultado = primeiroNumero - segundoNumero;
        break;
      case "×":
        resultado = primeiroNumero * segundoNumero;
        break;
      case "÷":
        if (segundoNumero === 0) {
          setVisor("Erro");
          setPrimeiroNumero(null);
          setOperacao(null);
          setNovoNumero(true);
          setResultadoFinal(true);
          return;
        }
        resultado = primeiroNumero / segundoNumero;
        break;
      default:
        return;
    }

    if (!Number.isFinite(resultado)) {
      setVisor("Erro");
    } else {
      setVisor(String(Number(resultado.toPrecision(12))));
    }

    setPrimeiroNumero(null);
    setOperacao(null);
    setNovoNumero(true);
    setResultadoFinal(true);
  }

  function limpar() {
    setVisor("0");
    setExpressao("");
    setPrimeiroNumero(null);
    setOperacao(null);
    setNovoNumero(false);
    setResultadoFinal(false);
  }

  function apagarUltimo() {
    if (visor === "Erro" || novoNumero || resultadoFinal) {
      limpar();
      return;
    }

    setVisor(visor.length > 1 ? visor.slice(0, -1) : "0");
  }

  function alterarSinal() {
    if (visor === "Erro") return;

    setVisor(String(parseFloat(visor) * -1));
  }

  function porcentagem() {
    if (visor === "Erro") return;

    const valor = parseFloat(visor) / 100;
    setVisor(String(valor));
    setNovoNumero(true);
  }

  return (
    <main className="pagina">
      <section className="calculadora">
        <div className="visor">
          <div className="expressao">
            {expressao || "\u00A0"}
          </div>

          <div className="resultado" aria-live="polite">
            {visor}
          </div>
        </div>

        <div className="teclado">
          <Botao valor="⌫" onClick={apagarUltimo} tipo="funcao" />
          <Botao valor="AC" onClick={limpar} tipo="funcao" />
          <Botao valor="%" onClick={porcentagem} tipo="funcao" />
          <Botao valor="÷" onClick={selecionarOperacao} tipo="operador" />

          <Botao valor="7" onClick={digitarNumero} />
          <Botao valor="8" onClick={digitarNumero} />
          <Botao valor="9" onClick={digitarNumero} />
          <Botao valor="×" onClick={selecionarOperacao} tipo="operador" />

          <Botao valor="4" onClick={digitarNumero} />
          <Botao valor="5" onClick={digitarNumero} />
          <Botao valor="6" onClick={digitarNumero} />
          <Botao valor="−" onClick={selecionarOperacao} tipo="operador" />

          <Botao valor="1" onClick={digitarNumero} />
          <Botao valor="2" onClick={digitarNumero} />
          <Botao valor="3" onClick={digitarNumero} />
          <Botao valor="+" onClick={selecionarOperacao} tipo="operador" />

          <Botao valor="+/−" onClick={alterarSinal} tipo="funcao" />
          <Botao valor="0" onClick={digitarNumero} />
          <Botao valor="." onClick={digitarDecimal} />
          <Botao valor="=" onClick={calcular} tipo="igual" />
        </div>
      </section>
    </main>
  );
}

export default App;
