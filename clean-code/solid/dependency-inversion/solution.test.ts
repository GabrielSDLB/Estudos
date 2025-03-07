import {
    User,
    Database,
    Logger,
    UserRepository,
    UserService,
    SQLUserRepository
} from './solution';

// Mocks
class MockDatabase implements Database {
    private mockData: any[] = [];

    async connect(): Promise<void> {}
    
    async query<T>(sql: string, params: any[] = []): Promise<T[]> {
        // Simula diferentes queries baseado no SQL
        if (sql.toLowerCase().includes('select')) {
            return this.mockData as T[];
        }
        if (sql.toLowerCase().includes('insert')) {
            this.mockData.push(params[0]);
        }
        return [] as T[];
    }
    
    async disconnect(): Promise<void> {}

    // Método helper para testes
    _setMockData(data: any[]): void {
        this.mockData = data;
    }
}

class MockLogger implements Logger {
    private logs: string[] = [];
    private errors: string[] = [];

    async log(message: string): Promise<void> {
        this.logs.push(message);
    }

    async error(message: string, error?: Error): Promise<void> {
        this.errors.push(message);
    }

    // Métodos helpers para testes
    _getLogs(): string[] {
        return this.logs;
    }

    _getErrors(): string[] {
        return this.errors;
    }
}

describe('Dependency Inversion Tests', () => {
    let mockDb: MockDatabase;
    let mockLogger: MockLogger;
    let userRepository: UserRepository;
    let userService: UserService;

    beforeEach(() => {
        mockDb = new MockDatabase();
        mockLogger = new MockLogger();
        userRepository = new SQLUserRepository(mockDb, mockLogger);
        userService = new UserService(userRepository, mockLogger);
    });

    describe('UserRepository', () => {
        const testUser: User = {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            createdAt: new Date()
        };

        test('deve salvar usuário com sucesso', async () => {
            await userRepository.save(testUser);
            
            const logs = mockLogger._getLogs();
            expect(logs).toContain(`Usuário ${testUser.name} salvo com sucesso`);
        });

        test('deve encontrar usuário por ID', async () => {
            mockDb._setMockData([testUser]);
            
            const found = await userRepository.findById(1);
            expect(found).toEqual(testUser);
        });

        test('deve retornar null quando usuário não encontrado', async () => {
            mockDb._setMockData([]);
            
            const found = await userRepository.findById(999);
            expect(found).toBeNull();
        });

        test('deve encontrar usuário por email', async () => {
            mockDb._setMockData([testUser]);
            
            const found = await userRepository.findByEmail('test@example.com');
            expect(found).toEqual(testUser);
        });

        test('deve atualizar usuário com sucesso', async () => {
            mockDb._setMockData([testUser]);
            
            const updateData = { name: 'Updated Name' };
            await userRepository.update(1, updateData);
            
            const logs = mockLogger._getLogs();
            expect(logs).toContain('Usuário 1 atualizado com sucesso');
        });

        test('deve deletar usuário com sucesso', async () => {
            await userRepository.delete(1);
            
            const logs = mockLogger._getLogs();
            expect(logs).toContain('Usuário 1 deletado com sucesso');
        });
    });

    describe('UserService', () => {
        test('deve criar novo usuário com sucesso', async () => {
            const userData = {
                name: 'New User',
                email: 'new@example.com'
            };

            const created = await userService.createUser(userData);
            
            expect(created.name).toBe(userData.name);
            expect(created.email).toBe(userData.email);
            
            const logs = mockLogger._getLogs();
            expect(logs).toContain(`Novo usuário criado: ${userData.name}`);
        });

        test('deve rejeitar email inválido', async () => {
            const userData = {
                name: 'Invalid User',
                email: 'invalid-email'
            };

            await expect(userService.createUser(userData))
                .rejects.toThrow('Email inválido');
            
            const errors = mockLogger._getErrors();
            expect(errors).toContain('Erro ao criar usuário');
        });

        test('deve rejeitar usuário duplicado', async () => {
            const existingUser: User = {
                id: 1,
                name: 'Existing User',
                email: 'existing@example.com',
                createdAt: new Date()
            };

            mockDb._setMockData([existingUser]);

            const userData = {
                name: 'New User',
                email: 'existing@example.com'
            };

            await expect(userService.createUser(userData))
                .rejects.toThrow('Usuário já existe');
        });

        test('deve obter detalhes do usuário', async () => {
            const testUser: User = {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                createdAt: new Date()
            };

            mockDb._setMockData([testUser]);

            const user = await userService.getUserDetails(1);
            expect(user).toEqual(testUser);
        });

        test('deve lançar erro quando usuário não encontrado', async () => {
            mockDb._setMockData([]);

            await expect(userService.getUserDetails(999))
                .rejects.toThrow('Usuário não encontrado');
        });
    });

    describe('Integração de Componentes', () => {
        test('fluxo completo de criação e recuperação de usuário', async () => {
            // Criar usuário
            const userData = {
                name: 'Integration Test User',
                email: 'integration@example.com'
            };

            const created = await userService.createUser(userData);
            expect(created.name).toBe(userData.name);
            expect(created.email).toBe(userData.email);

            // Configurar mock para recuperação
            mockDb._setMockData([created]);

            // Recuperar usuário
            const retrieved = await userService.getUserDetails(created.id);
            expect(retrieved).toEqual(created);

            // Verificar logs
            const logs = mockLogger._getLogs();
            expect(logs).toContain(`Novo usuário criado: ${userData.name}`);
            expect(logs).toContain(`Usuário ${userData.name} salvo com sucesso`);
        });
    });
});
