import {
    Bird,
    FlyingBird,
    SwimmingBird,
    Sparrow,
    Penguin,
    Duck,
    FlyingBirdController,
    SwimmingBirdController
} from './solution';

describe('LSP Bird Hierarchy', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('Comportamentos Base de Bird', () => {
        test('todas as aves devem comer', () => {
            const birds: Bird[] = [
                new Sparrow(),
                new Penguin(),
                new Duck()
            ];

            birds.forEach(bird => {
                bird.eat();
            });

            expect(consoleSpy).toHaveBeenCalledWith('Pardal está comendo');
            expect(consoleSpy).toHaveBeenCalledWith('Pinguim está comendo');
            expect(consoleSpy).toHaveBeenCalledWith('Pato está comendo');
        });

        test('todas as aves devem dormir', () => {
            const birds: Bird[] = [
                new Sparrow(),
                new Penguin(),
                new Duck()
            ];

            birds.forEach(bird => {
                bird.sleep();
            });

            expect(consoleSpy).toHaveBeenCalledWith('Pardal está dormindo');
            expect(consoleSpy).toHaveBeenCalledWith('Pinguim está dormindo');
            expect(consoleSpy).toHaveBeenCalledWith('Pato está dormindo');
        });
    });

    describe('FlyingBird Behavior', () => {
        test('aves voadoras devem voar e pousar corretamente', () => {
            const flyingBirds: FlyingBird[] = [
                new Sparrow(),
                new Duck()
            ];

            flyingBirds.forEach(bird => {
                bird.fly(100);
                bird.land();
            });

            expect(consoleSpy).toHaveBeenCalledWith('Pardal está voando a 100 metros de altura');
            expect(consoleSpy).toHaveBeenCalledWith('Pardal pousou no chão');
            expect(consoleSpy).toHaveBeenCalledWith('Pato está voando a 100 metros de altura');
            expect(consoleSpy).toHaveBeenCalledWith('Pato pousou na água');
        });

        test('FlyingBirdController deve funcionar com qualquer FlyingBird', () => {
            const controller = new FlyingBirdController();
            const sparrow = new Sparrow();
            const duck = new Duck();

            controller.makeTheBirdFly(sparrow, 50);
            controller.makeTheBirdFly(duck, 30);

            expect(consoleSpy).toHaveBeenCalledWith('Pardal está voando a 50 metros de altura');
            expect(consoleSpy).toHaveBeenCalledWith('Pardal pousou no chão');
            expect(consoleSpy).toHaveBeenCalledWith('Pato está voando a 30 metros de altura');
            expect(consoleSpy).toHaveBeenCalledWith('Pato pousou na água');
        });
    });

    describe('SwimmingBird Behavior', () => {
        test('aves nadadoras devem nadar corretamente', () => {
            const swimmingBirds: SwimmingBird[] = [
                new Penguin(),
                new Duck()
            ];

            swimmingBirds.forEach(bird => {
                bird.swim(5);
            });

            expect(consoleSpy).toHaveBeenCalledWith('Pinguim está nadando a 5 metros de profundidade');
            expect(consoleSpy).toHaveBeenCalledWith('Pato está nadando a 5 metros de profundidade');
        });

        test('SwimmingBirdController deve funcionar com qualquer SwimmingBird', () => {
            const controller = new SwimmingBirdController();
            const penguin = new Penguin();
            const duck = new Duck();

            controller.makeTheBirdSwim(penguin, 10);
            controller.makeTheBirdSwim(duck, 3);

            expect(consoleSpy).toHaveBeenCalledWith('Pinguim está nadando a 10 metros de profundidade');
            expect(consoleSpy).toHaveBeenCalledWith('Pato está nadando a 3 metros de profundidade');
        });
    });

    describe('Duck Special Case', () => {
        test('pato deve implementar ambas as interfaces corretamente', () => {
            const duck = new Duck();
            
            // Teste como FlyingBird
            const flyingController = new FlyingBirdController();
            flyingController.makeTheBirdFly(duck, 40);

            // Teste como SwimmingBird
            const swimmingController = new SwimmingBirdController();
            swimmingController.makeTheBirdSwim(duck, 2);

            expect(consoleSpy).toHaveBeenCalledWith('Pato está voando a 40 metros de altura');
            expect(consoleSpy).toHaveBeenCalledWith('Pato pousou na água');
            expect(consoleSpy).toHaveBeenCalledWith('Pato está nadando a 2 metros de profundidade');
        });
    });

    // Teste de Compilação (estes testes não serão executados, mas demonstram segurança de tipos)
    describe('Type Safety', () => {
        test('não deve permitir uso incorreto dos tipos', () => {
            const flyingController = new FlyingBirdController();
            const swimmingController = new SwimmingBirdController();
            const penguin = new Penguin();
            const sparrow = new Sparrow();

            // Estes comentários demonstram erros de compilação:
            // @ts-expect-error - Não deve permitir penguin voar
            // flyingController.makeTheBirdFly(penguin, 100);

            // @ts-expect-error - Não deve permitir sparrow nadar
            // swimmingController.makeTheBirdSwim(sparrow, 5);
        });
    });
});
