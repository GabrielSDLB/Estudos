// ✅ Solução: Aplicando o Princípio Aberto-Fechado
// Usando interfaces e polimorfismo para permitir extensão sem modificação

// Interface que define o contrato para processadores de pagamento
export interface PaymentMethod {
    process(amount: number): void;
    getName(): string;
}

// Implementações concretas de diferentes métodos de pagamento
export class CreditCardPayment implements PaymentMethod {
    process(amount: number): void {
        console.log(`Processando pagamento de R$ ${amount} via cartão de crédito`);
        // Lógica específica de processamento de cartão de crédito
    }

    getName(): string {
        return 'Cartão de Crédito';
    }
}

export class DebitCardPayment implements PaymentMethod {
    process(amount: number): void {
        console.log(`Processando pagamento de R$ ${amount} via cartão de débito`);
        // Lógica específica de processamento de cartão de débito
    }

    getName(): string {
        return 'Cartão de Débito';
    }
}

export class PixPayment implements PaymentMethod {
    process(amount: number): void {
        console.log(`Processando pagamento de R$ ${amount} via PIX`);
        // Lógica específica de processamento de PIX
    }

    getName(): string {
        return 'PIX';
    }
}

// Classe principal que usa as implementações de PaymentMethod
export class PaymentProcessor {
    private paymentMethods: Map<string, PaymentMethod>;

    constructor() {
        this.paymentMethods = new Map();
    }

    // Método para registrar novos métodos de pagamento
    registerPaymentMethod(method: PaymentMethod): void {
        this.paymentMethods.set(method.getName().toLowerCase(), method);
    }

    // Método para processar pagamento
    processPayment(methodName: string, amount: number): void {
        const method = this.paymentMethods.get(methodName.toLowerCase());
        
        if (!method) {
            throw new Error(`Método de pagamento '${methodName}' não encontrado`);
        }

        method.process(amount);
    }

    // Método para listar métodos de pagamento disponíveis
    getAvailablePaymentMethods(): string[] {
        return Array.from(this.paymentMethods.keys());
    }
}

// ✅ Exemplo de uso:
const processor = new PaymentProcessor();

// Registrando métodos de pagamento
processor.registerPaymentMethod(new CreditCardPayment());
processor.registerPaymentMethod(new DebitCardPayment());
processor.registerPaymentMethod(new PixPayment());

// Processando pagamentos
processor.processPayment('cartão de crédito', 100);
processor.processPayment('pix', 150);

// ✅ Adicionando um novo método de pagamento (PayPal)
// Observe que não precisamos modificar nenhum código existente!
export class PayPalPayment implements PaymentMethod {
    process(amount: number): void {
        console.log(`Processando pagamento de R$ ${amount} via PayPal`);
        // Lógica específica de processamento PayPal
    }

    getName(): string {
        return 'PayPal';
    }
}

// Registrando novo método
processor.registerPaymentMethod(new PayPalPayment());
processor.processPayment('paypal', 200);

// ✅ Benefícios desta abordagem:
// 1. Respeita OCP: Podemos adicionar novos métodos sem modificar código existente
// 2. Respeita SRP: Cada classe tem uma única responsabilidade
// 3. Fácil de testar: Podemos testar cada método de pagamento isoladamente
// 4. Tipo seguro: TypeScript garante que todas as implementações seguem o contrato
// 5. Flexível: Podemos adicionar/remover métodos em tempo de execução
// 6. Manutenível: Cada método de pagamento é independente dos outros
