// Interface comum para arquivos e diretórios
interface ComponenteArquivo {
    getNome(): string;
    getTamanho(): number;
    imprimir(prefixo: string): string;
}

// Leaf - Arquivo
class Arquivo implements ComponenteArquivo {
    private nome: string;
    private tamanho: number;

    constructor(nome: string, tamanho: number) {
        this.nome = nome;
        this.tamanho = tamanho;
    }

    getNome(): string {
        return this.nome;
    }

    getTamanho(): number {
        return this.tamanho;
    }

    imprimir(prefixo: string): string {
        return `${prefixo}📄 ${this.nome} (${this.tamanho} KB)\n`;
    }
}

// Composite - Diretório
class Diretorio implements ComponenteArquivo {
    private nome: string;
    private componentes: ComponenteArquivo[] = [];

    constructor(nome: string) {
        this.nome = nome;
    }

    getNome(): string {
        return this.nome;
    }

    getTamanho(): number {
        return this.componentes.reduce((total, componente) => total + componente.getTamanho(), 0);
    }

    adicionar(componente: ComponenteArquivo): void {
        this.componentes.push(componente);
    }

    remover(componente: ComponenteArquivo): void {
        const index = this.componentes.indexOf(componente);
        if (index !== -1) {
            this.componentes.splice(index, 1);
        }
    }

    imprimir(prefixo: string): string {
        let resultado = `${prefixo}📁 ${this.nome} (${this.getTamanho()} KB)\n`;
        this.componentes.forEach(componente => {
            resultado += componente.imprimir(prefixo + "  ");
        });
        return resultado;
    }
}

// Exemplo de uso
function criarEstruturaExemplo(): Diretorio {
    const raiz = new Diretorio("raiz");

    // Diretório de documentos
    const documentos = new Diretorio("documentos");
    documentos.adicionar(new Arquivo("relatorio.pdf", 1200));
    documentos.adicionar(new Arquivo("apresentacao.pptx", 2800));
    raiz.adicionar(documentos);

    // Diretório de imagens
    const imagens = new Diretorio("imagens");
    imagens.adicionar(new Arquivo("foto1.jpg", 500));
    imagens.adicionar(new Arquivo("foto2.jpg", 600));

    // Subdiretório de férias
    const ferias = new Diretorio("ferias");
    ferias.adicionar(new Arquivo("praia1.jpg", 700));
    ferias.adicionar(new Arquivo("praia2.jpg", 800));
    imagens.adicionar(ferias);
    raiz.adicionar(imagens);

    // Diretório de músicas
    const musicas = new Diretorio("musicas");
    musicas.adicionar(new Arquivo("musica1.mp3", 300));
    musicas.adicionar(new Arquivo("musica2.mp3", 400));
    raiz.adicionar(musicas);

    return raiz;
}

// Make classes globally available
(window as any).Arquivo = Arquivo;
(window as any).Diretorio = Diretorio;
(window as any).criarEstruturaExemplo = criarEstruturaExemplo;
