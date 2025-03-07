// ✅ Solução: Aplicando o Princípio de Substituição de Liskov
// Modelando a hierarquia corretamente com interfaces e classes apropriadas

// Interface base para todas as aves
export interface Bird {
    eat(): void;
    sleep(): void;
}

// Interface específica para aves que voam
export interface FlyingBird extends Bird {
    fly(altitude: number): void;
    land(): void;
}

// Interface específica para aves que nadam
export interface SwimmingBird extends Bird {
    swim(depth: number): void;
}

// Implementação base com comportamentos comuns
export abstract class BirdBase implements Bird {
    constructor(protected name: string) {}

    eat(): void {
        console.log(`${this.name} está comendo`);
    }

    sleep(): void {
        console.log(`${this.name} está dormindo`);
    }
}

// Ave que voa
export class Sparrow extends BirdBase implements FlyingBird {
    constructor() {
        super("Pardal");
    }

    fly(altitude: number): void {
        console.log(`${this.name} está voando a ${altitude} metros de altura`);
    }

    land(): void {
        console.log(`${this.name} pousou no chão`);
    }
}

// Ave que nada
export class Penguin extends BirdBase implements SwimmingBird {
    constructor() {
        super("Pinguim");
    }

    swim(depth: number): void {
        console.log(`${this.name} está nadando a ${depth} metros de profundidade`);
    }
}

// Controladores específicos para cada tipo de ave
export class FlyingBirdController {
    makeTheBirdFly(bird: FlyingBird, altitude: number) {
        bird.fly(altitude);
        bird.land();
    }
}

export class SwimmingBirdController {
    makeTheBirdSwim(bird: SwimmingBird, depth: number) {
        bird.swim(depth);
    }
}

// ✅ Exemplo de uso correto:
const sparrow = new Sparrow();
const penguin = new Penguin();

const flyingController = new FlyingBirdController();
const swimmingController = new SwimmingBirdController();

// Comportamentos comuns funcionam para todas as aves
sparrow.eat();    // OK
sparrow.sleep();  // OK
penguin.eat();    // OK
penguin.sleep();  // OK

// Comportamentos específicos são garantidos pelo tipo
flyingController.makeTheBirdFly(sparrow, 100);  // OK
swimmingController.makeTheBirdSwim(penguin, 20); // OK

// ✅ O compilador TypeScript impede usos incorretos:
// flyingController.makeTheBirdFly(penguin, 100);  // Erro de compilação!
// swimmingController.makeTheBirdSwim(sparrow, 20); // Erro de compilação!

// ✅ Benefícios desta abordagem:
// 1. Substituição segura: Subtipos podem ser usados onde seus tipos base são esperados
// 2. Comportamentos específicos são garantidos por interfaces
// 3. Código cliente trabalha com abstrações apropriadas
// 4. Hierarquia reflete corretamente o domínio
// 5. Fácil de estender sem quebrar o LSP

// Exemplo de extensão que mantém LSP:
export class Duck extends BirdBase implements FlyingBird, SwimmingBird {
    constructor() {
        super("Pato");
    }

    fly(altitude: number): void {
        console.log(`${this.name} está voando a ${altitude} metros de altura`);
    }

    land(): void {
        console.log(`${this.name} pousou na água`);
    }

    swim(depth: number): void {
        console.log(`${this.name} está nadando a ${depth} metros de profundidade`);
    }
}

// O pato pode ser usado em ambos os controladores!
const duck = new Duck();
flyingController.makeTheBirdFly(duck, 50);    // OK
swimmingController.makeTheBirdSwim(duck, 5);  // OK
