# Estudos de Padrões de Projeto e Clean Code

Este repositório contém demonstrações e implementações de padrões de projeto estruturais, princípios SOLID, e exemplos de clean code em TypeScript.

## Frontend - Padrões de Projeto Estruturais

### Padrões Implementados

1. **Adapter Pattern**
   - Demonstra como adaptar interfaces incompatíveis
   - Exemplo: Player de mídia que suporta diferentes formatos (MP3, VLC, MP4)

2. **Decorator Pattern**
   - Mostra como adicionar comportamentos dinamicamente
   - Exemplo: Sistema de café com diferentes complementos

3. **Facade Pattern**
   - Simplifica um sistema complexo com uma interface unificada
   - Exemplo: Sistema de pedidos com múltiplos subsistemas

4. **Flyweight Pattern**
   - Otimiza o uso de memória compartilhando dados
   - Exemplo: Sistema de partículas com propriedades compartilhadas

5. **Proxy Pattern**
   - Controla o acesso a objetos com diferentes propósitos
   - Exemplo: Carregamento de imagens com lazy loading, cache e proteção

6. **Bridge Pattern**
   - Separa abstração de implementação
   - Exemplo: Controle remoto para diferentes dispositivos (TV e Rádio)

7. **Composite Pattern**
   - Compõe objetos em estruturas de árvore
   - Exemplo: Sistema de arquivos com diretórios e arquivos

## Backend - Servidor e Padrões

### Proxy Reverso
- Implementação de um servidor proxy reverso
- Gerenciamento de requisições e redirecionamento
- Testes unitários para validação do comportamento

## Clean Code - Princípios SOLID

### Single Responsibility Principle
- Demonstração de código problemático
- Solução aplicando o princípio
- Testes unitários validando a implementação

### Open-Closed Principle
- Exemplo de violação do princípio
- Implementação correta seguindo o princípio
- Testes demonstrando a extensibilidade

### Liskov Substitution Principle
- Caso de uso com problemas de substituição
- Solução respeitando o princípio
- Testes verificando o comportamento correto

### Interface Segregation Principle
- Exemplo de interfaces muito abrangentes
- Refatoração aplicando o princípio
- Testes validando a segregação

### Dependency Inversion Principle
- Demonstração de acoplamento forte
- Solução com inversão de dependência
- Testes unitários da implementação

## Como Executar

### Frontend

1. **Pré-requisitos**
   - Node.js instalado
   - npm (Node Package Manager)

2. **Instalação**
   ```bash
   cd frontend
   npm install
   ```

3. **Executando**
   ```bash
   npm run build
   npm run serve
   ```

### Backend

1. **Instalação**
   ```bash
   cd backend/server/proxy_reversa
   npm install
   ```

2. **Executando Testes**
   ```bash
   npm test
   ```

### Clean Code Examples

1. **Instalação**
   ```bash
   cd clean-code
   npm install
   ```

2. **Executando Testes**
   ```bash
   npm test
   ```

## Estrutura do Projeto

```
.
├── frontend/
│   ├── patterns/           # Implementações dos padrões estruturais
│   ├── main.ts
│   └── index.html
├── backend/
│   ├── patterns/          # Padrões de projeto backend
│   └── server/
│       └── proxy_reversa/ # Implementação do proxy reverso
└── clean-code/
    └── solid/            # Implementações dos princípios SOLID
        ├── single-responsibility/
        ├── open-closed/
        ├── liskov-substitution/
        ├── interface-segregation/
        └── dependency-inversion/
```

## Tecnologias Utilizadas

- TypeScript
- Node.js
- Jest (Testes)
- HTML5/CSS3

## Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
