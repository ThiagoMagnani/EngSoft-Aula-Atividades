// 1. Criando um objeto pessoal
const pessoa = {
  nome: "Thiago",
  idade: 20,
  profissao: "Estudante",
};

console.log("1. Detalhes da pessoa:");
console.log(pessoa);

// 2. Acessando propriedades
console.log("2. Nome da pessoa:");
console.log(pessoa.nome);

// 3. Atualizando valores
pessoa.idade = 21;

console.log("3. Objeto após atualizar a idade:");
console.log(pessoa);

// 4. Adicionando uma nova propriedade
pessoa.cidade = "Itaberá";

console.log("4. Objeto após adicionar a cidade:");
console.log(pessoa);

// 5. Função com objeto
function apresentarPessoa(pessoa) {
  return `Nome: ${pessoa.nome}, Idade: ${pessoa.idade}, Profissão: ${pessoa.profissao}`;
}

console.log("5. Frase com os dados da pessoa:");
console.log(apresentarPessoa(pessoa));

// 6. Lista de pessoas
const pessoas = [
  { nome: "Thiago", idade: 21 },
  { nome: "David", idade: 20 },
  { nome: "Carlos", idade: 16 },
];

console.log("6. Lista de pessoas:");
console.log(pessoas);

// 7. Filtrando maiores de idade
console.log("7. Pessoas maiores de idade:");

pessoas.forEach(function (pessoa) {
  if (pessoa.idade >= 18) {
    console.log(pessoa.nome);
  }
});

// 8. Cálculo de compra
const produto = {
  preco: 50,
  quantidade: 3,
};

const valorTotal = produto.preco * produto.quantidade;

console.log("8. Valor total da compra:");
console.log(valorTotal);

// 9. Objeto livro
const livro1 = {
  titulo: "O Hobbit",
  autor: "J. R. R. Tolkien",
  anoPublicacao: 1937,
  genero: "Fantasia",
};

console.log("9. Detalhes do livro:");
console.log(livro1);

// 10. Ano atual e idade de publicação
const anoAtual = new Date().getFullYear();

const livro2 = {
  titulo: "O Hobbit",
  autor: "J. R. R. Tolkien",
  anoPublicacao: 1937,
  genero: "Fantasia",
};

livro2.idadePublicacao = anoAtual - livro2.anoPublicacao;

const mostrarDetalhes = `
Título: ${livro2.titulo}
Autor: ${livro2.autor}
Ano de publicação: ${livro2.anoPublicacao}
Gênero: ${livro2.genero}
Idade de publicação: ${livro2.idadePublicacao} anos
`;

console.log("10. Detalhes do livro:");
console.log(mostrarDetalhes);

// 11. Acessando propriedades usando colchetes
const livro3 = {
  titulo: "O Hobbit",
  autor: "J. R. R. Tolkien",
  anoPublicacao: 1937,
  genero: "Fantasia",
  idadePublicacao: anoAtual - 1937,
};

console.log("11. Detalhes do livro usando notação de colchetes:");
console.log("Título:", livro3["titulo"]);
console.log("Autor:", livro3["autor"]);
console.log("Ano de publicação:", livro3["anoPublicacao"]);
console.log("Gênero:", livro3["genero"]);
console.log("Idade de publicação:", livro3["idadePublicacao"]);

// 12. Alterando o gênero do livro
const livro4 = {
  titulo: "O Hobbit",
  autor: "J. R. R. Tolkien",
  anoPublicacao: 1937,
  genero: "Fantasia",
  idadePublicacao: anoAtual - 1937,
};

livro4.genero = "Aventura";

console.log("12. Livro após alterar o gênero:");
console.log(livro4);

// 13. Excluindo a propriedade editora
const livro5 = {
  titulo: "O Hobbit",
  autor: "J. R. R. Tolkien",
  anoPublicacao: 1937,
  genero: "Fantasia",
  idadePublicacao: anoAtual - 1937,
  editora: "HarperCollins",
};

delete livro5.editora;

console.log("13. Livro após excluir a editora:");
console.log(livro5);
