// Interface para implementação
interface Dispositivo {
    estaLigado(): boolean;
    ligar(): void;
    desligar(): void;
    getVolume(): number;
    setVolume(volume: number): void;
    getCanal(): number;
    setCanal(canal: number): void;
}

// Implementações concretas
class TV implements Dispositivo {
    private ligado: boolean = false;
    private volume: number = 30;
    private canal: number = 1;

    estaLigado(): boolean {
        return this.ligado;
    }

    ligar(): void {
        this.ligado = true;
        console.log('TV ligada');
    }

    desligar(): void {
        this.ligado = false;
        console.log('TV desligada');
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(volume: number): void {
        if (volume >= 0 && volume <= 100) {
            this.volume = volume;
            console.log(`Volume da TV: ${this.volume}`);
        }
    }

    getCanal(): number {
        return this.canal;
    }

    setCanal(canal: number): void {
        this.canal = canal;
        console.log(`Canal da TV: ${this.canal}`);
    }
}

class RadioFM implements Dispositivo {
    private ligado: boolean = false;
    private volume: number = 20;
    private frequencia: number = 87.5;

    estaLigado(): boolean {
        return this.ligado;
    }

    ligar(): void {
        this.ligado = true;
        console.log('Rádio ligado');
    }

    desligar(): void {
        this.ligado = false;
        console.log('Rádio desligado');
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(volume: number): void {
        if (volume >= 0 && volume <= 100) {
            this.volume = volume;
            console.log(`Volume do rádio: ${this.volume}`);
        }
    }

    getCanal(): number {
        return this.frequencia;
    }

    setCanal(frequencia: number): void {
        if (frequencia >= 87.5 && frequencia <= 108.0) {
            this.frequencia = frequencia;
            console.log(`Frequência do rádio: ${this.frequencia.toFixed(1)} MHz`);
        }
    }
}

// Abstração
abstract class ControleRemoto {
    protected dispositivo: Dispositivo;

    constructor(dispositivo: Dispositivo) {
        this.dispositivo = dispositivo;
    }

    ligarDesligar(): void {
        if (this.dispositivo.estaLigado()) {
            this.dispositivo.desligar();
        } else {
            this.dispositivo.ligar();
        }
    }

    aumentarVolume(): void {
        this.dispositivo.setVolume(this.dispositivo.getVolume() + 10);
    }

    diminuirVolume(): void {
        this.dispositivo.setVolume(this.dispositivo.getVolume() - 10);
    }

    avancarCanal(): void {
        this.dispositivo.setCanal(this.dispositivo.getCanal() + 1);
    }

    voltarCanal(): void {
        this.dispositivo.setCanal(this.dispositivo.getCanal() - 1);
    }
}

// Abstração refinada
class ControleRemotoAvancado extends ControleRemoto {
    silenciar(): void {
        this.dispositivo.setVolume(0);
    }

    irParaCanal(canal: number): void {
        this.dispositivo.setCanal(canal);
    }
}

// Make classes globally available
(window as any).TV = TV;
(window as any).RadioFM = RadioFM;
(window as any).ControleRemotoAvancado = ControleRemotoAvancado;
