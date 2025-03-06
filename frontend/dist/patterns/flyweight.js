// Flyweight Factory
class FabricaParticulas {
    constructor() {
        this.tiposParticulas = {};
    }
    obterTipoParticula(cor, sprite, tamanho) {
        const chave = `${cor}_${sprite}_${tamanho}`;
        if (!this.tiposParticulas[chave]) {
            console.log(`Criando novo tipo de partícula: ${chave}`);
            this.tiposParticulas[chave] = { cor, sprite, tamanho };
        }
        else {
            console.log(`Reutilizando tipo de partícula existente: ${chave}`);
        }
        return this.tiposParticulas[chave];
    }
    getTotalTipos() {
        return Object.keys(this.tiposParticulas).length;
    }
}
// Estado extrínseco (único para cada partícula)
class Particula {
    constructor(tipo, x, y, velocidade) {
        this.tipo = tipo;
        this.x = x;
        this.y = y;
        this.velocidade = velocidade;
    }
    renderizar() {
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
    constructor(fabrica) {
        this.particulas = [];
        this.fabrica = fabrica;
    }
    criarParticula(cor, sprite, tamanho, x, y, velocidade) {
        const tipo = this.fabrica.obterTipoParticula(cor, sprite, tamanho);
        const particula = new Particula(tipo, x, y, velocidade);
        this.particulas.push(particula);
    }
    renderizarParticulas() {
        this.particulas.forEach(particula => particula.renderizar());
    }
    getTotalParticulas() {
        return this.particulas.length;
    }
}
// Make classes globally available
window.FabricaParticulas = FabricaParticulas;
window.SistemaParticulas = SistemaParticulas;
//# sourceMappingURL=flyweight.js.map