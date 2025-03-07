# Princípio da Segregação de Interface (ISP)

## 📝 Descrição

O Princípio da Segregação de Interface (Interface Segregation Principle - ISP) afirma que:
> "Clientes não devem ser forçados a depender de interfaces que não utilizam."

Em outras palavras, é melhor ter várias interfaces específicas do que uma interface única e grande.

## ❌ Problema (Antes)

No arquivo `problematic.ts`, temos uma interface "gorda" que força implementações desnecessárias:

```typescript
interface Printer {
    print(document: Document): void;
    scan(document: Document): void;
    fax(document: Document): void;
    copy(document: Document): void;
    staple(document: Document): void;
    // ... mais métodos que nem todas as impressoras suportam
}

class BasicPrinter implements Printer {
    print(document: Document): void {
        // Implementação OK
    }

    scan(document: Document): void {
        throw new Error("Não suportado"); // ❌ Forçado a implementar
    }

    // ... mais métodos não suportados
}
```

### Problemas desta Abordagem:

1. **Implementações Desnecessárias**: Classes precisam implementar métodos que não usam
2. **Violação do Princípio de Substituição de Liskov**: Métodos lançam exceções
3. **Código Frágil**: Mudanças na interface afetam todas as implementações
4. **Difícil Manutenção**: Interface grande e complexa
5. **Alto Acoplamento**: Classes dependem de funcionalidades que não precisam

## ✅ Solução (Depois)

No arquivo `solution.ts`, segregamos a interface em partes menores e coesas:

```typescript
interface Printable {
    print(document: Document): void;
    configurePrinterSettings(settings: PrinterSettings): void;
}

interface Scannable {
    scan(document: Document): void;
    getScannedFileType(): string;
}

interface Faxable {
    fax(document: Document): void;
    confirmFaxDelivery(faxId: string): boolean;
}

// Implementações usam apenas o necessário
class BasicPrinter implements Printable {
    print(document: Document): void {
        // Implementação limpa
    }
    
    configurePrinterSettings(settings: PrinterSettings): void {
        // Configurações básicas
    }
}
```

### Benefícios desta Abordagem:

1. **Interfaces Coesas**: Cada interface tem um propósito específico
2. **Implementações Limpas**: Classes implementam apenas o necessário
3. **Baixo Acoplamento**: Dependências minimizadas
4. **Manutenibilidade**: Mudanças afetam menos classes
5. **Flexibilidade**: Fácil combinar interfaces conforme necessário

## 🎯 Casos de Uso

O ISP é útil em vários cenários:

1. **Sistemas de Plugins**
   - Interfaces específicas para diferentes tipos de plugins
   - Extensões modulares
   - Pontos de extensão bem definidos

2. **APIs e Serviços**
   - Endpoints específicos
   - Contratos focados
   - Versionamento de APIs

3. **Frameworks**
   - Hooks específicos
   - Middleware interfaces
   - Event handlers

4. **Integrações**
   - Adaptadores específicos
   - Conectores de serviços
   - Gateways de pagamento

## 💡 Como Identificar Violações do ISP

1. **Métodos não Implementados**
   - Métodos que lançam exceções
   - Implementações vazias
   - Métodos marcados como "não suportado"

2. **Interfaces Grandes**
   - Muitos métodos não relacionados
   - Diferentes responsabilidades
   - Alta complexidade

3. **Dependências Desnecessárias**
   - Classes usando apenas parte da interface
   - Acoplamento excessivo
   - Dificuldade em mockar em testes

## 🔄 Exercícios Práticos

1. **Refatore Interfaces Existentes**
   - Identifique grupos de métodos relacionados
   - Crie interfaces específicas
   - Atualize implementações

2. **Implemente Novas Funcionalidades**
   - Adicione novos recursos via interfaces
   - Mantenha a coesão
   - Evite quebrar implementações existentes

3. **Crie Composições**
   - Combine interfaces conforme necessário
   - Use herança de interface
   - Implemente padrões de design

## 📚 Recursos Adicionais

- [Interface Segregation Principle - Martin Fowler](https://martinfowler.com/bliki/InterfaceSegregation.html)
- [SOLID Principles by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)
- [Refactoring Guru - ISP](https://refactoring.guru/solid-interface-segregation)

## 🎓 Dicas de Implementação

1. **Comece Pequeno**
   - Crie interfaces mínimas
   - Adicione métodos conforme necessário
   - Mantenha o foco

2. **Use Composição**
   - Combine interfaces quando necessário
   - Prefira composição à herança
   - Crie interfaces role-based

3. **Mantenha a Coesão**
   - Agrupe métodos relacionados
   - Separe responsabilidades
   - Nomeie interfaces claramente

4. **Pense nos Clientes**
   - Considere diferentes casos de uso
   - Facilite a implementação
   - Minimize dependências

## 🚀 Exemplos de Evolução

1. **Adição de Funcionalidades**
```typescript
// Nova interface para recursos avançados
interface AdvancedPrinting {
    printDuplex(): void;
    printHighQuality(): void;
}

// Classe existente não é afetada
class BasicPrinter implements Printable { }

// Nova classe com recursos avançados
class AdvancedPrinter implements Printable, AdvancedPrinting { }
```

2. **Composição de Interfaces**
```typescript
// Gerenciador que trabalha com diferentes capacidades
class PrinterManager {
    printDocument(printer: Printable): void;
    scanDocument(scanner: Scannable): void;
    fullProcess(device: Printable & Scannable & Faxable): void;
}
```

3. **Extensão Gradual**
```typescript
// Interface base
interface NetworkDevice {
    connect(): void;
}

// Extensões específicas
interface NetworkPrinter extends NetworkDevice, Printable { }
interface NetworkScanner extends NetworkDevice, Scannable { }
