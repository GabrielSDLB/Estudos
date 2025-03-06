// Interface comum
interface Imagem {
    exibir(): void;
}

// Objeto real
class ImagemReal implements Imagem {
    private arquivo: string;
    private imagemCarregada: boolean = false;

    constructor(arquivo: string) {
        this.arquivo = arquivo;
        this.carregar();
    }

    private carregar(): void {
        console.log(`Carregando imagem ${this.arquivo} do disco...`);
        // Simulando um carregamento assíncrono
        setTimeout(() => {
            this.imagemCarregada = true;
            console.log(`Imagem ${this.arquivo} carregada com sucesso!`);
        }, 2000);
    }

    exibir(): void {
        if (this.imagemCarregada) {
            console.log(`Exibindo imagem ${this.arquivo}`);
        } else {
            console.log(`Aguarde, imagem ${this.arquivo} ainda está carregando...`);
        }
    }
}

// Proxy para Lazy Loading
class ProxyImagem implements Imagem {
    private imagemReal: ImagemReal | null = null;
    private arquivo: string;

    constructor(arquivo: string) {
        this.arquivo = arquivo;
    }

    exibir(): void {
        console.log("=== Proxy Lazy Loading ===");
        if (!this.imagemReal) {
            console.log("Imagem criada mas ainda não carregada");
            this.imagemReal = new ImagemReal(this.arquivo);
        }
        this.imagemReal.exibir();
    }
}

// Proxy para Cache
class ProxyImagemComCache implements Imagem {
    private imagemReal: ImagemReal | null = null;
    private arquivo: string;
    private cacheHit: boolean = false;

    constructor(arquivo: string) {
        this.arquivo = arquivo;
    }

    exibir(): void {
        console.log("\n=== Proxy Cache ===");
        if (!this.imagemReal) {
            console.log(`Cache miss para ${this.arquivo}, carregando...`);
            this.imagemReal = new ImagemReal(this.arquivo);
        } else {
            console.log(`Cache hit para ${this.arquivo}!`);
            this.cacheHit = true;
        }
        this.imagemReal.exibir();
    }
}

// Proxy para Proteção
class ProxyImagemProtegida implements Imagem {
    private imagemReal: ImagemReal | null = null;
    private arquivo: string;
    private nivelAcesso: number;
    private nivelNecessario: number = 5;

    constructor(arquivo: string, nivelAcesso: number) {
        this.arquivo = arquivo;
        this.nivelAcesso = nivelAcesso;
    }

    exibir(): void {
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
(window as any).ProxyImagem = ProxyImagem;
(window as any).ProxyImagemComCache = ProxyImagemComCache;
(window as any).ProxyImagemProtegida = ProxyImagemProtegida;
