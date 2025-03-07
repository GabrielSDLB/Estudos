# Guia de Clean Code e SOLID Principles

Este repositório contém exemplos práticos e explicações detalhadas sobre Clean Code e os princípios SOLID, focados em ajudar desenvolvedores juniores a entender e aplicar boas práticas de programação.

## 🎯 Objetivo

O objetivo deste guia é demonstrar, através de exemplos práticos e realistas, como escrever código mais limpo, manutenível e escalável. Cada exemplo inclui:
- Código problemático (antes)
- Solução refatorada (depois)
- Explicações detalhadas
- Testes unitários
- Casos de uso práticos

## 📚 Princípios SOLID

### 1. [Single Responsibility Principle](./solid/single-responsibility/)
- Uma classe deve ter apenas uma razão para mudar
- Exemplo: Sistema de gerenciamento de usuários

### 2. [Open-Closed Principle](./solid/open-closed/)
- Entidades devem estar abertas para extensão, mas fechadas para modificação
- Exemplo: Sistema de processamento de pagamentos

### 3. [Liskov Substitution Principle](./solid/liskov-substitution/)
- Subtipos devem ser substituíveis por seus tipos base
- Exemplo: Hierarquia de aves e seus comportamentos

### 4. [Interface Segregation Principle](./solid/interface-segregation/)
- Clientes não devem ser forçados a depender de interfaces que não usam
- Exemplo: Sistema de impressoras multifuncionais

### 5. [Dependency Inversion Principle](./solid/dependency-inversion/)
- Módulos de alto nível não devem depender de módulos de baixo nível
- Exemplo: Sistema de persistência e logging

## 🚀 Como Usar Este Guia

1. **Estude os Exemplos**
   - Comece com o código problemático
   - Entenda os problemas e suas consequências
   - Analise a solução proposta
   - Execute os testes

2. **Pratique**
   - Tente identificar problemas similares em seu código
   - Aplique os princípios em seus projetos
   - Escreva testes para suas soluções

3. **Evolua Gradualmente**
   - Não tente aplicar tudo de uma vez
   - Comece com mudanças pequenas
   - Refatore incrementalmente
   - Mantenha os testes passando

## 💡 Dicas de Clean Code

### Nomes Significativos
```typescript
// ❌ Ruim
const d = new Date();
const u = getUser();

// ✅ Bom
const currentDate = new Date();
const currentUser = getUser();
```

### Funções Pequenas e Focadas
```typescript
// ❌ Ruim
function processUser(user) {
    // 100 linhas de código fazendo várias coisas
}

// ✅ Bom
function validateUser(user) { /* ... */ }
function saveUser(user) { /* ... */ }
function notifyUser(user) { /* ... */ }
```

### Evite Comentários Óbvios
```typescript
// ❌ Ruim
// Incrementa contador
counter++;

// ✅ Bom
function incrementActiveUserCount() {
    activeUserCount++;
}
```

### Use Constantes para Valores Mágicos
```typescript
// ❌ Ruim
if (user.age >= 18) { /* ... */ }

// ✅ Bom
const MINIMUM_ADULT_AGE = 18;
if (user.age >= MINIMUM_ADULT_AGE) { /* ... */ }
```

## 🎓 Conceitos Importantes

### 1. Coesão
- Classes e funções devem ter um propósito claro
- Elementos relacionados devem estar juntos
- Evite misturar responsabilidades

### 2. Acoplamento
- Minimize dependências entre módulos
- Use interfaces e abstrações
- Evite conhecimento de implementações internas

### 3. DRY (Don't Repeat Yourself)
- Evite duplicação de código
- Extraia código comum
- Use composição e herança adequadamente

### 4. KISS (Keep It Simple, Stupid)
- Mantenha o código simples
- Evite otimizações prematuras
- Prefira clareza à complexidade

## 📝 Exercícios Práticos

1. **Refatoração**
   - Identifique violações dos princípios SOLID
   - Aplique as correções necessárias
   - Verifique os resultados com testes

2. **Criação**
   - Implemente novos recursos seguindo os princípios
   - Escreva testes primeiro (TDD)
   - Revise e refatore

3. **Análise**
   - Revise código existente
   - Identifique pontos de melhoria
   - Proponha soluções

## 🔍 Code Review Checklist

- [ ] O código segue os princípios SOLID?
- [ ] As funções são pequenas e focadas?
- [ ] Os nomes são claros e significativos?
- [ ] Existe duplicação de código?
- [ ] Os testes cobrem os casos importantes?
- [ ] As dependências são injetadas corretamente?
- [ ] As interfaces são coesas?
- [ ] O código é fácil de entender?

## 📚 Recursos Adicionais

- [Clean Code - Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Refactoring - Martin Fowler](https://refactoring.guru/)
- [SOLID Principles](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/)

## 🤝 Contribuindo

Sinta-se à vontade para contribuir com:
- Novos exemplos
- Melhorias na documentação
- Correções de bugs
- Casos de uso adicionais

## 📖 Como Contribuir

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.
