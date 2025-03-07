// ✅ Solução: Aplicando o Princípio da Segregação de Interface
// Interfaces pequenas e coesas, cada uma com uma responsabilidade específica

// Tipos comuns
export interface Document {
    name: string;
    content: string;
}

export interface PrinterSettings {
    resolution: number;
    colorMode: 'color' | 'blackAndWhite';
    paperSize: 'A4' | 'Letter' | 'Legal';
}

export interface InkLevels {
    cyan: number;
    magenta: number;
    yellow: number;
    black: number;
}

// ✅ Interfaces segregadas por funcionalidade
export interface Printable {
    print(document: Document): void;
    configurePrinterSettings(settings: PrinterSettings): void;
}

export interface Scannable {
    scan(document: Document): void;
    getScannedFileType(): 'PDF' | 'JPEG' | 'PNG';
}

export interface Faxable {
    fax(document: Document): void;
    confirmFaxDelivery(faxId: string): boolean;
}

export interface Copyable {
    copy(document: Document): void;
    setCopyCount(count: number): void;
}

export interface AdvancedFinishing {
    staple(document: Document): void;
    bindDocument(document: Document): void;
}

export interface CloudEnabled {
    uploadToCloud(document: Document): void;
    getCloudStorageStatus(): { used: number; total: number };
}

export interface EmailCapable {
    emailDocument(document: Document, to: string): void;
    getEmailHistory(): string[];
}

export interface SupplyManagement {
    checkInkLevels(): InkLevels;
    orderSupplies(): void;
    getSupplyHistory(): string[];
}

// ✅ Implementação de impressora básica
export class BasicPrinter implements Printable, SupplyManagement {
    print(document: Document): void {
        console.log(`Imprimindo documento: ${document.name}`);
    }

    configurePrinterSettings(settings: PrinterSettings): void {
        console.log("Configurando impressora básica:", settings);
    }

    checkInkLevels(): InkLevels {
        return {
            cyan: 100,
            magenta: 100,
            yellow: 100,
            black: 100
        };
    }

    orderSupplies(): void {
        console.log("Pedido manual de suprimentos necessário");
    }

    getSupplyHistory(): string[] {
        return ["Nenhum pedido automático disponível"];
    }
}

// ✅ Implementação de impressora multifuncional
export class HomeOfficePrinter implements 
    Printable, 
    Scannable, 
    Copyable, 
    SupplyManagement 
{
    private copyCount: number = 1;

    print(document: Document): void {
        console.log(`Imprimindo documento: ${document.name}`);
    }

    configurePrinterSettings(settings: PrinterSettings): void {
        console.log("Configurando impressora home office:", settings);
    }

    scan(document: Document): void {
        console.log(`Digitalizando documento: ${document.name}`);
    }

    getScannedFileType(): 'PDF' | 'JPEG' | 'PNG' {
        return 'PDF';
    }

    copy(document: Document): void {
        console.log(`Fazendo ${this.copyCount} cópias de: ${document.name}`);
    }

    setCopyCount(count: number): void {
        this.copyCount = count;
    }

    checkInkLevels(): InkLevels {
        return {
            cyan: 80,
            magenta: 85,
            yellow: 90,
            black: 95
        };
    }

    orderSupplies(): void {
        console.log("Pedido manual de suprimentos com notificação");
    }

    getSupplyHistory(): string[] {
        return ["Últimas notificações de níveis baixos"];
    }
}

// ✅ Implementação de impressora empresarial completa
export class EnterpriseMultifunctional implements 
    Printable,
    Scannable,
    Faxable,
    Copyable,
    AdvancedFinishing,
    CloudEnabled,
    EmailCapable,
    SupplyManagement 
{
    private copyCount: number = 1;
    private emailHistory: string[] = [];
    private supplyHistory: string[] = [];

    print(document: Document): void {
        console.log(`Imprimindo documento: ${document.name}`);
    }

    configurePrinterSettings(settings: PrinterSettings): void {
        console.log("Configurando impressora empresarial:", settings);
    }

    scan(document: Document): void {
        console.log(`Digitalizando documento: ${document.name}`);
    }

    getScannedFileType(): 'PDF' | 'JPEG' | 'PNG' {
        return 'PDF';
    }

    fax(document: Document): void {
        console.log(`Enviando fax: ${document.name}`);
    }

    confirmFaxDelivery(faxId: string): boolean {
        return true;
    }

    copy(document: Document): void {
        console.log(`Fazendo ${this.copyCount} cópias de: ${document.name}`);
    }

    setCopyCount(count: number): void {
        this.copyCount = count;
    }

    staple(document: Document): void {
        console.log(`Grampeando documento: ${document.name}`);
    }

    bindDocument(document: Document): void {
        console.log(`Encadernando documento: ${document.name}`);
    }

    uploadToCloud(document: Document): void {
        console.log(`Enviando para nuvem: ${document.name}`);
    }

    getCloudStorageStatus(): { used: number; total: number } {
        return { used: 50, total: 100 };
    }

    emailDocument(document: Document, to: string): void {
        console.log(`Enviando ${document.name} para ${to}`);
        this.emailHistory.push(`${document.name} enviado para ${to}`);
    }

    getEmailHistory(): string[] {
        return this.emailHistory;
    }

    checkInkLevels(): InkLevels {
        return {
            cyan: 75,
            magenta: 80,
            yellow: 85,
            black: 90
        };
    }

    orderSupplies(): void {
        const order = "Pedido automático de suprimentos";
        console.log(order);
        this.supplyHistory.push(order);
    }

    getSupplyHistory(): string[] {
        return this.supplyHistory;
    }
}

// ✅ Exemplo de uso:
export class PrinterManager {
    static printDocument(printer: Printable, document: Document): void {
        printer.print(document);
    }

    static scanDocument(scanner: Scannable, document: Document): void {
        scanner.scan(document);
        console.log(`Tipo do arquivo: ${scanner.getScannedFileType()}`);
    }

    static sendFax(faxMachine: Faxable, document: Document): void {
        faxMachine.fax(document);
    }

    static makeAdvancedCopy(
        printer: Printable & Copyable & AdvancedFinishing,
        document: Document
    ): void {
        printer.copy(document);
        printer.staple(document);
        printer.bindDocument(document);
    }
}

// ✅ Benefícios desta abordagem:
// 1. Interfaces pequenas e focadas
// 2. Classes implementam apenas o que precisam
// 3. Melhor organização do código
// 4. Facilidade de manutenção
// 5. Melhor testabilidade
// 6. Baixo acoplamento
// 7. Alta coesão
// 8. Flexibilidade para composição
// 9. Código mais expressivo
// 10. Melhor modelagem do domínio
