// ✅ Solução: Aplicando o Princípio da Responsabilidade Única
// Cada classe tem uma única responsabilidade

// Types
interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

interface UserCreateData {
    name: string;
    email: string;
    password: string;
}

// Responsabilidade: Validação de dados do usuário
export class UserValidator {
    validateCreateData(data: UserCreateData): void {
        if (!data.name || !data.email || !data.password) {
            throw new Error("Dados inválidos");
        }
        this.validateEmail(data.email);
        this.validatePassword(data.password);
    }

    private validateEmail(email: string): void {
        if (!email.includes("@")) {
            throw new Error("Email inválido");
        }
    }

    private validatePassword(password: string): void {
        if (password.length < 8) {
            throw new Error("Senha muito curta");
        }
    }
}

// Responsabilidade: Persistência de dados
export class UserRepository {
    private users: User[] = [];

    async save(user: User): Promise<void> {
        await this.simulateDatabaseDelay();
        this.users.push(user);
        console.log("Usuário salvo no banco:", user);
    }

    async findById(id: string): Promise<User | null> {
        await this.simulateDatabaseDelay();
        return this.users.find(u => u.id === id) || null;
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        Object.assign(user, data);
        console.log("Usuário atualizado:", user);
        return user;
    }

    async delete(id: string): Promise<void> {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) {
            throw new Error("Usuário não encontrado");
        }
        this.users.splice(index, 1);
        await this.simulateDatabaseDelay();
        console.log("Usuário deletado:", id);
    }

    private async simulateDatabaseDelay(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

// Responsabilidade: Envio de emails
export class EmailService {
    async sendWelcomeEmail(user: User): Promise<void> {
        const emailContent = this.createWelcomeEmailContent(user);
        await this.sendEmail(user.email, "Bem-vindo!", emailContent);
    }

    private createWelcomeEmailContent(user: User): string {
        return `
            Olá ${user.name},
            Bem-vindo ao nosso sistema!
            Seu cadastro foi realizado com sucesso.
        `;
    }

    private async sendEmail(to: string, subject: string, content: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log(`Email enviado para ${to}:`, { subject, content });
    }
}

// Responsabilidade: Geração de IDs
export class IdGenerator {
    generate(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}

// Responsabilidade: Coordenação do processo de criação de usuário
export class UserService {
    constructor(
        private validator: UserValidator,
        private repository: UserRepository,
        private emailService: EmailService,
        private idGenerator: IdGenerator
    ) {}

    async createUser(data: UserCreateData): Promise<User> {
        // Validação
        this.validator.validateCreateData(data);

        // Criação do usuário
        const user: User = {
            id: this.idGenerator.generate(),
            ...data,
            createdAt: new Date()
        };

        // Persistência
        try {
            await this.repository.save(user);
        } catch (error) {
            throw new Error("Erro ao salvar usuário");
        }

        // Envio de email (não bloqueia a criação do usuário)
        this.emailService.sendWelcomeEmail(user).catch(error => {
            console.error("Erro ao enviar email de boas-vindas:", error);
            // Aqui poderíamos adicionar o email a uma fila de retry
        });

        return user;
    }

    async getUser(id: string): Promise<User> {
        const user = await this.repository.findById(id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user;
    }

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        return this.repository.update(id, data);
    }

    async deleteUser(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

// Exemplo de uso:
async function example() {
    // Criação das dependências
    const validator = new UserValidator();
    const repository = new UserRepository();
    const emailService = new EmailService();
    const idGenerator = new IdGenerator();

    // Criação do serviço com suas dependências
    const userService = new UserService(
        validator,
        repository,
        emailService,
        idGenerator
    );

    try {
        // Criação de um usuário
        const user = await userService.createUser({
            name: "João Silva",
            email: "joao@example.com",
            password: "senha123456"
        });

        console.log("Usuário criado com sucesso:", user);
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
    }
}
