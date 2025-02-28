import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';
import morgan from 'morgan';

interface ProxyOptions {
    authRequired: boolean;
    pathRewrite?: { [key: string]: string };
}

class ReverseProxy {
    private app: express.Application;
    private readonly PORT: number = 3000;

    // Configuração dos serviços de backend
    private readonly services = {
        auth: 'http://localhost:8000',     // Serviço de autenticação
        users: 'http://localhost:8001',     // Serviço de usuários
        products: 'http://localhost:8002',  // Serviço de produtos
    };

    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
    }

    private setupMiddleware(): void {
        // Configuração de logging
        this.app.use(morgan('dev'));
        
        // Middleware para adicionar headers padrão
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('X-Powered-By', 'Reverse Proxy');
            next();
        });
    }

    private setupRoutes(): void {
        // Rota para o serviço de autenticação
        this.app.use('/auth', this.createProxy(this.services.auth, {
            authRequired: true,
            pathRewrite: {
                '^/auth': '', // Remove o prefixo /auth
            }
        }));

        // Rota para o serviço de usuários
        this.app.use('/users', this.createProxy(this.services.users, {
            authRequired: true
        }));

        // Rota para o serviço de produtos
        this.app.use('/products', this.createProxy(this.services.products, {
            authRequired: false
        }));

        // Rota de healthcheck
        this.app.get('/health', (req: Request, res: Response) => {
            res.json({ status: 'OK', timestamp: new Date() });
        });
    }

    private createProxy(target: string, options: ProxyOptions): RequestHandler {
        return createProxyMiddleware({
            target,
            changeOrigin: true,
            pathRewrite: options.pathRewrite,
            onProxyReq: (proxyReq: any, req: Request, res: Response) => {
                // Adiciona headers personalizados
                proxyReq.setHeader('X-Proxy-Timestamp', new Date().toISOString());

                if (options.authRequired) {
                    // Verifica token de autenticação
                    const authToken = req.headers['authorization'];
                    if (!authToken) {
                        res.status(401).json({ error: 'Token de autenticação necessário' });
                        return;
                    }
                }
            },
            onError: (err: Error, req: Request, res: Response) => {
                console.error('Erro no proxy:', err);
                res.status(500).json({
                    error: 'Erro ao processar a requisição',
                    timestamp: new Date().toISOString()
                });
            }
        });
    }

    public start(): void {
        this.app.listen(this.PORT, () => {
            console.log(`Reverse Proxy rodando na porta ${this.PORT}`);
            console.log('Serviços disponíveis:');
            Object.entries(this.services).forEach(([name, url]) => {
                console.log(`- ${name}: ${url}`);
            });
        });
    }

    // Método para balanceamento de carga simples (Round Robin)
    private loadBalancer(servers: string[]): () => string {
        let currentIndex = 0;
        return () => {
            const server = servers[currentIndex];
            currentIndex = (currentIndex + 1) % servers.length;
            return server;
        };
    }
}

// Exemplo de uso
const proxy = new ReverseProxy();
proxy.start();

// Exporta a classe para uso em outros módulos
export default ReverseProxy;
