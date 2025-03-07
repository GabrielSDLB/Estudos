import {
    PaymentMethod,
    PaymentProcessor,
    CreditCardPayment,
    DebitCardPayment,
    PixPayment,
    PayPalPayment
} from './solution';

// Mock de um novo método de pagamento para testes
class MockPaymentMethod implements PaymentMethod {
    private processedAmount: number | null = null;

    process(amount: number): void {
        this.processedAmount = amount;
    }

    getName(): string {
        return 'Mock Payment';
    }

    getProcessedAmount(): number | null {
        return this.processedAmount;
    }
}

describe('PaymentProcessor', () => {
    let processor: PaymentProcessor;
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        processor = new PaymentProcessor();
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('Registro de Métodos de Pagamento', () => {
        test('deve registrar um novo método de pagamento', () => {
            const mockPayment = new MockPaymentMethod();
            processor.registerPaymentMethod(mockPayment);

            const methods = processor.getAvailablePaymentMethods();
            expect(methods).toContain('mock payment');
        });

        test('deve registrar múltiplos métodos de pagamento', () => {
            processor.registerPaymentMethod(new CreditCardPayment());
            processor.registerPaymentMethod(new DebitCardPayment());
            processor.registerPaymentMethod(new PixPayment());

            const methods = processor.getAvailablePaymentMethods();
            expect(methods).toHaveLength(3);
            expect(methods).toContain('cartão de crédito');
            expect(methods).toContain('cartão de débito');
            expect(methods).toContain('pix');
        });
    });

    describe('Processamento de Pagamentos', () => {
        test('deve processar pagamento com método válido', () => {
            const mockPayment = new MockPaymentMethod();
            processor.registerPaymentMethod(mockPayment);

            processor.processPayment('mock payment', 100);
            expect(mockPayment.getProcessedAmount()).toBe(100);
        });

        test('deve lançar erro para método de pagamento não registrado', () => {
            expect(() => {
                processor.processPayment('método inexistente', 100);
            }).toThrow('Método de pagamento \'método inexistente\' não encontrado');
        });

        test('deve processar pagamento com cartão de crédito', () => {
            processor.registerPaymentMethod(new CreditCardPayment());
            processor.processPayment('cartão de crédito', 150);

            expect(consoleSpy).toHaveBeenCalledWith(
                'Processando pagamento de R$ 150 via cartão de crédito'
            );
        });

        test('deve processar pagamento com PIX', () => {
            processor.registerPaymentMethod(new PixPayment());
            processor.processPayment('pix', 200);

            expect(consoleSpy).toHaveBeenCalledWith(
                'Processando pagamento de R$ 200 via PIX'
            );
        });
    });
});

describe('Implementações de PaymentMethod', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('CreditCardPayment deve implementar corretamente', () => {
        const payment = new CreditCardPayment();
        
        expect(payment.getName()).toBe('Cartão de Crédito');
        
        payment.process(100);
        expect(consoleSpy).toHaveBeenCalledWith(
            'Processando pagamento de R$ 100 via cartão de crédito'
        );
    });

    test('DebitCardPayment deve implementar corretamente', () => {
        const payment = new DebitCardPayment();
        
        expect(payment.getName()).toBe('Cartão de Débito');
        
        payment.process(150);
        expect(consoleSpy).toHaveBeenCalledWith(
            'Processando pagamento de R$ 150 via cartão de débito'
        );
    });

    test('PixPayment deve implementar corretamente', () => {
        const payment = new PixPayment();
        
        expect(payment.getName()).toBe('PIX');
        
        payment.process(200);
        expect(consoleSpy).toHaveBeenCalledWith(
            'Processando pagamento de R$ 200 via PIX'
        );
    });

    test('PayPalPayment deve implementar corretamente', () => {
        const payment = new PayPalPayment();
        
        expect(payment.getName()).toBe('PayPal');
        
        payment.process(250);
        expect(consoleSpy).toHaveBeenCalledWith(
            'Processando pagamento de R$ 250 via PayPal'
        );
    });
});

// Demonstração de extensibilidade: Adicionando um novo método de pagamento
describe('Extensibilidade', () => {
    class CryptoPayment implements PaymentMethod {
        process(amount: number): void {
            console.log(`Processando pagamento de R$ ${amount} via Cryptocurrency`);
        }

        getName(): string {
            return 'Cryptocurrency';
        }
    }

    test('deve ser possível adicionar novo método de pagamento', () => {
        const processor = new PaymentProcessor();
        const cryptoPayment = new CryptoPayment();
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        processor.registerPaymentMethod(cryptoPayment);
        processor.processPayment('cryptocurrency', 300);

        expect(consoleSpy).toHaveBeenCalledWith(
            'Processando pagamento de R$ 300 via Cryptocurrency'
        );

        consoleSpy.mockRestore();
    });
});
