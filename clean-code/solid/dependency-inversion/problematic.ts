// ❌ Problema: Violação do Princípio da Inversão de Dependência
// Módulos de alto nível dependem diretamente de módulos de baixo nível

// Módulo de baixo nível - Implementação específica
export class MySQLDatabase {
    connect(): void {
        console.log("Conectando ao MySQL...");
    }

    query(sql: string): any[] {
        console.log(`Executando query MySQL: ${sql}`);
        return [];
    }

    disconnect(): void {
        console.log("Desconectando do MySQL...");
    }
}

// Módulo de baixo nível - Outra implementação específica
export class FileSystem {
    readFile(path: string): string {
        console.log(`Lendo arquivo: ${path}`);
        return "conteúdo do arquivo";
    }

    writeFile(path: string, content: string): void {
        console.log(`Escrevendo em arquivo: ${path}`);
    }
}

// ❌ Problema: Classe de alto nível depende diretamente de implementações
export class UserRepository {
    private database: MySQLDatabase;
    private fileSystem: FileSystem;

    constructor() {
        // ❌ Dependência direta de implementações concretas
        this.database = new MySQLDatabase();
        this.fileSystem = new FileSystem();
    }

    saveUser(user: any): void {
        this.database.connect();
        this.database.query(`INSERT INTO users VALUES (${user.id}, '${user.name}')`);
        this.database.disconnect();

        // Log em arquivo
        this.fileSystem.writeFile(
            'users.log',
            `Usuário ${user.name} salvo em ${new Date().toISOString()}`
        );
    }

    getUser(id: number): any {
        this.database.connect();
        const result = this.database.query(`SELECT * FROM users WHERE id = ${id}`);
        this.database.disconnect();
        return result[0];
    }
}

// ❌ Problema: Serviço de alto nível também depende de implementações
export class UserService {
    private repository: UserRepository;

    constructor() {
        // ❌ Dependência direta da implementação do repositório
        this.repository = new UserRepository();
    }

    createUser(userData: any): void {
        // Alguma lógica de negócio
        const user = {
            id: Math.random(),
            name: userData.name,
            createdAt: new Date()
        };

        this.repository.saveUser(user);
    }

    getUserDetails(id: number): any {
        return this.repository.getUser(id);
    }
}

// ❌ Problemas desta abordagem:
// 1. Alto acoplamento: Classes dependem de implementações concretas
// 2. Difícil de testar: Não podemos mockar as dependências
// 3. Difícil de trocar implementações: Ex: mudar para PostgreSQL
// 4. Violação do SRP: Classes conhecem detalhes de implementação
// 5. Código não flexível: Mudanças afetam múltiplas classes
// 6. Difícil reutilização: Componentes fortemente acoplados
// 7. Teste de integração obrigatório: Não é possível testar isoladamente
