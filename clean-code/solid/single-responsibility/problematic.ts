// ❌ Problema: Classe que viola o Princípio da Responsabilidade Única
// Esta classe está fazendo muitas coisas: gerenciar usuário, enviar emails, e lidar com persistência

export class UserManager {
    private users: any[] = [];

    async createUser(name: string, email: string, password: string) {
        // Validação
        if (!name || !email || !password) {
            throw new Error("Dados inválidos");
        }
        if (!email.includes("@")) {
            throw new Error("Email inválido");
        }
        if (password.length < 8) {
            throw new Error("Senha muito curta");
        }

        // Criação do usuário
        const user = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            password, // ❌ Problema: Senha não está sendo hasheada
            createdAt: new Date()
        };

        // Persistência
        try {
            this.users.push(user);
            // Simula salvamento no banco
            await this.saveToDatabase(user);
        } catch (error) {
            throw new Error("Erro ao salvar usuário");
        }

        // Envio de email
        try {
            // Simula envio de email
            await this.sendWelcomeEmail(user);
        } catch (error) {
            // ❌ Problema: Se o email falhar, o usuário já foi criado
            console.error("Erro ao enviar email");
        }

        return user;
    }

    private async saveToDatabase(user: any): Promise<void> {
        // Simula delay de banco de dados
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log("Usuário salvo no banco:", user);
    }

    private async sendWelcomeEmail(user: any): Promise<void> {
        // Simula envio de email
        const emailContent = `
            Olá ${user.name},
            Bem-vindo ao nosso sistema!
            Seu cadastro foi realizado com sucesso.
        `;
        
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log("Email enviado:", emailContent);
    }

    async getUser(id: string) {
        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user;
    }

    async updateUser(id: string, data: any) {
        const user = await this.getUser(id);
        Object.assign(user, data);
        await this.saveToDatabase(user);
        return user;
    }

    async deleteUser(id: string) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) {
            throw new Error("Usuário não encontrado");
        }
        this.users.splice(index, 1);
        // Simula deleção no banco
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log("Usuário deletado:", id);
    }
}
