# Princípio Aberto-Fechado (OCP)

## 📝 Descrição

O Princípio Aberto-Fechado (Open-Closed Principle - OCP) afirma que entidades de software (classes, módulos, funções, etc.) devem estar:
- **Abertas para extensão**: Podemos adicionar novo comportamento
- **Fechadas para modificação**: O código existente não deve ser alterado

## ❌ Problema (Antes)

No arquivo `problematic.ts`, temos uma classe `PaymentProcessor` que viola o OCP:

```typescript
class PaymentProcessor {
    processPayment(paymentType: string, amount: number) {
        if (paymentType === 'credit_card') {
            // processo cartão de crédito
        } else if (paymentType === 'debit_card') {
            // processo cartão de débito
        } else if (paymentType === 'pix') {
            // processo pix
        }
        // Precisamos modificar esta classe para cada novo método!
    }
}
```

### Problemas desta Abordagem:

1. **Modificação Constante**: Precisamos alterar a classe para cada novo método de pagamento
2. **Código Frágil**: Mudanças podem afetar métodos existentes
3. **Difícil Manutenção**: A classe cresce indefinidamente
4. **Alto Acoplamento**: A classe conhece todos os tipos de pagamento
5. **Violação do SRP**: A classe lida com múltiplos tipos de pagamento

## ✅ Solução (Depois)

No arquivo `solution.ts`, aplicamos o OCP usando interfaces e polimorfismo:

```typescript
interface PaymentMethod {
    process(amount: number): void;
    getName(): string;
}

class CreditCardPayment implements PaymentMethod {
    process(amount: number) {
        // Implementação específica
    }
    getName(): string {
        return 'Cartão de Crédito';
    }
}

class PaymentProcessor {
    private paymentMethods = new Map<string, PaymentMethod>();

    registerPaymentMethod(method: PaymentMethod) {
        this.paymentMethods.set(method.getName().toLowerCase(), method);
    }

    processPayment(methodName: string, amount: number) {
        const method = this.paymentMethods.get(methodName.toLowerCase());
        method?.process(amount);
    }
}
```

### Benefícios desta Abordagem:

1. **Extensibilidade**: Novos métodos de pagamento podem ser adicionados sem modificar código existente
2. **Manutenibilidade**: Cada método de pagamento é independente
3. **Testabilidade**: Fácil testar cada implementação isoladamente
4. **Baixo Acoplamento**: Classes não conhecem implementações específicas
5. **Reutilização**: Implementações podem ser usadas em diferentes contextos

## 🎯 Casos de Uso

O OCP é útil em vários cenários:

1. **Plugins e Extensões**
   - Sistemas de plugins
   - Frameworks extensíveis
   - Arquiteturas modulares

2. **Processamento de Dados**
   - Diferentes formatos de arquivo
   - Diversos protocolos de comunicação
   - Múltiplos formatos de saída

3. **Regras de Negócio**
   - Cálculos de desconto
   - Validações customizadas
   - Estratégias de precificação

4. **Integrações**
   - Gateways de pagamento
   - Provedores de serviço
   - APIs externas

## 💡 Dicas de Implementação

1. **Use Abstrações**
   - Interfaces definem contratos
   - Classes abstratas para comportamento comum
   - Dependency Injection para flexibilidade

2. **Evite Condicionais**
   - Substitua ifs por polimorfismo
   - Use padrões como Strategy e Factory
   - Implemente Registry quando necessário

3. **Planeje para Extensão**
   - Identifique pontos de variação
   - Crie interfaces coesas
   - Documente pontos de extensão

## 🔄 Exercícios Práticos

1. **Adicione Novos Métodos de Pagamento**
   - Boleto Bancário
   - Cryptocurrency
   - Apple Pay/Google Pay

2. **Implemente Validações**
   - Limite de valor por método
   - Restrições por região
   - Verificações de segurança

3. **Adicione Funcionalidades**
   - Logging de transações
   - Notificações de pagamento
   - Relatórios de processamento

## 📚 Recursos Adicionais

- [SOLID Principles by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html)
- [Refactoring Guru - OCP](https://refactoring.guru/solid-principles/open-closed)
- [Design Patterns - Strategy Pattern](https://refactoring.guru/design-patterns/strategy)
