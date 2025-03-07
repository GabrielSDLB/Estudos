# Princípio da Inversão de Dependência (DIP)

## 📝 Descrição

O Princípio da Inversão de Dependência (Dependency Inversion Principle - DIP) possui duas regras principais:

1. Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.
2. Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

## ❌ Problema (Antes)

No arquivo `problematic.ts`, temos classes que dependem diretamente de implementações:

```typescript
class UserRepository {
    private database: MySQLDatabase;
    
    constructor() {
        // ❌ Dependência direta de implementação
        this.database = new MySQLDatabase();
    }
}

class UserService {
    private repository: UserRepository;
    
    constructor() {
        // ❌ Dependência direta de implementação
        this.repository = new UserRepository();
    }
}
```

### Problemas desta Abordagem:

1. **Alto Acoplamento**: Classes são fortemente ligadas a implementações específicas
2. **Difícil de Testar**: Não é possível mockar dependências
3. **Inflexível**: Trocar implementações requer mudanças no código
4. **Violação de SRP**: Classes conhecem detalhes de implementação
5. **Difícil Manutenção**: Mudanças afetam múltiplas classes

## ✅ Solução (Depois)

No arquivo `solution.ts`, aplicamos DIP usando interfaces e injeção de dependência:

```typescript
interface Database {
    connect(): Promise<void>;
    query<T>(sql: string, params?: any[]): Promise<T[]>;
    disconnect(): Promise<void>;
}

interface UserRepository {
    save(user: User): Promise<User>;
    findById(id: number): Promise<User | null>;
}

class UserService {
    constructor(
        private userRepository: UserRepository,
        private logger: Logger
    ) {}
}
```

### Benefícios desta Abordagem:

1. **Baixo Acoplamento**: Classes dependem de abstrações
2. **Testabilidade**: Fácil mockar dependências
3. **Flexibilidade**: Fácil trocar implementações
4. **Manutenibilidade**: Mudanças são isoladas
5. **Reutilização**: Componentes são independentes

## 🎯 Casos de Uso

O DIP é fundamental em vários cenários:

1. **Persistência de Dados**
   - Diferentes bancos de dados
   - Cache systems
   - File storage

2. **Serviços Externos**
   - APIs
   - Gateways de pagamento
   - Serviços de email

3. **Logging e Monitoramento**
   - Diferentes destinos de log
   - Métricas
   - Rastreamento

4. **Configuração**
   - Diferentes fontes de configuração
   - Feature flags
   - Ambientes

## 💡 Como Implementar

1. **Identifique Abstrações**
   ```typescript
   interface PaymentGateway {
       processPayment(amount: number): Promise<void>;
   }
   ```

2. **Use Injeção de Dependência**
   ```typescript
   class PaymentService {
       constructor(private gateway: PaymentGateway) {}
   }
   ```

3. **Crie Implementações**
   ```typescript
   class StripeGateway implements PaymentGateway {
       processPayment(amount: number): Promise<void> {
           // Implementação Stripe
       }
   }
   ```

## 🔄 Padrões Relacionados

1. **Factory Method**
   ```typescript
   interface DatabaseFactory {
       createDatabase(): Database;
   }
   ```

2. **Abstract Factory**
   ```typescript
   interface ServiceFactory {
       createUserService(): UserService;
       createPaymentService(): PaymentService;
   }
   ```

3. **Strategy Pattern**
   ```typescript
   interface LogStrategy {
       log(message: string): void;
   }
   ```

## 📚 Exemplos Práticos

1. **Configuração de Serviços**
```typescript
// Container de Dependências
class ServiceContainer {
    private static instance: ServiceContainer;
    private services: Map<string, any>;

    registerService<T>(token: string, implementation: T): void {
        this.services.set(token, implementation);
    }

    getService<T>(token: string): T {
        return this.services.get(token);
    }
}
```

2. **Testes com Mocks**
```typescript
class MockDatabase implements Database {
    async query<T>(): Promise<T[]> {
        return [];
    }
}

describe('UserService', () => {
    const mockDb = new MockDatabase();
    const service = new UserService(mockDb);
    // Testes...
});
```

## 🎓 Dicas de Implementação

1. **Defina Interfaces Claras**
   - Contratos bem definidos
   - Métodos coesos
   - Documentação clara

2. **Use Injeção de Dependência**
   - Constructor injection
   - Method injection
   - Property injection

3. **Crie Factories quando Necessário**
   - Centralizar criação
   - Gerenciar ciclo de vida
   - Configurar dependências

4. **Considere um Container DI**
   - Gerenciamento automático
   - Resolução de dependências
   - Ciclo de vida de objetos

## 📖 Recursos Adicionais

- [Martin Fowler - Inversion of Control](https://martinfowler.com/articles/injection.html)
- [SOLID Principles by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)
- [Dependency Injection in TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

## 🚀 Próximos Passos

1. **Implemente Containers DI**
   - InversifyJS
   - TypeDI
   - tsyringe

2. **Adicione Logging**
   - Winston
   - Bunyan
   - Pino

3. **Configure Monitoramento**
   - Métricas
   - Tracing
   - Health checks

4. **Implemente Testes**
   - Unit tests
   - Integration tests
   - E2E tests
