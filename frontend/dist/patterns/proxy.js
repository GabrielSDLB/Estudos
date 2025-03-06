// Objeto real
class ImagemReal {
    constructor(arquivo) {
        this.imagemCarregada = false;
        this.arquivo = arquivo;
        this.carregar();
    }
    carregar() {
        console.log(`Carregando imagem ${this.arquivo} do disco...`);
        // Simulando um carregamento assíncrono
        setTimeout(() => {
            this.imagemCarregada = true;
            console.log(`Imagem ${this.arquivo} carregada com sucesso!`);
        }, 2000);
    }
    exibir() {
        if (this.imagemCarregada) {
            console.log(`Exibindo imagem ${this.arquivo}`);
        }
        else {
            console.log(`Aguarde, imagem ${this.arquivo} ainda está carregando...`);
        }
    }
}
// Proxy para Lazy Loading
class ProxyImagem {
    constructor(arquivo) {
        this.imagemReal = null;
        this.arquivo = arquivo;
    }
    exibir() {
        console.log("=== Proxy Lazy Loading ===");
        if (!this.imagemReal) {
            console.log("Imagem criada mas ainda não carregada");
            this.imagemReal = new ImagemReal(this.arquivo);
        }
        this.imagemReal.exibir();
    }
}
// Proxy para Cache
class ProxyImagemComCache {
    constructor(arquivo) {
        this.imagemReal = null;
        this.cacheHit = false;
        this.arquivo = arquivo;
    }
    exibir() {
        console.log("\n=== Proxy Cache ===");
        if (!this.imagemReal) {
            console.log(`Cache miss para ${this.arquivo}, carregando...`);
            this.imagemReal = new ImagemReal(this.arquivo);
        }
        else {
            console.log(`Cache hit para ${this.arquivo}!`);
            this.cacheHit = true;
        }
        this.imagemReal.exibir();
    }
}
// Proxy para Proteção
class ProxyImagemProtegida {
    constructor(arquivo, nivelAcesso) {
        this.imagemReal = null;
        this.nivelNecessario = 5;
        this.arquivo = arquivo;
        this.nivelAcesso = nivelAcesso;
    }
    exibir() {
        console.log("\n=== Proxy Proteção ===");
        if (this.nivelAcesso < this.nivelNecessario) {
            console.log("Acesso negado! Nível de permissão insuficiente.");
            return;
        }
        if (!this.imagemReal) {
            this.imagemReal = new ImagemReal(this.arquivo);
        }
        this.imagemReal.exibir();
    }
}
// Make classes globally available
window.ProxyImagem = ProxyImagem;
window.ProxyImagemComCache = ProxyImagemComCache;
window.ProxyImagemProtegida = ProxyImagemProtegida;
//# sourceMappingURL=proxy.js.map