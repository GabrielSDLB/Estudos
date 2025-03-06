// Interface base para todos os cafés
interface Cafe {
    getDescricao(): string;
    getCusto(): number;
}

// Implementação concreta do café simples
class CafeSimples implements Cafe {
    getDescricao(): string {
        return "☕ Café Simples";
    }

    getCusto(): number {
        return 2.00;
    }
}

// Implementação concreta do café expresso
class CafeExpresso implements Cafe {
    getDescricao(): string {
        return "☕ Café Expresso";
    }

    getCusto(): number {
        return 3.50;
    }
}

// Decorator abstrato
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

// Decoradores concretos
class ComLeite extends DecoradorCafe {
    getDescricao(): string {
        return this.cafe.getDescricao() + " + 🥛 Leite";
    }

    getCusto(): number {
        return this.cafe.getCusto() + 1.50;
    }
}

class ComChocolate extends DecoradorCafe {
    getDescricao(): string {
        return this.cafe.getDescricao() + " + 🍫 Chocolate";
    }

    getCusto(): number {
        return this.cafe.getCusto() + 2.00;
    }
}

class ComCanela extends DecoradorCafe {
    getDescricao(): string {
        return this.cafe.getDescricao() + " + 🌶️ Canela";
    }

    getCusto(): number {
        return this.cafe.getCusto() + 0.50;
    }
}

class ComChantilly extends DecoradorCafe {
    getDescricao(): string {
        return this.cafe.getDescricao() + " + 🍦 Chantilly";
    }

    getCusto(): number {
        return this.cafe.getCusto() + 1.00;
    }
}

// Make classes globally available
(window as any).CafeSimples = CafeSimples;
(window as any).CafeExpresso = CafeExpresso;
(window as any).ComLeite = ComLeite;
(window as any).ComChocolate = ComChocolate;
(window as any).ComCanela = ComCanela;
(window as any).ComChantilly = ComChantilly;
