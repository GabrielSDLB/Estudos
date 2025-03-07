# Princípio da Responsabilidade Única (SRP)

## 📝 Descrição

O Princípio da Responsabilidade Única (Single Responsibility Principle - SRP) afirma que uma classe deve ter apenas uma razão para mudar. Em outras palavras, uma classe deve ter apenas uma responsabilidade.

## ❌ Problema (Antes)

No arquivo `problematic.ts`, temos uma classe `UserManager` que viola o SRP por ter múltiplas responsabilidades:

1. Validação de dados do usuário
2. Persistência de dados (banco de dados)
3. Envio de emails
4. Gerenciamento do ciclo de vida do usuário

### Problemas desta Abordagem:

- **Alta Complexidade**: A classe é difícil de entender e manter
- **Difícil de Testar**: Muitas responsabilidades tornam os testes mais complexos
- **Baixa Coesão**: A classe lida com conceitos não relacionados
- **Alto Acoplamento**: Mudanças em uma funcionalidade podem afetar outras
- **Código Duplicado**: Lógicas como validação podem precisar ser repetidas em outros lugares
- **Difícil Reutilização**: Não é possível reutilizar funcionalidades isoladamente

## ✅ Solução (Depois)

No arquivo `solution.ts`, separamos as responsabilidades em classes específicas:

1. `UserValidator`: Responsável pela validação de dados
2. `UserRepository`: Responsável pela persistência
3. `EmailService`: Responsável pelo envio de emails
4. `IdGenerator`: Responsável pela geração de IDs
5. `UserService`: Coordena as operações usando as outras classes

### Benefícios desta Abordagem:

- **Melhor Organização**: Cada classe tem um propósito claro
- **Facilidade de Teste**: Cada componente pode ser testado isoladamente
- **Alta Coesão**: Cada classe lida apenas com conceitos relacionados
- **Baixo Acoplamento**: Mudanças em uma classe não afetam as outras
- **Reutilização**: Componentes podem ser reutilizados em outros contextos
- **Manutenibilidade**: Mais fácil de entender e modificar
- **Escalabilidade**: Mais fácil de adicionar novas funcionalidades

## 🔄 Comparação

### Antes:
```typescript
class UserManager {
    async createUser(name, email, password) {
        // Validação
        // Criação
        // Persistência
        // Envio de Email
        // Tudo em um só lugar!
    }
}
```

### Depois:
```typescript
class UserService {
    constructor(
        private validator: UserValidator,
        private repository: UserRepository,
        private emailService: EmailService,
        private idGenerator: IdGenerator
    ) {}

    async createUser(data: UserCreateData) {
        this.validator.validateCreateData(data);
        const user = { id: this.idGenerator.generate(), ...data };
        await this.repository.save(user);
        await this.emailService.sendWelcomeEmail(user);
        return user;
    }
}
```

## 💡 Quando Aplicar

- Quando uma classe está crescendo demais
- Quando uma classe lida com múltiplos conceitos não relacionados
- Quando é difícil descrever o propósito da classe em uma frase
- Quando os métodos manipulam dados/objetos de diferentes domínios
- Quando mudanças em uma funcionalidade afetam outras partes da classe

## 🎯 Exercícios Práticos

1. Identifique outras responsabilidades que poderiam ser extraídas:
   - Logging
   - Caching
   - Autenticação
   - Autorização

2. Adicione novas funcionalidades mantendo o SRP:
   - Sistema de notificações
   - Validações customizadas
   - Diferentes tipos de persistência
   - Diferentes formatos de email

## 📚 Recursos Adicionais

- [SOLID Principles by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)
- [Refactoring Guru - SRP](https://refactoring.guru/solid-single-responsibility-principle)
- [Martin Fowler - Cohesion and Coupling](https://martinfowler.com/bliki/CouplingAndCohesion.html)
