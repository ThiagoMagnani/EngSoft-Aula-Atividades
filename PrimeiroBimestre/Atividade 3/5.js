function calcularPotencia(x, y) {
  let resultado = 1;

  for (let i = 0; i < y; i++) {
    resultado = resultado * x;
  }

  return resultado;
}

let resultado = calcularPotencia(4, 3);

console.log("4 elevado a 3 é igual a " + resultado);
