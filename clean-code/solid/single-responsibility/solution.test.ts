import {
    UserValidator,
    UserRepository,
    EmailService,
    IdGenerator,
    UserService
} from './solution.js';

describe('UserValidator', () => {
    let validator: UserValidator;

    beforeEach(() => {
        validator = new UserValidator();
    });

    test('deve aceitar dados válidos', () => {
        const validData = {
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'senha12345'
        };

        expect(() => validator.validateCreateData(validData)).not.toThrow();
    });

    test('deve rejeitar email inválido', () => {
        const invalidData = {
            name: 'João Silva',
            email: 'emailinvalido',
            password: 'senha12345'
        };

        expect(() => validator.validateCreateData(invalidData))
            .toThrow('Email inválido');
    });

    test('deve rejeitar senha curta', () => {
        const invalidData = {
            name: 'João Silva',
            email: 'joao@example.com',
            password: '123'
        };

        expect(() => validator.validateCreateData(invalidData))
            .toThrow('Senha muito curta');
    });
});

describe('UserRepository', () => {
    let repository: UserRepository;

    beforeEach(() => {
        repository = new UserRepository();
    });

    test('deve salvar e recuperar um usuário', async () => {
        const user = {
            id: '123',
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'senha12345',
            createdAt: new Date()
        };

        await repository.save(user);
        const found = await repository.findById('123');
        
        expect(found).toEqual(user);
    });

    test('deve atualizar um usuário', async () => {
        const user = {
            id: '123',
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'senha12345',
            createdAt: new Date()
        };

        await repository.save(user);
        const updated = await repository.update('123', { name: 'João Silva Jr.' });
        
        expect(updated.name).toBe('João Silva Jr.');
    });

    test('deve deletar um usuário', async () => {
        const user = {
            id: '123',
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'senha12345',
            createdAt: new Date()
        };

        await repository.save(user);
        await repository.delete('123');
        const found = await repository.findById('123');
        
        expect(found).toBeNull();
    });
});

describe('EmailService', () => {
    let emailService: EmailService;

    beforeEach(() => {
        emailService = new EmailService();
    });

    test('deve enviar email de boas-vindas', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const user = {
            id: '123',
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'senha12345',
            createdAt: new Date()
        };

        await emailService.sendWelcomeEmail(user);
        
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Email enviado para joao@example.com'),
            expect.any(Object)
        );
    });
});

describe('IdGenerator', () => {
    let idGenerator: IdGenerator;

    beforeEach(() => {
        idGenerator = new IdGenerator();
    });

    test('deve gerar IDs únicos', () => {
        const id1 = idGenerator.generate();
        const id2 = idGenerator.generate();
        
        expect(id1).not.toBe(id2);
    });
});

describe('UserService', () => {
    let userService: UserService;
    let validator: UserValidator;
    let repository: UserRepository;
    let emailService: EmailService;
    let idGenerator: IdGenerator;

    beforeEach(() => {
        validator = new UserValidator();
        repository = new UserRepository();
        emailService = new EmailService();
        idGenerator = new IdGenerator();
        
        userService = new UserService(
            validator,
            repository,
            emailService,
            idGenerator
        );
    });

    test('deve criar um usuário com sucesso', async () => {
        const userData = {
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'senha12345'
        };

        const user = await userService.createUser(userData);
        
        expect(user).toMatchObject({
            name: userData.name,
            email: userData.email,
            password: userData.password
        });
        expect(user.id).toBeDefined();
        expect(user.createdAt).toBeInstanceOf(Date);
    });

    test('deve falhar ao criar usuário com dados inválidos', async () => {
        const invalidData = {
            name: 'João Silva',
            email: 'emailinvalido',
            password: 'senha12345'
        };

        await expect(userService.createUser(invalidData))
            .rejects.toThrow('Email inválido');
    });

    test('deve recuperar um usuário existente', async () => {
        const userData = {
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'senha12345'
        };

        const created = await userService.createUser(userData);
        const found = await userService.getUser(created.id);
        
        expect(found).toEqual(created);
    });

    test('deve atualizar um usuário existente', async () => {
        const userData = {
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'senha12345'
        };

        const created = await userService.createUser(userData);
        const updated = await userService.updateUser(created.id, { name: 'João Silva Jr.' });
        
        expect(updated.name).toBe('João Silva Jr.');
    });

    test('deve deletar um usuário existente', async () => {
        const userData = {
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'senha12345'
        };

        const created = await userService.createUser(userData);
        await userService.deleteUser(created.id);
        
        await expect(userService.getUser(created.id))
            .rejects.toThrow('Usuário não encontrado');
    });
});
