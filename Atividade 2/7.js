let precos = [100, 50, 80, 200, 150];

let precosComDesconto = precos.map(function (preco) {
  return preco * 0.9;
});

console.log("Preços originais:", precos);
console.log("Preços com desconto:", precosComDesconto);
