# Princípio de Substituição de Liskov (LSP)

## 📝 Descrição

O Princípio de Substituição de Liskov (Liskov Substitution Principle - LSP) afirma que:
> "Objetos de uma superclasse devem poder ser substituídos por objetos de uma subclasse sem afetar a corretude do programa."

Em outras palavras, se S é um subtipo de T, então objetos do tipo T podem ser substituídos por objetos do tipo S sem alterar as propriedades desejáveis do programa.

## ❌ Problema (Antes)

No arquivo `problematic.ts`, temos uma hierarquia problemática de aves:

```typescript
class Bird {
    fly(altitude: number): void {
        console.log(`Voando a ${altitude} metros`);
    }
}

class Penguin extends Bird {
    fly(altitude: number): void {
        // ❌ Viola LSP!
        throw new Error("Pinguins não podem voar!");
    }
}
```

### Problemas desta Abordagem:

1. **Violação do Contrato**: Pinguim quebra o comportamento esperado de Bird
2. **Exceções Inesperadas**: Código cliente pode quebrar ao receber um Pinguim
3. **Modelagem Incorreta**: A hierarquia não reflete o mundo real
4. **Fragilidade**: Difícil adicionar novos tipos de aves sem violar LSP
5. **Acoplamento**: Código cliente precisa conhecer detalhes de implementação

## ✅ Solução (Depois)

No arquivo `solution.ts`, aplicamos LSP através de interfaces apropriadas:

```typescript
interface Bird {
    eat(): void;
    sleep(): void;
}

interface FlyingBird extends Bird {
    fly(altitude: number): void;
    land(): void;
}

interface SwimmingBird extends Bird {
    swim(depth: number): void;
}

class Sparrow implements FlyingBird {
    // Implementa comportamentos de voo
}

class Penguin implements SwimmingBird {
    // Implementa comportamentos de natação
}
```

### Benefícios desta Abordagem:

1. **Substituição Segura**: Subtipos podem ser usados de forma segura
2. **Contratos Claros**: Interfaces definem comportamentos esperados
3. **Modelagem Correta**: Hierarquia reflete o domínio real
4. **Extensibilidade**: Fácil adicionar novos tipos sem quebrar LSP
5. **Baixo Acoplamento**: Código cliente depende de abstrações

## 🎯 Casos de Uso

O LSP é fundamental em vários cenários:

1. **Frameworks e Bibliotecas**
   - Plugins substituíveis
   - Extensões de funcionalidade
   - Implementações alternativas

2. **Padrões de Design**
   - Strategy Pattern
   - Template Method
   - Factory Method

3. **Arquitetura de Software**
   - Inversão de dependência
   - Injeção de dependência
   - Composição sobre herança

4. **Testes**
   - Mocks e Stubs
   - Testes de integração
   - Testes de unidade

## 💡 Como Identificar Violações do LSP

1. **Métodos que Lançam Exceções**
   - Subclasse não pode executar operação
   - Comportamento inesperado
   - Pré-condições mais restritivas

2. **Métodos que Retornam Null**
   - Quando a superclasse sempre retorna um valor
   - Quebra de contrato implícito

3. **Verificações de Tipo**
   - Código cliente precisa verificar tipos específicos
   - Comportamento diferente baseado no tipo

4. **Sobrescrita com Comportamento Diferente**
   - Mudança nas pós-condições
   - Alteração de invariantes

## 🔄 Exercícios Práticos

1. **Adicione Novos Tipos de Aves**
   - Avestruz (não voa, corre)
   - Pato (voa e nada)
   - Galinha (voa curtas distâncias)

2. **Implemente Comportamentos**
   - Diferentes tipos de voo
   - Diferentes profundidades de natação
   - Diferentes dietas

3. **Crie Controladores**
   - Gerenciador de zoológico
   - Simulador de habitat
   - Sistema de alimentação

## 📚 Recursos Adicionais

- [Barbara Liskov's Paper](https://dl.acm.org/doi/10.1145/62139.62141)
- [SOLID Principles by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)
- [Design by Contract](https://www.eiffel.com/values/design-by-contract/introduction/)

## 🎓 Dicas de Implementação

1. **Use Interfaces**
   - Defina contratos claros
   - Separe comportamentos
   - Permita composição

2. **Evite Herança Profunda**
   - Prefira composição
   - Mantenha hierarquias rasas
   - Use interfaces múltiplas

3. **Teste Substituição**
   - Verifique comportamentos
   - Teste todas as subclasses
   - Valide contratos

4. **Documente Contratos**
   - Pré-condições
   - Pós-condições
   - Invariantes
