import React, { useEffect, useState } from 'react';
import './App.css';

const INGREDIENTS = [
  { id:'stardust', name:'Poeira estelar', icon:'✦', tone:'violet', tags:['brilho','memória'], desc:'Brilha como uma lembrança distante.', price:0 },
  { id:'ember', name:'Brasa líquida', icon:'♨', tone:'orange', tags:['calor','coragem'], desc:'Uma chama que aprendeu a ficar quieta.', price:0 },
  { id:'moonwater', name:'Água lunar', icon:'☾', tone:'blue', tags:['calma','sonho'], desc:'Fria como o lado esquecido da lua.', price:0 },
  { id:'void', name:'Essência do vazio', icon:'◉', tone:'pink', tags:['silêncio','esquecimento'], desc:'O gosto de algo que nunca existiu.', price:0 },
  { id:'moss', name:'Musgo de cometa', icon:'❋', tone:'green', tags:['vida','natureza'], desc:'Cheiro de chuva em um planeta morto.', price:0 },
  { id:'echo', name:'Eco engarrafado', icon:'〰', tone:'gold', tags:['voz','memória'], desc:'Uma palavra presa dentro do vidro.', price:0 },
  { id:'salt', name:'Sal das lágrimas', icon:'◇', tone:'white', tags:['tristeza','verdade'], desc:'Sal de uma despedida que ainda não aconteceu.', price:0 },
  { id:'static', name:'Estática azul', icon:'ϟ', tone:'cyan', tags:['caos','velocidade'], desc:'Eletricidade roubada de um sonho ruim.', price:0 },
];

