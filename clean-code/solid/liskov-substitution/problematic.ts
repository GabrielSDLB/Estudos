// ❌ Problema: Violação do Princípio de Substituição de Liskov
// As subclasses não podem ser usadas no lugar da classe base sem quebrar o comportamento

export class Bird {
    fly(altitude: number): void {
        console.log(`Voando a ${altitude} metros de altura`);
    }
}

// ❌ Problema: Pinguim é forçado a implementar fly(), mesmo não podendo voar
export class Penguin extends Bird {
    fly(altitude: number): void {
        // Viola LSP porque quebra o comportamento esperado de Bird
        throw new Error("Pinguins não podem voar!");
    }
}

// ❌ Problema: O código que usa Bird pode quebrar com Penguin
export class BirdController {
    makeTheBirdFly(bird: Bird, altitude: number) {
        // Este código vai quebrar se recebermos um Penguin
        bird.fly(altitude);
    }
}

// Exemplo de uso que vai quebrar:
const penguin = new Penguin();
const controller = new BirdController();

try {
    // ❌ Isso vai lançar um erro!
    controller.makeTheBirdFly(penguin, 100);
} catch (error) {
    console.error(error);
}

// ❌ Problemas desta abordagem:
// 1. Subclasse (Penguin) não pode ser usada onde a classe base (Bird) é esperada
// 2. Método fly() na classe Penguin viola a expectativa do comportamento
// 3. Código cliente precisa saber detalhes de implementação para evitar erros
// 4. Hierarquia de classes não reflete corretamente o domínio
// 5. Difícil de manter e estender sem quebrar o princípio LSP
