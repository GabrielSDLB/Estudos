# Teste do Proxy Reverso

Este diretório contém uma implementação de proxy reverso em TypeScript com testes automatizados.

## Estrutura

- `reverse_proxy.ts`: Implementação principal do proxy reverso
- `reverse_proxy.test.ts`: Testes automatizados
- `package.json`: Configuração do projeto e dependências
- `tsconfig.json`: Configuração do TypeScript

## Testes Implementados

1. **Healthcheck**
   - Verifica se o endpoint /health retorna status 200 e timestamp

2. **Autenticação**
   - Testa bloqueio de acesso sem token
   - Testa permissão de acesso com token válido

3. **Serviço de Usuários**
   - Verifica proteção de rota sem token
   - Verifica acesso com token válido

4. **Serviço de Produtos**
   - Testa acesso sem necessidade de autenticação

5. **Headers Personalizados**
   - Verifica presença do header X-Powered-By
   - Verifica presença e formato do X-Proxy-Timestamp

6. **Tratamento de Erros**
   - Testa resposta 404 para rotas inexistentes
   - Testa resposta 500 para serviços indisponíveis

## Como Executar os Testes

1. Instale as dependências:
```bash
npm install
```

2. Execute os testes:
```bash
npm test
```

## Cobertura de Testes

Os testes cobrem os principais aspectos do proxy reverso:
- Roteamento
- Autenticação
- Headers personalizados
- Tratamento de erros
- Disponibilidade de serviços

Cada teste verifica tanto o status HTTP quanto o conteúdo da resposta para garantir o comportamento correto do proxy.
