import {
    Document,
    BasicPrinter,
    HomeOfficePrinter,
    EnterpriseMultifunctional,
    PrinterManager,
    Printable,
    Scannable,
    Faxable
} from './solution';

describe('Interface Segregation Tests', () => {
    let consoleSpy: jest.SpyInstance;
    const testDocument: Document = {
        name: 'test.pdf',
        content: 'Test content'
    };

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('BasicPrinter', () => {
        let printer: BasicPrinter;

        beforeEach(() => {
            printer = new BasicPrinter();
        });

        test('deve imprimir documentos', () => {
            printer.print(testDocument);
            expect(consoleSpy).toHaveBeenCalledWith('Imprimindo documento: test.pdf');
        });

        test('deve configurar impressora', () => {
            const settings = {
                resolution: 300,
                colorMode: 'color' as const,
                paperSize: 'A4' as const
            };
            printer.configurePrinterSettings(settings);
            expect(consoleSpy).toHaveBeenCalledWith('Configurando impressora básica:', settings);
        });

        test('deve verificar níveis de tinta', () => {
            const levels = printer.checkInkLevels();
            expect(levels).toEqual({
                cyan: 100,
                magenta: 100,
                yellow: 100,
                black: 100
            });
        });

        test('deve gerenciar suprimentos manualmente', () => {
            printer.orderSupplies();
            expect(consoleSpy).toHaveBeenCalledWith('Pedido manual de suprimentos necessário');
        });
    });

    describe('HomeOfficePrinter', () => {
        let printer: HomeOfficePrinter;

        beforeEach(() => {
            printer = new HomeOfficePrinter();
        });

        test('deve imprimir e digitalizar', () => {
            printer.print(testDocument);
            printer.scan(testDocument);

            expect(consoleSpy).toHaveBeenCalledWith('Imprimindo documento: test.pdf');
            expect(consoleSpy).toHaveBeenCalledWith('Digitalizando documento: test.pdf');
        });

        test('deve retornar tipo de arquivo digitalizado', () => {
            expect(printer.getScannedFileType()).toBe('PDF');
        });

        test('deve fazer cópias com contagem configurável', () => {
            printer.setCopyCount(3);
            printer.copy(testDocument);
            expect(consoleSpy).toHaveBeenCalledWith('Fazendo 3 cópias de: test.pdf');
        });
    });

    describe('EnterpriseMultifunctional', () => {
        let printer: EnterpriseMultifunctional;

        beforeEach(() => {
            printer = new EnterpriseMultifunctional();
        });

        test('deve suportar todas as funcionalidades', () => {
            printer.print(testDocument);
            printer.scan(testDocument);
            printer.fax(testDocument);
            printer.copy(testDocument);
            printer.staple(testDocument);
            printer.bindDocument(testDocument);
            printer.uploadToCloud(testDocument);
            printer.emailDocument(testDocument, 'test@example.com');

            expect(consoleSpy).toHaveBeenCalledWith('Imprimindo documento: test.pdf');
            expect(consoleSpy).toHaveBeenCalledWith('Digitalizando documento: test.pdf');
            expect(consoleSpy).toHaveBeenCalledWith('Enviando fax: test.pdf');
            expect(consoleSpy).toHaveBeenCalledWith('Fazendo 1 cópias de: test.pdf');
            expect(consoleSpy).toHaveBeenCalledWith('Grampeando documento: test.pdf');
            expect(consoleSpy).toHaveBeenCalledWith('Encadernando documento: test.pdf');
            expect(consoleSpy).toHaveBeenCalledWith('Enviando para nuvem: test.pdf');
            expect(consoleSpy).toHaveBeenCalledWith('Enviando test.pdf para test@example.com');
        });

        test('deve manter histórico de emails', () => {
            printer.emailDocument(testDocument, 'test@example.com');
            expect(printer.getEmailHistory()).toContain('test.pdf enviado para test@example.com');
        });

        test('deve gerenciar armazenamento na nuvem', () => {
            const status = printer.getCloudStorageStatus();
            expect(status).toEqual({ used: 50, total: 100 });
        });
    });

    describe('PrinterManager', () => {
        test('deve gerenciar diferentes tipos de impressoras', () => {
            const basicPrinter = new BasicPrinter();
            const officePrinter = new HomeOfficePrinter();
            const enterprisePrinter = new EnterpriseMultifunctional();

            // Usando interface Printable
            PrinterManager.printDocument(basicPrinter, testDocument);
            PrinterManager.printDocument(officePrinter, testDocument);
            PrinterManager.printDocument(enterprisePrinter, testDocument);

            // Usando interface Scannable
            PrinterManager.scanDocument(officePrinter, testDocument);
            PrinterManager.scanDocument(enterprisePrinter, testDocument);

            // Usando interface Faxable
            PrinterManager.sendFax(enterprisePrinter, testDocument);

            expect(consoleSpy).toHaveBeenCalledTimes(6);
        });

        test('deve fazer cópia avançada com impressora enterprise', () => {
            const enterprisePrinter = new EnterpriseMultifunctional();
            PrinterManager.makeAdvancedCopy(enterprisePrinter, testDocument);

            expect(consoleSpy).toHaveBeenCalledWith('Fazendo 1 cópias de: test.pdf');
            expect(consoleSpy).toHaveBeenCalledWith('Grampeando documento: test.pdf');
            expect(consoleSpy).toHaveBeenCalledWith('Encadernando documento: test.pdf');
        });
    });

    // Demonstração de Type Safety
    describe('Type Safety', () => {
        test('demonstração de segurança de tipos', () => {
            const basicPrinter = new BasicPrinter();
            const officePrinter = new HomeOfficePrinter();

            // ✅ Compilação OK: BasicPrinter implementa Printable
            const printable: Printable = basicPrinter;

            // ✅ Compilação OK: HomeOfficePrinter implementa Printable & Scannable
            const scannable: Scannable = officePrinter;

            // ❌ Erro de compilação: BasicPrinter não implementa Scannable
            // const invalidScanner: Scannable = basicPrinter;

            // ❌ Erro de compilação: HomeOfficePrinter não implementa Faxable
            // const invalidFax: Faxable = officePrinter;

            expect(printable).toBeDefined();
            expect(scannable).toBeDefined();
        });
    });
});
