function calcularTroco(valorCompra, pagamento) {
  return pagamento - valorCompra;
}

let valorCompra = 35;
let pagamento = 50;

let troco = calcularTroco(valorCompra, pagamento);

console.log("O troco é R$ " + troco.toFixed(2));
