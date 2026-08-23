const calcularJurosCompostos = (valorInicial, taxa, periodo) => {
  return valorInicial * (1 + taxa / 100) ** periodo;
};

let valorInicial = 1000;
let taxa = 10;
let periodo = 2;

let valorFinal = calcularJurosCompostos(valorInicial, taxa, periodo);

console.log("Valor final: R$ " + valorFinal.toFixed(2));