const NIGHTS = [
 { title:'A última chamada', subtitle:'A noite em que tudo começou', intro:'O céu rachou às 23h17. Desde então, as estrelas caem como cinzas e o relógio da parede conta os minutos ao contrário. Você herdou este bar de alguém que não aparece em nenhuma fotografia.', customer:'Miro, o robô cansado', species:'AUTÔMATO · SÉRIE DESCONTINUADA', emoji:'🤖', color:'cyan', quote:'“Meu sistema diz que estou funcionando. Então por que sinto falta de algo que não consigo nomear?”', clue:'Ele fala de uma saudade sem nome. Procure algo que guarde lembranças e um ingrediente que acalme o ruído dentro dele.', recipe:['echo','moonwater'], reward:22, memory:'Você percebe que até uma máquina pode sentir falta de casa.', lore:'Na parte interna do peito de Miro há uma foto desbotada de um céu azul. Ele não sabe quem a colocou ali.' },
 { title:'Fumaça e assombração', subtitle:'Um visitante do outro lado', intro:'A chuva começou a subir em vez de cair. A porta se abre sozinha, e uma mulher translúcida atravessa o balcão sem perceber. Ela olha para o próprio reflexo, mas o espelho não devolve nada.', customer:'Dona Íris, a fantasma', species:'ESPÍRITO · FALECIDA HÁ 83 ANOS', emoji:'👻', color:'violet', quote:'“Quero sentir o calor de um abraço. Só por um instante. Não me faça lembrar como morri.”', clue:'Ela pede calor, mas não quer reviver a dor. Combine uma sensação acolhedora com algo que traga paz.', recipe:['ember','moonwater'], reward:26, memory:'Íris sorri ao lembrar que já foi viva — e que isso não foi só tristeza.', lore:'Antes de desaparecer, Íris deixa uma moeda que atravessa sua mão e cai no chão. O metal tem a data de amanhã.' },
 { title:'O dragão de gravata', subtitle:'Dívidas antigas', intro:'Uma sombra enorme cobre a entrada. Um dragão minúsculo, vestido com um terno impecável, sobe em um banquinho. Ele deixa uma pilha de moedas que derretem lentamente no balcão.', customer:'Barão Cifrão, dragão falido', species:'DRACÔNICO · EX-MILIONÁRIO', emoji:'🐉', color:'orange', quote:'“Já tive sete montanhas de ouro. Agora só tenho orgulho. Sirva algo que me faça lembrar que ainda sou perigoso.”', clue:'Ele sente falta do poder e do fogo, mas seu orgulho é frágil. Um toque de brilho pode ajudar.', recipe:['ember','stardust'], reward:32, memory:'O Barão admite que sua maior fortuna era ter alguém com quem dividir o ouro.', lore:'Ele paga com uma moeda negra. Nela, você vê seu próprio rosto envelhecido por um segundo.' },
 { title:'O silêncio em pessoa', subtitle:'Aquilo que não pode ser dito', intro:'A música para no meio de uma nota. Um vulto sem rosto senta-se à mesa do canto. Mesmo o neon parece evitar iluminá-lo. Você sente que qualquer palavra pode quebrar alguma coisa.', customer:'O Visitante Sem Nome', species:'ANOMALIA · ORIGEM DESCONHECIDA', emoji:'🕴️', color:'pink', quote:'“Não quero esquecer. Quero que o mundo pare de gritar dentro de mim.”', clue:'Não é apagamento: é silêncio. Escolha o vazio com cuidado, sem apagar a memória por completo.', recipe:['void','moonwater'], reward:36, memory:'Pela primeira vez, o bar fica em paz por alguns segundos.', lore:'O visitante deixa uma cadeira vazia de presente. Você não sabe onde guardá-la, mas ela parece ocupar espaço em outro lugar.' },
 { title:'Jardim no fim', subtitle:'Uma coisa ainda pode crescer', intro:'Raízes atravessam o asfalto do lado de fora. Pequenas flores nascem entre os cacos de vidro, mesmo com o mundo acabando. Um ser coberto de folhas entra trazendo um vaso rachado.', customer:'Raiz, a última jardineira', species:'ENTIDADE BOTÂNICA · PLANETA VERDE', emoji:'🌿', color:'green', quote:'“Tudo está morrendo. Me dê um gosto que prove que ainda vale a pena plantar alguma coisa.”', clue:'Ela precisa de vida, mas também de uma lembrança que a faça continuar.', recipe:['moss','stardust'], reward:40, memory:'Raiz planta uma semente no vaso do bar. Ela pulsa como um coração minúsculo.', lore:'Uma folha nasce no vaso e aponta para o céu, onde uma estrela parou de cair.' },
 { title:'A última verdade', subtitle:'O preço de lembrar', intro:'Você encontra um envelope atrás do balcão. Dentro, uma fotografia sua ao lado de uma pessoa cujo rosto foi cuidadosamente arrancado. No verso, uma frase: “Você prometeu que me encontraria aqui.”', customer:'A Pessoa da Fotografia', species:'HUMANO? · MEMÓRIA INCOMPLETA', emoji:'🫥', color:'gold', quote:'“Você me conhece. Eu sei que conhece. Me dê algo que tenha gosto de verdade, mesmo que doa.”', clue:'Não esconda a tristeza. Uma verdade pode doer, mas precisa de uma voz para existir.', recipe:['salt','echo'], reward:46, memory:'Uma lembrança volta: este bar foi construído para alguém que você amava.', lore:'Pela primeira vez, você se lembra do próprio passado. Mas ainda falta saber por que ficou.' },
 { title:'Depois do último gole', subtitle:'A noite que escolhe o amanhã', intro:'O relógio chega a zero. Do lado de fora, o céu se abre como uma cortina. Todos os clientes que você ajudou aparecem na porta. No balcão, resta uma última garrafa, sem rótulo.', customer:'O Fim do Mundo', species:'EVENTO CÓSMICO · ÚLTIMO CLIENTE', emoji:'🌌', color:'violet', quote:'“Eu não vim destruir vocês. Vim perguntar se ainda existe alguma coisa que mereça continuar.”', clue:'Pense em tudo que aprendeu. O final depende da sua reputação, das memórias que guardou e das melhorias que escolheu.', recipe:['stardust','moss'], reward:60, memory:'O último gole não termina a história. Ele decide qual história poderá continuar.', lore:'Você ergue o copo. Pela primeira vez em sete noites, o relógio anda para a frente.' }
];

const UPGRADES = [
 { id:'cristal', name:'Cristal de leitura', icon:'🔮', cost:35, desc:'Revela uma pista extra para cada cliente.', effect:'hint' },
 { id:'prateleira', name:'Prateleira impossível', icon:'🧪', cost:45, desc:'Uma gorjeta extra de 8 créditos por pedido correto.', effect:'tip' },
 { id:'neon', name:'Neon da esperança', icon:'💡', cost:50, desc:'Sua reputação não cai tanto quando erra.', effect:'rep' },
 { id:'jukebox', name:'Jukebox de memórias', icon:'🎵', cost:60, desc:'Guarda ecos: ao fim de cada noite, recupera 1 ponto de reputação.', effect:'heart' },
];

