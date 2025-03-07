// ❌ Problema: Violação do Princípio Aberto-Fechado
// Esta implementação requer modificação da classe existente para adicionar novos métodos de pagamento

export class PaymentProcessor {
    processPayment(paymentType: string, amount: number): void {
        // Problema: Precisamos modificar esta classe toda vez que adicionamos um novo método de pagamento
        if (paymentType === 'credit_card') {
            this.processCreditCardPayment(amount);
        } else if (paymentType === 'debit_card') {
            this.processDebitCardPayment(amount);
        } else if (paymentType === 'pix') {
            this.processPixPayment(amount);
        }
        // Se quisermos adicionar um novo método de pagamento (ex: PayPal),
        // precisamos modificar esta classe e adicionar mais um if
    }

    private processCreditCardPayment(amount: number): void {
        console.log(`Processando pagamento de R$ ${amount} via cartão de crédito`);
        // Lógica de processamento de cartão de crédito
    }

    private processDebitCardPayment(amount: number): void {
        console.log(`Processando pagamento de R$ ${amount} via cartão de débito`);
        // Lógica de processamento de cartão de débito
    }

    private processPixPayment(amount: number): void {
        console.log(`Processando pagamento de R$ ${amount} via PIX`);
        // Lógica de processamento de PIX
    }
}

// Exemplo de uso:
const processor = new PaymentProcessor();
processor.processPayment('credit_card', 100);
processor.processPayment('pix', 150);

// ❌ Problemas desta abordagem:
// 1. Violação do OCP: Precisamos modificar a classe para adicionar novos métodos
// 2. Violação do SRP: A classe conhece detalhes de implementação de todos os métodos
// 3. Difícil de testar: Precisamos testar toda a classe quando adicionamos um novo método
// 4. Propenso a erros: Podemos esquecer de adicionar um novo case no if
// 5. Baixa coesão: A classe lida com diferentes tipos de pagamento
