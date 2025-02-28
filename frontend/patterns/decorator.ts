// Interface base para café
interface Cafe {
    getDescricao(): string;
    getCusto(): number;
}

// Implementação concreta do café básico
class CafeSimples implements Cafe {
    getDescricao(): string {
        return "Café Simples";
    }

    getCusto(): number {
        return 5.00;
    }
}

// Implementação concreta de outro tipo de café base
class CafeExpresso implements Cafe {
    getDescricao(): string {
        return "Café Expresso";
    }

    getCusto(): number {
        return 7.00;
    }
}

// Decorador base abstrato
abstract class DecoradorCafe implements Cafe {
    protected cafe: Cafe;

    constructor(cafe: Cafe) {
        this.cafe = cafe;
    }

    getDescricao(): string {
        return this.cafe.getDescricao();
    }

    getCusto(): number {
        return this.cafe.getCusto();
    }
}

// Decorador concreto para adicionar leite
class ComLeite extends DecoradorCafe {
    getDescricao(): string {
        return `${this.cafe.getDescricao()}, com Leite`;
    }

    getCusto(): number {
        return this.cafe.getCusto() + 2.00;
    }
}

// Decorador concreto para adicionar chocolate
class ComChocolate extends DecoradorCafe {
    getDescricao(): string {
        return `${this.cafe.getDescricao()}, com Chocolate`;
    }

    getCusto(): number {
        return this.cafe.getCusto() + 3.00;
    }
}

// Decorador concreto para adicionar canela
class ComCanela extends DecoradorCafe {
    getDescricao(): string {
        return `${this.cafe.getDescricao()}, com Canela`;
    }

    getCusto(): number {
        return this.cafe.getCusto() + 1.50;
    }
}

// Decorador concreto para adicionar chantilly
class ComChantilly extends DecoradorCafe {
    getDescricao(): string {
        return `${this.cafe.getDescricao()}, com Chantilly`;
    }

    getCusto(): number {
        return this.cafe.getCusto() + 2.50;
    }
}

// Exemplo de uso
// Criando um café expresso com leite e chocolate
let meuCafe: Cafe = new CafeExpresso();
meuCafe = new ComLeite(meuCafe);
meuCafe = new ComChocolate(meuCafe);
console.log(`Pedido: ${meuCafe.getDescricao()}`);
console.log(`Valor Total: R$ ${meuCafe.getCusto().toFixed(2)}`);

// Criando um café simples com canela e chantilly
let outroCafe: Cafe = new CafeSimples();
outroCafe = new ComCanela(outroCafe);
outroCafe = new ComChantilly(outroCafe);
console.log(`\nPedido: ${outroCafe.getDescricao()}`);
console.log(`Valor Total: R$ ${outroCafe.getCusto().toFixed(2)}`);