function App() {
  const [screen, setScreen] = useState('title');
  const [night, setNight] = useState(0);
  const [credits, setCredits] = useState(30);
  const [reputation, setReputation] = useState(50);
  const [selected, setSelected] = useState([]);
  const [served, setServed] = useState(false);
  const [result, setResult] = useState(null);
  const [upgrades, setUpgrades] = useState([]);
  const [memories, setMemories] = useState([]);
  const [history, setHistory] = useState([]);
  const [hints, setHints] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [ending, setEnding] = useState('');
  const safeNight = Math.min(Math.max(night, 0), NIGHTS.length - 1);
  const customer = NIGHTS[safeNight];

  useEffect(() => { if (screen === 'game') { setSelected([]); setServed(false); setResult(null); } }, [night, screen]);

  const toggleIngredient = (id) => {
    if (served) return;
    setSelected(old => old.includes(id) ? old.filter(x => x !== id) : old.length >= 3 ? old : [...old, id]);
  };

  const mixDrink = () => {
    if (selected.length < 2) return;
    const correct = customer.recipe.every(id => selected.includes(id)) && selected.length === customer.recipe.length;
    const almost = customer.recipe.every(id => selected.includes(id));
    let earned = 0, rep = 0, title = '', message = '';
    if (correct) {
      earned = customer.reward + (upgrades.includes('prateleira') ? 8 : 0);
      rep = 12;
      title = 'PERFEITO. UM GOLE DE ESPERANÇA.';
      message = 'Você encontrou a combinação certa. O cliente relaxa, e o bar parece um pouco menos condenado.';
      setCredits(c => c + earned);
      setReputation(r => Math.min(100, r + rep));
      if (!memories.includes(night)) setMemories(m => [...m, night]);
    } else if (almost) {
      earned = Math.round(customer.reward * .4);
      rep = 3;
      title = 'QUASE LÁ.';
      message = 'Você chegou perto. O cliente aceita o copo, mas alguma coisa no sabor não encaixa.';
      setCredits(c => c + earned);
      setReputation(r => Math.min(100, r + rep));
    } else {
      rep = upgrades.includes('neon') ? -3 : -7;
      title = 'UM GOSTO DE NADA.';
      message = 'O cliente faz uma careta. O drink não conversa com o que ele pediu. Você perde um pouco da confiança da clientela.';
      setReputation(r => Math.max(0, r + rep));
    }
    setHistory(h => [...h, { night: night + 1, customer: customer.customer, correct, earned, ingredients: selected.map(id => INGREDIENTS.find(i => i.id === id).name) }]);
    setResult({ correct, earned, rep, title, message });
    setServed(true);
  };

  const nextNight = () => {
    if (night < 6) {
      setNight(n => n + 1);
      setScreen('shop');
    } else {
      const score = reputation + memories.length * 8 + upgrades.length * 4;
      setEnding(score >= 115 ? 'hope' : score >= 75 ? 'bittersweet' : 'void');
      setScreen('ending');
    }
  };

  const buyUpgrade = (u) => {
    if (credits < u.cost || upgrades.includes(u.id)) return;
    setCredits(c => c - u.cost);
    setUpgrades(a => [...a, u.id]);
  };

  const hintText = () => {
    if (upgrades.includes('cristal')) return `O cristal vibra: ${customer.recipe.map(id => INGREDIENTS.find(i => i.id === id).name).join(' + ')}.`;
    const hintsByNight = [
      'Uma voz guardada e a calma da lua. Não precisa de mais nada.',
      'Acolhimento é calor com tranquilidade, não uma chama descontrolada.',
      'Pense no fogo de um dragão e no brilho de uma fortuna perdida.',
      'O silêncio não é o mesmo que apagar tudo. Deixe um pouco de paz entrar.',
      'Algo vivo precisa de algo que faça continuar acreditando.',
      'A verdade pode arder. Dê a ela uma voz.',
      'O fim pede vida e brilho. O que você escolhe preservar?',
    ];
    return hintsByNight[night];
  };

  const startGame = () => { setNight(0); setCredits(30); setReputation(50); setSelected([]); setServed(false); setResult(null); setUpgrades([]); setMemories([]); setHistory([]); setHints(0); setScreen('intro'); };
  const getEndingText = () => {
    if (ending === 'hope') return { title:'O AMANHECER IMPROVÁVEL', emoji:'🌅', body:'As estrelas param de cair. Não porque o universo foi consertado, mas porque alguém se lembrou de como cuidar de alguém. O bar vira um farol entre mundos. Os clientes voltam, agora trazendo histórias em vez de despedidas. Você abre a porta. Lá fora, existe um amanhã.' };
    if (ending === 'bittersweet') return { title:'UMA LUZ NO ESCURO', emoji:'🕯️', body:'O mundo não volta a ser o que era. Algumas estrelas desaparecem, e algumas memórias ficam incompletas. Mas o bar permanece aceso, e há vozes conversando do lado de dentro. Talvez salvar tudo fosse impossível. Salvar alguma coisa já é um começo.' };
    return { title:'O ÚLTIMO SILÊNCIO', emoji:'🌑', body:'O último cliente termina o copo. As luzes se apagam uma a uma, até restar só o relógio. Você não salvou o mundo. Talvez ninguém pudesse. Mas, por um instante, os viajantes tiveram um lugar para descansar. O universo fecha os olhos.' };
  };

  return (
    <div className="app-shell">
      <div className="grain" />
      <header className="topbar">
        <div className="brand"><span className="brand-mark">✳</span><span>ÚLTIMA <b>DOSE</b><small>BAR DO FIM DO MUNDO</small></span></div>
        <div className="top-actions">
          {screen !== 'title' && screen !== 'intro' && screen !== 'ending' && <button className="journal-btn" onClick={() => setShowJournal(v => !v)}>▤ CADERNO <span>{memories.length}/7</span></button>}
          <button className="sound-btn" onClick={() => setSoundOn(v => !v)} title="Alternar ambiente">{soundOn ? '♫' : '♪'} <span>{soundOn ? 'SOM ON' : 'SOM OFF'}</span></button>
        </div>
      </header>

      {showJournal && <div className="journal-panel"><div className="panel-head"><h3>Caderno de memórias</h3><button onClick={() => setShowJournal(false)}>✕</button></div><p className="muted">Cada cliente deixa algo para trás. O que você conseguiu guardar?</p>{memories.length === 0 ? <p className="empty">Ainda não há memórias. Sirva drinks que toquem o coração dos visitantes.</p> : memories.map(i => <div className="memory-row" key={i}><span>✦ NOITE {i+1}</span><p>{NIGHTS[i].memory}</p></div>)}<div className="journal-foot">REPUTAÇÃO ATUAL <b>{reputation}/100</b></div></div>}

      {screen === 'title' && <main className="title-screen">
        <div className="title-copy"><div className="eyebrow"><span className="live-dot" /> ÚLTIMO ESTABELECIMENTO ANTES DO FIM</div><h1>ÚLTIMA<br/><em>DOSE.</em></h1><p className="title-lead">O universo está acabando.<br/>Alguém ainda quer conversar.</p><p className="title-desc">Sete noites. Clientes impossíveis. Drinks improváveis.<br/>Você não pode salvar todo mundo — mas pode servir o próximo copo.</p><button className="primary-btn" onClick={startGame}>ABRIR O BAR <span>↗</span></button><div className="title-foot"><span>◈ JOGO NARRATIVO</span><span>7 NOITES</span><span>FINAIS MÚLTIPLOS</span></div></div>
        <div className="bar-art"><div className="moon" /><div className="art-stars">✦　 ·　✧　　·　✦<br/>　·　✦　　 ·　✧</div><div className="art-sign">LAST<br/><i>CALL</i><small>OPEN UNTIL THE END</small></div><div className="shelf shelf-one"><span>▰</span><span>▰</span><span>▰</span><span>▰</span></div><div className="counter"><div className="glass glass-a"><i /></div><div className="glass glass-b"><i /></div><div className="bottle">✦</div></div><div className="art-caption">AQUI, ATÉ O FIM TEM GOSTO.</div></div>
        <div className="title-bottom"><span>UMA HISTÓRIA SOBRE O FIM.</span><span>FEITA DE PEQUENOS RECOMEÇOS.</span></div>
      </main>}

      {screen === 'intro' && <main className="intro-screen"><div className="intro-visual"><div className="intro-moon">☾</div><span className="intro-coordinate">23:17 — DIA ZERO</span><div className="intro-bar-symbol">✳</div></div><div className="intro-text"><div className="eyebrow">PRÓLOGO · ANTES DA PRIMEIRA NOITE</div><h2>Quando o céu<br/>começou a cair.</h2><p>Você não se lembra de quem lhe entregou a chave. Só lembra do bilhete preso à porta:</p><blockquote>“Quando o mundo acabar, alguém vai precisar de um lugar para sentar.”</blockquote><p>Agora, sete noites separam você do fim. Cada visitante traz um pedido, uma história e um pedaço de algo que talvez ainda valha a pena salvar.</p><button className="primary-btn" onClick={() => setScreen('game')}>COMEÇAR A PRIMEIRA NOITE <span>→</span></button></div></main>}

      {screen === 'game' && <main className="game-layout">
        <aside className="night-rail"><div className="rail-label">CONTAGEM REGRESSIVA</div><div className="night-number">0{night+1}<small>/07</small></div><div className="night-progress">{NIGHTS.map((n,i)=><div key={n.title} className={`progress-dot ${i < night ? 'done' : ''} ${i === night ? 'active' : ''}`} title={n.title}>{i < night ? '✓' : i+1}</div>)}</div><div className="rail-line" /><div className="rail-stats"><div><span>CRÉDITOS</span><b>◈ {credits}</b></div><div><span>REPUTAÇÃO</span><b className={reputation < 30 ? 'bad' : ''}>{reputation} <small>/100</small></b><div className="rep-track"><i style={{width:`${reputation}%`}} /></div></div><div><span>MEMÓRIAS</span><b>✦ {memories.length}/7</b></div></div><div className="rail-quote">“Até o fim do mundo merece um bom balcão.”<small>— anotação no caixa</small></div></aside>
        <section className="game-main"><div className="night-heading"><div><div className="eyebrow">NOITE {night+1} · {customer.subtitle.toUpperCase()}</div><h2>{customer.title}</h2></div><span className="weather">☄ CHUVA DE ESTRELAS</span></div><p className="story-intro">{customer.intro}</p>
          <div className={`customer-card ${customer.color}`}><div className="customer-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span>{customer.emoji}</span><div className="customer-glow" /></div><div className="customer-info"><div className="species">{customer.species}</div><h3>{customer.customer}</h3><blockquote>{customer.quote}</blockquote><div className="customer-foot"><span>CLIENTE {String(night+1).padStart(2,'0')} / 07</span><span>● AGUARDANDO PEDIDO</span></div></div></div>
          <div className="mix-area"><div className="section-heading"><div><span className="eyebrow">01 / INTERPRETE O PEDIDO</span><h3>O que vai no copo?</h3></div><span className="selection-count">{selected.length}/3 INGREDIENTES</span></div><div className="clue-box"><span className="clue-icon">✧</span><div><b>PISTA DO BALCÃO</b><p>{customer.clue} {hints > 0 && hintText()}</p></div><button className="hint-btn" onClick={() => setHints(h => h+1)} disabled={served}>⌕ {hints ? 'OUTRA PISTA' : 'PEDIR PISTA'}</button></div>
            <div className="ingredient-grid">{INGREDIENTS.map(item=><button key={item.id} disabled={served} onClick={() => toggleIngredient(item.id)} className={`ingredient ${item.tone} ${selected.includes(item.id) ? 'chosen' : ''}`}><span className="ingredient-icon">{item.icon}</span><span className="ingredient-name">{item.name}</span><span className="ingredient-desc">{item.desc}</span>{selected.includes(item.id) && <span className="check-mark">✓</span>}</button>)}</div>
            <div className="mix-footer"><div className="selected-list"><span>NA COQUETELEIRA</span><div>{selected.length ? selected.map(id=><span key={id} className="selected-chip">{INGREDIENTS.find(i=>i.id===id).icon} {INGREDIENTS.find(i=>i.id===id).name}</span>) : <i>Escolha pelo menos 2 ingredientes...</i>}</div></div><button className="serve-btn" disabled={selected.length < 2 || served} onClick={mixDrink}>MISTURAR & SERVIR <span>↗</span></button></div>
          </div>
          {result && <div className={`result-card ${result.correct ? 'success' : 'miss'}`}><div className="result-symbol">{result.correct ? '✦' : '◌'}</div><div className="result-copy"><span className="eyebrow">{result.correct ? 'PEDIDO ATENDIDO' : 'PEDIDO ENCERRADO'}</span><h3>{result.title}</h3><p>{result.message}</p><small>{result.correct ? `+${result.earned} créditos · +${result.rep} reputação · Memória guardada` : result.earned ? `+${result.earned} créditos · +${result.rep} reputação` : `${result.rep} reputação`}</small></div><button className="continue-btn" onClick={nextNight}>{night === 6 ? 'VER MEU FINAL' : 'FECHAR A NOITE'} <span>→</span></button></div>}
        </section>
      </main>}

      {screen === 'shop' && <main className="shop-screen"><div className="shop-top"><div><div className="eyebrow">INTERVALO ENTRE AS NOITES</div><h2>Melhore o balcão.</h2><p>O bar respira. Lá fora, o universo continua desmoronando.</p></div><div className="shop-wallet"><span>SEUS CRÉDITOS</span><b>◈ {credits}</b></div></div><div className="shop-scene"><div className="shop-lamp">✳</div><div><b>UMA NOITE TERMINOU.</b><p>Você tem um momento para preparar o bar para o próximo visitante. Escolha com cuidado: cada melhoria custa créditos e pode mudar seu destino.</p></div></div><div className="upgrade-grid">{UPGRADES.map(u=><article className={`upgrade-card ${upgrades.includes(u.id) ? 'purchased' : ''}`} key={u.id}><div className="upgrade-icon">{u.icon}</div><div className="upgrade-cost">{upgrades.includes(u.id) ? '✓ ADQUIRIDO' : `◈ ${u.cost}`}</div><h3>{u.name}</h3><p>{u.desc}</p><button disabled={upgrades.includes(u.id) || credits < u.cost} onClick={() => buyUpgrade(u)}>{upgrades.includes(u.id) ? 'NO SEU BALCÃO' : credits < u.cost ? 'CRÉDITOS INSUFICIENTES' : 'COMPRAR MELHORIA'}</button></article>)}</div><div className="shop-bottom"><div><span>PRÓXIMA PARADA</span><b>NOITE {String(night+2).padStart(2,'0')} — {(NIGHTS[night + 1]?.title || 'FIM DA JORNADA').toUpperCase()}</b></div><button className="primary-btn" onClick={() => setScreen('game')}>ABRIR AS PORTAS <span>→</span></button></div></main>}

      {screen === 'ending' && <main className="ending-screen"><div className="ending-stars">✦　　·　✧　　 ·　✦　　·</div><div className="ending-orb">{getEndingText().emoji}</div><div className="eyebrow">NOITE 07 · FIM DE EXPEDIENTE</div><h2>{getEndingText().title}</h2><p className="ending-body">{getEndingText().body}</p><div className="final-stats"><div><span>REPUTAÇÃO</span><b>{reputation}/100</b></div><div><span>MEMÓRIAS SALVAS</span><b>{memories.length}/7</b></div><div><span>MELHORIAS</span><b>{upgrades.length}/4</b></div><div><span>CLIENTES ATENDIDOS</span><b>{history.filter(h=>h.correct).length}/7</b></div></div><div className="ending-actions"><button className="primary-btn" onClick={startGame}>JOGAR NOVAMENTE <span>↻</span></button><button className="secondary-btn" onClick={() => {setShowJournal(true); setScreen('title');}}>REVER MEMÓRIAS</button></div><p className="ending-note">“O universo é enorme. A gentileza também pode ser.”</p></main>}

      <footer className="footer"><span>✳ ÚLTIMA DOSE</span><span>UM JOGO SOBRE ESCUTAR ANTES DE SERVIR.</span><span>© NO FIM, AINDA HÁ ESCOLHAS.</span></footer>
    </div>
  );
}

export default App;
