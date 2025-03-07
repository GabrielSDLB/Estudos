// ❌ Problema: Violação do Princípio da Segregação de Interface
// Interface grande que força classes a implementar métodos que não usam

// Interface "gordinha" com muitas responsabilidades
export interface Printer {
    print(document: Document): void;
    scan(document: Document): void;
    fax(document: Document): void;
    copy(document: Document): void;
    staple(document: Document): void;
    bindDocument(document: Document): void;
    uploadToCloud(document: Document): void;
    emailDocument(document: Document, to: string): void;
    configurePrinterSettings(settings: PrinterSettings): void;
    checkInkLevels(): InkLevels;
    orderSupplies(): void;
}

// Tipos auxiliares
interface Document {
    name: string;
    content: string;
}

interface PrinterSettings {
    resolution: number;
    colorMode: 'color' | 'blackAndWhite';
    paperSize: 'A4' | 'Letter' | 'Legal';
}

interface InkLevels {
    cyan: number;
    magenta: number;
    yellow: number;
    black: number;
}

// ❌ Problema: Classe forçada a implementar métodos que não usa
export class BasicPrinter implements Printer {
    print(document: Document): void {
        console.log(`Imprimindo documento: ${document.name}`);
    }

    // ❌ Métodos que não fazem sentido para uma impressora básica
    scan(document: Document): void {
        throw new Error("Impressora básica não suporta digitalização");
    }

    fax(document: Document): void {
        throw new Error("Impressora básica não suporta fax");
    }

    copy(document: Document): void {
        throw new Error("Impressora básica não suporta cópia");
    }

    staple(document: Document): void {
        throw new Error("Impressora básica não suporta grampeamento");
    }

    bindDocument(document: Document): void {
        throw new Error("Impressora básica não suporta encadernação");
    }

    uploadToCloud(document: Document): void {
        throw new Error("Impressora básica não suporta upload para nuvem");
    }

    emailDocument(document: Document, to: string): void {
        throw new Error("Impressora básica não suporta envio de email");
    }

    configurePrinterSettings(settings: PrinterSettings): void {
        console.log("Configurando impressora básica");
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
        throw new Error("Impressora básica não suporta pedido automático de suprimentos");
    }
}

// ❌ Problema: Classe complexa que precisa implementar tudo
export class EnterpriseMultifunctional implements Printer {
    print(document: Document): void {
        console.log(`Imprimindo documento: ${document.name}`);
    }

    scan(document: Document): void {
        console.log(`Digitalizando documento: ${document.name}`);
    }

    fax(document: Document): void {
        console.log(`Enviando fax: ${document.name}`);
    }

    copy(document: Document): void {
        console.log(`Copiando documento: ${document.name}`);
    }

    staple(document: Document): void {
        console.log(`Grampeando documento: ${document.name}`);
    }

    bindDocument(document: Document): void {
        console.log(`Encadernando documento: ${document.name}`);
    }

    uploadToCloud(document: Document): void {
        console.log(`Enviando documento para nuvem: ${document.name}`);
    }

    emailDocument(document: Document, to: string): void {
        console.log(`Enviando documento ${document.name} por email para ${to}`);
    }

    configurePrinterSettings(settings: PrinterSettings): void {
        console.log("Configurando impressora multifuncional");
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
        console.log("Pedindo suprimentos automaticamente");
    }
}

// ❌ Problemas desta abordagem:
// 1. Classes são forçadas a implementar métodos que não usam
// 2. Violação do Princípio da Responsabilidade Única
// 3. Difícil manutenção e evolução
// 4. Alto acoplamento
// 5. Classes quebram o princípio "Tell, Don't Ask"
// 6. Dificuldade em testar
// 7. Código não reflete o domínio corretamente
