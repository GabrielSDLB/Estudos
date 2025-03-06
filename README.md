# Padrões de Projeto Estruturais - Demo Interativa

Este repositório contém uma demonstração interativa dos padrões de projeto estruturais em TypeScript. A aplicação web permite explorar e interagir com diferentes implementações dos padrões estruturais mais comuns.

## Padrões Implementados

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

## Como Executar

1. **Pré-requisitos**
   - Node.js instalado
   - npm (Node Package Manager)

2. **Instalação**
   ```bash
   # Clone o repositório
   git clone [url-do-repositorio]

   # Entre no diretório do projeto
   cd frontend

   # Instale as dependências
   npm install
   ```

3. **Executando o Projeto**
   ```bash
   # Compile o TypeScript
   npm run build

   # Inicie o servidor
   npm run serve
   ```

4. **Acesse a Aplicação**
   - Abra seu navegador e acesse `http://localhost:8080`

## Estrutura do Projeto

```
frontend/
├── patterns/           # Implementações dos padrões
│   ├── adapter.ts
│   ├── decorator.ts
│   ├── facade.ts
│   ├── flyweight.ts
│   ├── proxy.ts
│   ├── bridge.ts
│   └── composite.ts
├── main.ts            # Lógica principal da aplicação
├── index.html         # Interface do usuário
└── tsconfig.json      # Configuração do TypeScript
```

## Funcionalidades

- Interface interativa para cada padrão
- Exemplos práticos e realistas
- Visualização em tempo real dos resultados
- Código fonte bem documentado
- Implementações em TypeScript

## Tecnologias Utilizadas

- TypeScript
- HTML5
- CSS3
- Node.js
- http-server

## Contribuindo

Sinta-se à vontade para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
