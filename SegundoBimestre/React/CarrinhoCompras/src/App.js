
import React, { useState } from "react";
import "./App.css";

const produtosIniciais = [
  { id: 1, nome: "Headset HyperX", categoria: "Áudio", preco: 249.90, emoji: "🎧", cor: "#302747" },
  { id: 2, nome: "Mouse Wireless", categoria: "Acessórios", preco: 119.90, emoji: "🖱️", cor: "#243b43" },
  { id: 3, nome: "Teclado RGB", categoria: "Periféricos", preco: 289.90, emoji: "⌨️", cor: "#463127" },
  { id: 4, nome: "Controle Gamer", categoria: "Games", preco: 199.90, emoji: "🎮", cor: "#273a2e" },
  { id: 5, nome: "Monitor Gamer", categoria: "Monitores", preco: 999.90, emoji: "🖥️", cor: "#292f4b" },
  { id: 6, nome: "Webcam Full HD", categoria: "Acessórios", preco: 179.90, emoji: "📷", cor: "#43304b" },
];

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

  const categorias = [
    "Todos",
    ...new Set(produtosIniciais.map((produto) => produto.categoria)),
  ];

  const produtosFiltrados = produtosIniciais.filter((produto) => {
    const correspondeBusca = produto.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeCategoria =
      categoria === "Todos" || produto.categoria === categoria;

    return correspondeBusca && correspondeCategoria;
  });

  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const valorTotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function adicionarProduto(produto) {
    setPedidoFinalizado(false);

    setCarrinho((atual) => {
      const encontrado = atual.find((item) => item.id === produto.id);

      if (encontrado) {
        return atual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...atual, { ...produto, quantidade: 1 }];
    });
  }

  function alterarQuantidade(id, variacao) {
    setCarrinho((atual) =>
      atual
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + variacao }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );

    setPedidoFinalizado(false);
  }

  function removerProduto(id) {
    setCarrinho((atual) => atual.filter((item) => item.id !== id));
    setPedidoFinalizado(false);
  }

  function finalizarPedido() {
    if (carrinho.length === 0) return;

    setPedidoFinalizado(true);
    setCarrinho([]);
  }

  return (
    <div className="loja">
      <header className="topo">
        <a className="marca" href="#inicio">
          <span className="marca-icone">N</span>
          <span>NEXUS<span className="marca-ponto">.</span></span>
        </a>

        <div className="topo-info">
          <span className="status-online"></span>
          Loja gamer
        </div>

        <a href="#carrinho" className="atalho-carrinho">
          <span>🛒</span>
          <span>Meu carrinho</span>
          <b>{quantidadeTotal}</b>
        </a>
      </header>

      <main id="inicio" className="conteudo-principal">
        <section className="banner">
          <div className="banner-texto">
            <span className="etiqueta">TECNOLOGIA E PERFORMANCE</span>
            <h1>
              Seu próximo nível
              <br />
              <span>começa aqui.</span>
            </h1>
            <p>
              Equipamentos selecionados para quem leva
              seus jogos e sua produtividade a sério.
            </p>
            <a href="#produtos" className="botao-banner">
              Explorar produtos <span>→</span>
            </a>
          </div>

          <div className="banner-arte" aria-hidden="true">
            <div className="circulo-arte"></div>
            <span className="arte-controle">🎮</span>
            <span className="arte-brilho">✦</span>
          </div>
        </section>

        <section id="produtos" className="area-compras">
          <div className="catalogo">
            <div className="titulo-secao">
              <div>
                <span className="subtitulo">NOSSA SELEÇÃO</span>
                <h2>Encontre seu equipamento</h2>
              </div>
              <span className="contador-produtos">
                {produtosFiltrados.length} produtos
              </span>
            </div>

            <input
              className="campo-busca"
              type="text"
              placeholder="Buscar produto pelo nome..."
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
            />

            <div className="categorias">
              {categorias.map((item) => (
                <button
                  key={item}
                  className={categoria === item ? "categoria ativa" : "categoria"}
                  onClick={() => setCategoria(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="grade-produtos">
              {produtosFiltrados.map((produto) => (
                <article className="card-produto" key={produto.id}>
                  <div
                    className="produto-arte"
                    style={{ backgroundColor: produto.cor }}
                  >
                    <span className="produto-emoji">{produto.emoji}</span>
                    <span className="selo">DESTAQUE</span>
                  </div>

                  <div className="produto-detalhes">
                    <span className="produto-categoria">
                      {produto.categoria}
                    </span>
                    <h3>{produto.nome}</h3>
                    <div className="linha-preco">
                      <strong>{formatarPreco(produto.preco)}</strong>
                    </div>

                    <button
                      className="botao-adicionar"
                      onClick={() => adicionarProduto(produto)}
                    >
                      + Adicionar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {produtosFiltrados.length === 0 && (
              <p className="sem-produtos">
                Nenhum produto encontrado. Tente outra busca.
              </p>
            )}
          </div>

          <aside id="carrinho" className="painel-carrinho">
            <div className="carrinho-titulo">
              <div>
                <span className="subtitulo">SUA SELEÇÃO</span>
                <h2>Carrinho</h2>
              </div>
              <span className="bolha">{quantidadeTotal}</span>
            </div>

            {carrinho.length === 0 ? (
              <div className="carrinho-vazio">
                <div className="carrinho-vazio-icone">🛒</div>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione produtos para vê-los aqui.</p>
              </div>
            ) : (
              <div className="itens-carrinho">
                {carrinho.map((item) => (
                  <div className="item-carrinho" key={item.id}>
                    <div
                      className="miniatura"
                      style={{ backgroundColor: item.cor }}
                    >
                      {item.emoji}
                    </div>

                    <div className="item-centro">
                      <h3>{item.nome}</h3>
                      <strong>
                        {formatarPreco(item.preco * item.quantidade)}
                      </strong>

                      <div className="controle-quantidade">
                        <button
                          onClick={() => alterarQuantidade(item.id, -1)}
                          aria-label={`Diminuir ${item.nome}`}
                        >
                          −
                        </button>
                        <span>{item.quantidade}</span>
                        <button
                          onClick={() => alterarQuantidade(item.id, 1)}
                          aria-label={`Aumentar ${item.nome}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="excluir-item"
                      onClick={() => removerProduto(item.id)}
                      aria-label={`Remover ${item.nome}`}
                      title="Remover produto"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="resumo">
              <div className="resumo-linha">
                <span>Quantidade de itens</span>
                <span>{quantidadeTotal}</span>
              </div>

              <div className="resumo-linha">
                <span>Entrega</span>
                <span className="frete-gratis">Grátis</span>
              </div>

              <div className="resumo-total">
                <span>Total</span>
                <strong>{formatarPreco(valorTotal)}</strong>
              </div>

              <button
                className="botao-finalizar"
                disabled={carrinho.length === 0}
                onClick={finalizarPedido}
              >
                Finalizar pedido <span>→</span>
              </button>

              {pedidoFinalizado && (
                <p className="mensagem-sucesso">
                  Pedido simulado finalizado com sucesso!
                </p>
              )}

              <p className="nota-seguranca">
                🔒 Compra demonstrativa, sem cobrança real.
              </p>
            </div>
          </aside>
        </section>
      </main>

      <footer className="rodape">
        <span> NEXUS<span className="marca-ponto">.</span></span>
        <p>Uma experiência de compras feita em React.</p>
      </footer>
    </div>
  );
}

export default App;
