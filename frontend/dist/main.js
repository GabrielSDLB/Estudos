// State management
let currentPattern = null;
// Pattern-specific state
let audioPlayer = null;
let currentCafe = null;
let sistemaPedido = null;
let sistemaParticulas = null;
let controleTV = null;
let controleRadio = null;
let estruturaArquivos = null;
function initializePatternState(pattern) {
    switch (pattern) {
        case 'adapter':
            audioPlayer = new window.AudioPlayer();
            break;
        case 'facade':
            sistemaPedido = new window.SistemaPedidoFacade();
            break;
        case 'flyweight':
            const fabrica = new window.FabricaParticulas();
            sistemaParticulas = new window.SistemaParticulas(fabrica);
            break;
        case 'bridge':
            const TV = window.TV;
            const RadioFM = window.RadioFM;
            const ControleRemotoAvancado = window.ControleRemotoAvancado;
            const tvDevice = new TV();
            const radioDevice = new RadioFM();
            controleTV = new ControleRemotoAvancado(tvDevice);
            controleRadio = new ControleRemotoAvancado(radioDevice);
            break;
        case 'composite':
            estruturaArquivos = window.criarEstruturaExemplo();
            break;
    }
}
function setPattern(pattern) {
    // Reset active state of all buttons
    document.querySelectorAll('.pattern-button').forEach(btn => {
        btn.classList.remove('active');
    });
    // Set active state for clicked button
    const clickedButton = document.querySelector(`[onclick="window.setPattern('${pattern}')"]`);
    clickedButton?.classList.add('active');
    currentPattern = pattern;
    initializePatternState(pattern);
    updateDemo();
}
function updateDemo() {
    const demoContainer = document.getElementById('patternDemo');
    const descriptionElement = document.getElementById('description');
    const componentsElement = document.getElementById('components');
    const controlsElement = document.getElementById('controls');
    if (!demoContainer || !descriptionElement || !componentsElement || !controlsElement)
        return;
    // Clear previous content
    descriptionElement.innerHTML = '';
    componentsElement.innerHTML = '';
    controlsElement.innerHTML = '';
    switch (currentPattern) {
        case 'adapter':
            setupAdapterDemo(descriptionElement, componentsElement, controlsElement);
            break;
        case 'decorator':
            setupDecoratorDemo(descriptionElement, componentsElement, controlsElement);
            break;
        case 'facade':
            setupFacadeDemo(descriptionElement, componentsElement, controlsElement);
            break;
        case 'flyweight':
            setupFlyweightDemo(descriptionElement, componentsElement, controlsElement);
            break;
        case 'proxy':
            setupProxyDemo(descriptionElement, componentsElement, controlsElement);
            break;
        case 'bridge':
            setupBridgeDemo(descriptionElement, componentsElement, controlsElement);
            break;
        case 'composite':
            setupCompositeDemo(descriptionElement, componentsElement, controlsElement);
            break;
    }
}
function setupAdapterDemo(description, components, controls) {
    description.innerHTML = `
        <h2>Adapter Pattern</h2>
        <p>Este padrão permite que interfaces incompatíveis trabalhem juntas, convertendo a interface de uma classe em outra interface que o cliente espera.</p>
        <p>Neste exemplo, temos um player de mídia que suporta nativamente apenas MP3, mas usando adaptadores, podemos reproduzir outros formatos como VLC e MP4.</p>
    `;
    const mediaFiles = [
        { name: 'musica.mp3', type: 'MP3' },
        { name: 'filme.vlc', type: 'VLC' },
        { name: 'video.mp4', type: 'MP4' },
        { name: 'arquivo.wav', type: 'WAV' }
    ];
    controls.innerHTML = `
        <div class="player-section">
            <h3>Arquivos Disponíveis:</h3>
            <div class="media-buttons">
                ${mediaFiles.map(file => `
                    <button class="control-button" onclick="window.playMedia('${file.name}')">
                        ${file.type}: ${file.name}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    updatePlayerDisplay();
}
function setupDecoratorDemo(description, components, controls) {
    description.innerHTML = `
        <h2>Decorator Pattern</h2>
        <p>Este padrão permite adicionar comportamentos a objetos dinamicamente, criando uma alternativa flexível à herança.</p>
        <p>Neste exemplo, você pode criar diferentes tipos de café e adicionar complementos como leite, chocolate, canela e chantilly.</p>
    `;
    const baseOptions = [
        { name: 'CafeSimples', display: '☕ Café Simples' },
        { name: 'CafeExpresso', display: '☕ Café Expresso' }
    ];
    const decorators = [
        { name: 'ComLeite', display: '🥛 Leite' },
        { name: 'ComChocolate', display: '🍫 Chocolate' },
        { name: 'ComCanela', display: '🌶️ Canela' },
        { name: 'ComChantilly', display: '🍦 Chantilly' }
    ];
    controls.innerHTML = `
        <div class="player-section">
            <h3>Escolha seu Café Base:</h3>
            <div class="media-buttons">
                ${baseOptions.map(base => `
                    <button class="control-button" onclick="window.createBaseCoffee('${base.name}')">
                        ${base.display}
                    </button>
                `).join('')}
            </div>
            
            <h3>Adicione Complementos:</h3>
            <div class="media-buttons">
                ${decorators.map(decorator => `
                    <button class="control-button" onclick="window.addDecorator('${decorator.name}')">
                        Adicionar ${decorator.display}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    updateCafeDisplay();
}
function setupFacadeDemo(description, components, controls) {
    description.innerHTML = `
        <h2>Facade Pattern</h2>
        <p>Este padrão fornece uma interface unificada para um conjunto de interfaces em um subsistema.</p>
        <p>Neste exemplo, temos uma fachada que simplifica o processo de realizar um pedido, coordenando vários subsistemas.</p>
    `;
    controls.innerHTML = `
        <div class="player-section">
            <h3>Realizar Pedido:</h3>
            <div class="media-buttons">
                <button class="control-button" onclick="window.realizarPedidoCompleto()">
                    Fazer Pedido Completo
                </button>
            </div>
        </div>
    `;
}
function setupFlyweightDemo(description, components, controls) {
    description.innerHTML = `
        <h2>Flyweight Pattern</h2>
        <p>Este padrão minimiza o uso de memória compartilhando dados comuns entre múltiplos objetos.</p>
        <p>Neste exemplo, temos um sistema de partículas que reutiliza tipos de partículas para economizar memória.</p>
    `;
    controls.innerHTML = `
        <div class="player-section">
            <h3>Sistema de Partículas:</h3>
            <div class="media-buttons">
                <button class="control-button" onclick="window.criarParticulas()">
                    Criar Novas Partículas
                </button>
                <button class="control-button" onclick="window.mostrarEstatisticas()">
                    Mostrar Estatísticas
                </button>
            </div>
        </div>
    `;
}
function setupProxyDemo(description, components, controls) {
    description.innerHTML = `
        <h2>Proxy Pattern</h2>
        <p>Este padrão fornece um substituto ou placeholder para outro objeto para controlar o acesso a ele.</p>
        <p>Neste exemplo, demonstramos três tipos de proxies: lazy loading, cache e proteção.</p>
    `;
    controls.innerHTML = `
        <div class="player-section">
            <h3>Tipos de Proxy:</h3>
            <div class="media-buttons">
                <button class="control-button" onclick="window.carregarImagemLazy()">
                    Lazy Loading
                </button>
                <button class="control-button" onclick="window.carregarImagemCache()">
                    Cache
                </button>
                <button class="control-button" onclick="window.acessarImagemProtegida(3)">
                    Proteção (Nível 3)
                </button>
                <button class="control-button" onclick="window.acessarImagemProtegida(7)">
                    Proteção (Nível 7)
                </button>
            </div>
        </div>
    `;
}
function setupBridgeDemo(description, components, controls) {
    description.innerHTML = `
        <h2>Bridge Pattern</h2>
        <p>Este padrão separa uma abstração de sua implementação para que as duas possam variar independentemente.</p>
        <p>Neste exemplo, temos controles remotos que podem operar diferentes dispositivos (TV e Rádio).</p>
    `;
    controls.innerHTML = `
        <div class="player-section">
            <h3>Controle da TV:</h3>
            <div class="media-buttons">
                <button class="control-button" onclick="window.controlarTV('ligar')">Ligar/Desligar</button>
                <button class="control-button" onclick="window.controlarTV('volumeMais')">Volume +</button>
                <button class="control-button" onclick="window.controlarTV('volumeMenos')">Volume -</button>
                <button class="control-button" onclick="window.controlarTV('canalMais')">Canal +</button>
                <button class="control-button" onclick="window.controlarTV('canalMenos')">Canal -</button>
            </div>

            <h3>Controle do Rádio:</h3>
            <div class="media-buttons">
                <button class="control-button" onclick="window.controlarRadio('ligar')">Ligar/Desligar</button>
                <button class="control-button" onclick="window.controlarRadio('volumeMais')">Volume +</button>
                <button class="control-button" onclick="window.controlarRadio('volumeMenos')">Volume -</button>
                <button class="control-button" onclick="window.controlarRadio('frequenciaMais')">Frequência +</button>
                <button class="control-button" onclick="window.controlarRadio('frequenciaMenos')">Frequência -</button>
            </div>
        </div>
    `;
}
function setupCompositeDemo(description, components, controls) {
    description.innerHTML = `
        <h2>Composite Pattern</h2>
        <p>Este padrão permite compor objetos em estruturas de árvore para representar hierarquias parte-todo.</p>
        <p>Neste exemplo, temos um sistema de arquivos com diretórios e arquivos.</p>
    `;
    controls.innerHTML = `
        <div class="player-section">
            <h3>Sistema de Arquivos:</h3>
            <div class="media-buttons">
                <button class="control-button" onclick="window.mostrarEstrutura()">
                    Mostrar Estrutura
                </button>
                <button class="control-button" onclick="window.adicionarArquivo()">
                    Adicionar Arquivo
                </button>
                <button class="control-button" onclick="window.adicionarDiretorio()">
                    Adicionar Diretório
                </button>
                <button class="control-button" onclick="window.calcularTamanho()">
                    Calcular Tamanho
                </button>
            </div>
        </div>
    `;
    mostrarEstrutura();
}
// Pattern-specific functions
function playMedia(filename) {
    if (!audioPlayer)
        return;
    const result = audioPlayer.play(filename);
    const currentAdapter = audioPlayer.getCurrentAdapter().toUpperCase();
    const description = audioPlayer.getDescription();
    updatePlayerDisplay(result, currentAdapter, description);
}
function updatePlayerDisplay(result, adapter, description) {
    const componentsElement = document.getElementById('components');
    if (!componentsElement)
        return;
    componentsElement.innerHTML = `
        <div class="component">
            <div class="player-info">
                <h3>Player Status:</h3>
                ${adapter ? `<p><strong>Adaptador Atual:</strong> ${adapter}</p>` : ''}
                ${description ? `<p><strong>Descrição:</strong> ${description}</p>` : ''}
            </div>
            ${result ? `
                <div class="player-output">
                    <h3>Saída:</h3>
                    <p>${result}</p>
                </div>
            ` : ''}
        </div>
    `;
}
function createBaseCoffee(type) {
    const CafeClass = window[type];
    if (CafeClass) {
        currentCafe = new CafeClass();
        updateCafeDisplay();
    }
}
function addDecorator(type) {
    if (!currentCafe) {
        alert('Por favor, escolha primeiro um café base!');
        return;
    }
    const DecoratorClass = window[type];
    if (DecoratorClass) {
        currentCafe = new DecoratorClass(currentCafe);
        updateCafeDisplay();
    }
}
function updateCafeDisplay() {
    const componentsElement = document.getElementById('components');
    if (!componentsElement)
        return;
    if (!currentCafe) {
        componentsElement.innerHTML = `
            <div class="component">
                <div class="player-info">
                    <h3>Status do Café:</h3>
                    <p>Nenhum café selecionado. Escolha um café base para começar!</p>
                </div>
            </div>
        `;
        return;
    }
    componentsElement.innerHTML = `
        <div class="component">
            <div class="player-info">
                <h3>Seu Café:</h3>
                <p><strong>Descrição:</strong> ${currentCafe.getDescricao()}</p>
                <p><strong>Preço:</strong> R$ ${currentCafe.getCusto().toFixed(2)}</p>
            </div>
        </div>
    `;
}
function realizarPedidoCompleto() {
    if (!sistemaPedido)
        return;
    const result = sistemaPedido.realizarPedido("Notebook", 3500, "cliente@email.com", "Rua Principal, 123", "11999999999");
    const componentsElement = document.getElementById('components');
    if (componentsElement) {
        componentsElement.innerHTML += `
            <div class="component">
                <div class="player-output">
                    <h3>Pedido Realizado:</h3>
                    <p>✅ Pedido processado com sucesso!</p>
                </div>
            </div>
        `;
    }
}
function criarParticulas() {
    if (!sistemaParticulas)
        return;
    for (let i = 0; i < 5; i++) {
        sistemaParticulas.criarParticula(Math.random() > 0.5 ? "vermelho" : "azul", Math.random() > 0.5 ? "fogo" : "água", Math.random() > 0.5 ? 2 : 1, Math.random() * 100, Math.random() * 100, Math.random() * 5);
    }
    sistemaParticulas.renderizarParticulas();
    mostrarEstatisticas();
}
function mostrarEstatisticas() {
    if (!sistemaParticulas)
        return;
    const componentsElement = document.getElementById('components');
    if (componentsElement) {
        componentsElement.innerHTML = `
            <div class="component">
                <div class="player-info">
                    <h3>Estatísticas:</h3>
                    <p><strong>Total de Partículas:</strong> ${sistemaParticulas.getTotalParticulas()}</p>
                    <p><strong>Tipos Únicos:</strong> ${sistemaParticulas.fabrica.getTotalTipos()}</p>
                </div>
            </div>
        `;
    }
}
function carregarImagemLazy() {
    const ProxyImagem = window.ProxyImagem;
    const proxy = new ProxyImagem("foto1.jpg");
    proxy.exibir();
    atualizarProxyDisplay("Lazy Loading");
}
function carregarImagemCache() {
    const ProxyImagemComCache = window.ProxyImagemComCache;
    const proxy = new ProxyImagemComCache("foto2.jpg");
    proxy.exibir();
    setTimeout(() => proxy.exibir(), 1000);
    atualizarProxyDisplay("Cache");
}
function acessarImagemProtegida(nivel) {
    const ProxyImagemProtegida = window.ProxyImagemProtegida;
    const proxy = new ProxyImagemProtegida("foto_secreta.jpg", nivel);
    proxy.exibir();
    atualizarProxyDisplay("Proteção");
}
function atualizarProxyDisplay(tipo) {
    const componentsElement = document.getElementById('components');
    if (componentsElement) {
        componentsElement.innerHTML += `
            <div class="component">
                <div class="player-info">
                    <h3>Proxy ${tipo}:</h3>
                    <p>Verifique o console para ver os logs de acesso.</p>
                </div>
            </div>
        `;
    }
}
function controlarTV(acao) {
    if (!controleTV)
        return;
    switch (acao) {
        case 'ligar':
            controleTV.ligarDesligar();
            break;
        case 'volumeMais':
            controleTV.aumentarVolume();
            break;
        case 'volumeMenos':
            controleTV.diminuirVolume();
            break;
        case 'canalMais':
            controleTV.avancarCanal();
            break;
        case 'canalMenos':
            controleTV.voltarCanal();
            break;
    }
    atualizarDispositivoDisplay('TV');
}
function controlarRadio(acao) {
    if (!controleRadio)
        return;
    switch (acao) {
        case 'ligar':
            controleRadio.ligarDesligar();
            break;
        case 'volumeMais':
            controleRadio.aumentarVolume();
            break;
        case 'volumeMenos':
            controleRadio.diminuirVolume();
            break;
        case 'frequenciaMais':
            controleRadio.avancarCanal();
            break;
        case 'frequenciaMenos':
            controleRadio.voltarCanal();
            break;
    }
    atualizarDispositivoDisplay('Rádio');
}
function atualizarDispositivoDisplay(dispositivo) {
    const componentsElement = document.getElementById('components');
    if (componentsElement) {
        componentsElement.innerHTML += `
            <div class="component">
                <div class="player-info">
                    <h3>Status do ${dispositivo}:</h3>
                    <p>Comando executado com sucesso! Verifique o console para mais detalhes.</p>
                </div>
            </div>
        `;
    }
}
function mostrarEstrutura() {
    if (!estruturaArquivos)
        return;
    const componentsElement = document.getElementById('components');
    if (componentsElement) {
        componentsElement.innerHTML = `
            <div class="component">
                <div class="player-info">
                    <h3>Estrutura do Sistema de Arquivos:</h3>
                    <pre>${estruturaArquivos.imprimir("")}</pre>
                </div>
            </div>
        `;
    }
}
function adicionarArquivo() {
    if (!estruturaArquivos)
        return;
    const nome = prompt("Nome do arquivo:");
    const tamanho = parseInt(prompt("Tamanho do arquivo (KB):") || "0");
    if (nome && tamanho) {
        const Arquivo = window.Arquivo;
        estruturaArquivos.adicionar(new Arquivo(nome, tamanho));
        mostrarEstrutura();
    }
}
function adicionarDiretorio() {
    if (!estruturaArquivos)
        return;
    const nome = prompt("Nome do diretório:");
    if (nome) {
        const Diretorio = window.Diretorio;
        estruturaArquivos.adicionar(new Diretorio(nome));
        mostrarEstrutura();
    }
}
function calcularTamanho() {
    if (!estruturaArquivos)
        return;
    const componentsElement = document.getElementById('components');
    if (componentsElement) {
        componentsElement.innerHTML += `
            <div class="component">
                <div class="player-info">
                    <h3>Tamanho Total:</h3>
                    <p><strong>${estruturaArquivos.getTamanho()} KB</strong></p>
                </div>
            </div>
        `;
    }
}
// Make functions globally available
window.setPattern = setPattern;
window.playMedia = playMedia;
window.createBaseCoffee = createBaseCoffee;
window.addDecorator = addDecorator;
window.realizarPedidoCompleto = realizarPedidoCompleto;
window.criarParticulas = criarParticulas;
window.mostrarEstatisticas = mostrarEstatisticas;
window.carregarImagemLazy = carregarImagemLazy;
window.carregarImagemCache = carregarImagemCache;
window.acessarImagemProtegida = acessarImagemProtegida;
window.controlarTV = controlarTV;
window.controlarRadio = controlarRadio;
window.mostrarEstrutura = mostrarEstrutura;
window.adicionarArquivo = adicionarArquivo;
window.adicionarDiretorio = adicionarDiretorio;
window.calcularTamanho = calcularTamanho;
// Initialize the demo with the adapter pattern
window.onload = () => {
    setPattern('adapter');
};
//# sourceMappingURL=main.js.map