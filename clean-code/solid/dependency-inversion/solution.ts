// ✅ Solução: Aplicando o Princípio da Inversão de Dependência
// Módulos de alto nível e baixo nível dependem de abstrações

// Tipos e interfaces
export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

// Abstrações (interfaces) para as dependências
export interface Database {
    connect(): Promise<void>;
    query<T>(sql: string, params?: any[]): Promise<T[]>;
    disconnect(): Promise<void>;
}

export interface Logger {
    log(message: string): Promise<void>;
    error(message: string, error?: Error): Promise<void>;
}

export interface UserRepository {
    save(user: User): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, data: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}

// Implementações concretas
export class MySQLDatabase implements Database {
    private connection: any;

    async connect(): Promise<void> {
        console.log("Conectando ao MySQL...");
        this.connection = {}; // Simulação de conexão
    }

    async query<T>(sql: string, params: any[] = []): Promise<T[]> {
        console.log(`Executando query MySQL: ${sql}`, params);
        return []; // Simulação de resultado
    }

    async disconnect(): Promise<void> {
        console.log("Desconectando do MySQL...");
        this.connection = null;
    }
}

export class PostgreSQLDatabase implements Database {
    private connection: any;

    async connect(): Promise<void> {
        console.log("Conectando ao PostgreSQL...");
        this.connection = {}; // Simulação de conexão
    }

    async query<T>(sql: string, params: any[] = []): Promise<T[]> {
        console.log(`Executando query PostgreSQL: ${sql}`, params);
        return []; // Simulação de resultado
    }

    async disconnect(): Promise<void> {
        console.log("Desconectando do PostgreSQL...");
        this.connection = null;
    }
}

export class FileLogger implements Logger {
    constructor(private filePath: string) {}

    async log(message: string): Promise<void> {
        console.log(`[FILE] ${this.filePath}: ${message}`);
    }

    async error(message: string, error?: Error): Promise<void> {
        console.error(`[FILE] ${this.filePath} ERROR: ${message}`, error);
    }
}

export class ConsoleLogger implements Logger {
    async log(message: string): Promise<void> {
        console.log(`[CONSOLE]: ${message}`);
    }

    async error(message: string, error?: Error): Promise<void> {
        console.error(`[CONSOLE] ERROR: ${message}`, error);
    }
}

// Implementação do repositório que depende de abstrações
export class SQLUserRepository implements UserRepository {
    constructor(
        private db: Database,
        private logger: Logger
    ) {}

    async save(user: User): Promise<User> {
        try {
            await this.db.connect();
            const sql = 'INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)';
            const params = [user.name, user.email, user.createdAt];
            await this.db.query(sql, params);
            await this.logger.log(`Usuário ${user.name} salvo com sucesso`);
            return user;
        } catch (error) {
            await this.logger.error('Erro ao salvar usuário', error as Error);
            throw error;
        } finally {
            await this.db.disconnect();
        }
    }

    async findById(id: number): Promise<User | null> {
        try {
            await this.db.connect();
            const sql = 'SELECT * FROM users WHERE id = ?';
            const results = await this.db.query<User>(sql, [id]);
            return results[0] || null;
        } finally {
            await this.db.disconnect();
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            await this.db.connect();
            const sql = 'SELECT * FROM users WHERE email = ?';
            const results = await this.db.query<User>(sql, [email]);
            return results[0] || null;
        } finally {
            await this.db.disconnect();
        }
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        try {
            await this.db.connect();
            const sql = 'UPDATE users SET ? WHERE id = ?';
            await this.db.query(sql, [data, id]);
            await this.logger.log(`Usuário ${id} atualizado com sucesso`);
            const updated = await this.findById(id);
            if (!updated) throw new Error('Usuário não encontrado após atualização');
            return updated;
        } catch (error) {
            await this.logger.error('Erro ao atualizar usuário', error as Error);
            throw error;
        } finally {
            await this.db.disconnect();
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.db.connect();
            const sql = 'DELETE FROM users WHERE id = ?';
            await this.db.query(sql, [id]);
            await this.logger.log(`Usuário ${id} deletado com sucesso`);
        } catch (error) {
            await this.logger.error('Erro ao deletar usuário', error as Error);
            throw error;
        } finally {
            await this.db.disconnect();
        }
    }
}

// Serviço que depende apenas da abstração do repositório
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private logger: Logger
    ) {}

    async createUser(userData: { name: string; email: string }): Promise<User> {
        try {
            // Validação
            if (!userData.email.includes('@')) {
                throw new Error('Email inválido');
            }

            // Verifica se usuário já existe
            const existing = await this.userRepository.findByEmail(userData.email);
            if (existing) {
                throw new Error('Usuário já existe');
            }

            // Cria novo usuário
            const user: User = {
                id: Math.floor(Math.random() * 1000),
                name: userData.name,
                email: userData.email,
                createdAt: new Date()
            };

            // Salva e retorna
            const saved = await this.userRepository.save(user);
            await this.logger.log(`Novo usuário criado: ${saved.name}`);
            return saved;
        } catch (error) {
            await this.logger.error('Erro ao criar usuário', error as Error);
            throw error;
        }
    }

    async getUserDetails(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user;
    }

    async updateUser(id: number, data: Partial<User>): Promise<User> {
        return this.userRepository.update(id, data);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}

// ✅ Exemplo de uso com injeção de dependência
async function example() {
    // Criando as dependências
    const database = new MySQLDatabase();
    const logger = new FileLogger('users.log');
    
    // Criando o repositório com suas dependências
    const userRepository = new SQLUserRepository(database, logger);
    
    // Criando o serviço com suas dependências
    const userService = new UserService(userRepository, logger);

    try {
        // Usando o serviço
        const user = await userService.createUser({
            name: "João Silva",
            email: "joao@example.com"
        });

        console.log("Usuário criado:", user);
    } catch (error) {
        console.error("Erro:", error);
    }
}

// ✅ Benefícios desta abordagem:
// 1. Baixo acoplamento: Classes dependem de abstrações
// 2. Fácil de testar: Podemos mockar as dependências
// 3. Flexível: Fácil trocar implementações
// 4. Respeita SRP: Cada classe tem uma responsabilidade
// 5. Manutenível: Mudanças são isoladas
// 6. Reutilizável: Componentes são independentes
// 7. Testável: Podemos testar componentes isoladamente
