// Implementação concreta do café simples
class CafeSimples {
    getDescricao() {
        return "☕ Café Simples";
    }
    getCusto() {
        return 2.00;
    }
}
// Implementação concreta do café expresso
class CafeExpresso {
    getDescricao() {
        return "☕ Café Expresso";
    }
    getCusto() {
        return 3.50;
    }
}
// Decorator abstrato
class DecoradorCafe {
    constructor(cafe) {
        this.cafe = cafe;
    }
    getDescricao() {
        return this.cafe.getDescricao();
    }
    getCusto() {
        return this.cafe.getCusto();
    }
}
// Decoradores concretos
class ComLeite extends DecoradorCafe {
    getDescricao() {
        return this.cafe.getDescricao() + " + 🥛 Leite";
    }
    getCusto() {
        return this.cafe.getCusto() + 1.50;
    }
}
class ComChocolate extends DecoradorCafe {
    getDescricao() {
        return this.cafe.getDescricao() + " + 🍫 Chocolate";
    }
    getCusto() {
        return this.cafe.getCusto() + 2.00;
    }
}
class ComCanela extends DecoradorCafe {
    getDescricao() {
        return this.cafe.getDescricao() + " + 🌶️ Canela";
    }
    getCusto() {
        return this.cafe.getCusto() + 0.50;
    }
}
class ComChantilly extends DecoradorCafe {
    getDescricao() {
        return this.cafe.getDescricao() + " + 🍦 Chantilly";
    }
    getCusto() {
        return this.cafe.getCusto() + 1.00;
    }
}
// Make classes globally available
window.CafeSimples = CafeSimples;
window.CafeExpresso = CafeExpresso;
window.ComLeite = ComLeite;
window.ComChocolate = ComChocolate;
window.ComCanela = ComCanela;
window.ComChantilly = ComChantilly;
//# sourceMappingURL=decorator.js.map