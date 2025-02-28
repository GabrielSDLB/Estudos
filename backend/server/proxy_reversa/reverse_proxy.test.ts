import request from 'supertest';
import express from 'express';
import { Server } from 'http';
import ReverseProxy from './reverse_proxy';

describe('ReverseProxy', () => {
    let mockAuthServer: Server;
    let mockUserServer: Server;
    let mockProductServer: Server;
    let reverseProxy: ReverseProxy;

    beforeAll(async () => {
        // Configurar servidores mock
        const authApp = express();
        authApp.get('/', (req, res) => res.json({ service: 'auth' }));
        mockAuthServer = authApp.listen(8000);

        const userApp = express();
        userApp.get('/', (req, res) => res.json({ service: 'users' }));
        mockUserServer = userApp.listen(8001);

        const productApp = express();
        productApp.get('/', (req, res) => res.json({ service: 'products' }));
        mockProductServer = productApp.listen(8002);

        // Iniciar o proxy reverso
        reverseProxy = new ReverseProxy();
        reverseProxy.start();
    });

    afterAll(async () => {
        // Fechar todos os servidores após os testes
        mockAuthServer.close();
        mockUserServer.close();
        mockProductServer.close();
    });

    describe('Healthcheck', () => {
        it('deve retornar status 200 e timestamp', async () => {
            const response = await request('http://localhost:3000')
                .get('/health')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'OK');
            expect(response.body).toHaveProperty('timestamp');
        });
    });

    describe('Autenticação', () => {
        it('deve bloquear acesso a rota protegida sem token', async () => {
            const response = await request('http://localhost:3000')
                .get('/auth')
                .expect(401);

            expect(response.body).toHaveProperty('error', 'Token de autenticação necessário');
        });

        it('deve permitir acesso a rota protegida com token', async () => {
            const response = await request('http://localhost:3000')
                .get('/auth')
                .set('Authorization', 'Bearer test-token')
                .expect(200);

            expect(response.body).toHaveProperty('service', 'auth');
        });
    });

    describe('Serviço de Usuários', () => {
        it('deve bloquear acesso sem token', async () => {
            const response = await request('http://localhost:3000')
                .get('/users')
                .expect(401);

            expect(response.body).toHaveProperty('error', 'Token de autenticação necessário');
        });

        it('deve permitir acesso com token', async () => {
            const response = await request('http://localhost:3000')
                .get('/users')
                .set('Authorization', 'Bearer test-token')
                .expect(200);

            expect(response.body).toHaveProperty('service', 'users');
        });
    });

    describe('Serviço de Produtos', () => {
        it('deve permitir acesso sem token', async () => {
            const response = await request('http://localhost:3000')
                .get('/products')
                .expect(200);

            expect(response.body).toHaveProperty('service', 'products');
        });
    });

    describe('Headers personalizados', () => {
        it('deve incluir X-Powered-By header', async () => {
            const response = await request('http://localhost:3000')
                .get('/products')
                .expect(200);

            expect(response.headers).toHaveProperty('x-powered-by', 'Reverse Proxy');
        });

        it('deve incluir X-Proxy-Timestamp header', async () => {
            const response = await request('http://localhost:3000')
                .get('/products')
                .expect(200);

            expect(response.headers).toHaveProperty('x-proxy-timestamp');
            expect(Date.parse(response.headers['x-proxy-timestamp'])).not.toBeNaN();
        });
    });

    describe('Tratamento de erros', () => {
        it('deve retornar 404 para rota inexistente', async () => {
            await request('http://localhost:3000')
                .get('/rota-inexistente')
                .expect(404);
        });

        it('deve retornar 500 quando serviço está indisponível', async () => {
            // Parar o servidor de produtos para simular indisponibilidade
            mockProductServer.close();

            const response = await request('http://localhost:3000')
                .get('/products')
                .expect(500);

            expect(response.body).toHaveProperty('error', 'Erro ao processar a requisição');
            expect(response.body).toHaveProperty('timestamp');

            // Reiniciar o servidor de produtos
            const productApp = express();
            productApp.get('/', (req, res) => res.json({ service: 'products' }));
            mockProductServer = productApp.listen(8002);
        });
    });
});
