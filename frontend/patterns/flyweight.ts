// Estado intrínseco (compartilhado)
interface TipoParticula {
    cor: string;
    sprite: string;
    tamanho: number;
}

// Flyweight Factory
class FabricaParticulas {
    private tiposParticulas: { [key: string]: TipoParticula } = {};

    obterTipoParticula(cor: string, sprite: string, tamanho: number): TipoParticula {
        const chave = `${cor}_${sprite}_${tamanho}`;

        if (!this.tiposParticulas[chave]) {
            console.log(`Criando novo tipo de partícula: ${chave}`);
            this.tiposParticulas[chave] = { cor, sprite, tamanho };
        } else {
            console.log(`Reutilizando tipo de partícula existente: ${chave}`);
        }

        return this.tiposParticulas[chave];
    }

    getTotalTipos(): number {
        return Object.keys(this.tiposParticulas).length;
    }
}

// Estado extrínseco (único para cada partícula)
class Particula {
    private tipo: TipoParticula;
    private x: number;
    private y: number;
    private velocidade: number;

    constructor(tipo: TipoParticula, x: number, y: number, velocidade: number) {
        this.tipo = tipo;
        this.x = x;
        this.y = y;
        this.velocidade = velocidade;
    }

    renderizar(): void {
        console.log(`Renderizando partícula:
            Cor: ${this.tipo.cor}
            Sprite: ${this.tipo.sprite}
            Tamanho: ${this.tipo.tamanho}
            Posição: (${this.x}, ${this.y})
            Velocidade: ${this.velocidade}`);
    }
}

// Sistema que usa os flyweights
class SistemaParticulas {
    private particulas: Particula[] = [];
    public fabrica: FabricaParticulas;

    constructor(fabrica: FabricaParticulas) {
        this.fabrica = fabrica;
    }

    criarParticula(cor: string, sprite: string, tamanho: number, x: number, y: number, velocidade: number): void {
        const tipo = this.fabrica.obterTipoParticula(cor, sprite, tamanho);
        const particula = new Particula(tipo, x, y, velocidade);
        this.particulas.push(particula);
    }

    renderizarParticulas(): void {
        this.particulas.forEach(particula => particula.renderizar());
    }

    getTotalParticulas(): number {
        return this.particulas.length;
    }
}

// Make classes globally available
(window as any).FabricaParticulas = FabricaParticulas;
(window as any).SistemaParticulas = SistemaParticulas;
