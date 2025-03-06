// Implementações concretas
class TV {
    constructor() {
        this.ligado = false;
        this.volume = 30;
        this.canal = 1;
    }
    estaLigado() {
        return this.ligado;
    }
    ligar() {
        this.ligado = true;
        console.log('TV ligada');
    }
    desligar() {
        this.ligado = false;
        console.log('TV desligada');
    }
    getVolume() {
        return this.volume;
    }
    setVolume(volume) {
        if (volume >= 0 && volume <= 100) {
            this.volume = volume;
            console.log(`Volume da TV: ${this.volume}`);
        }
    }
    getCanal() {
        return this.canal;
    }
    setCanal(canal) {
        this.canal = canal;
        console.log(`Canal da TV: ${this.canal}`);
    }
}
class RadioFM {
    constructor() {
        this.ligado = false;
        this.volume = 20;
        this.frequencia = 87.5;
    }
    estaLigado() {
        return this.ligado;
    }
    ligar() {
        this.ligado = true;
        console.log('Rádio ligado');
    }
    desligar() {
        this.ligado = false;
        console.log('Rádio desligado');
    }
    getVolume() {
        return this.volume;
    }
    setVolume(volume) {
        if (volume >= 0 && volume <= 100) {
            this.volume = volume;
            console.log(`Volume do rádio: ${this.volume}`);
        }
    }
    getCanal() {
        return this.frequencia;
    }
    setCanal(frequencia) {
        if (frequencia >= 87.5 && frequencia <= 108.0) {
            this.frequencia = frequencia;
            console.log(`Frequência do rádio: ${this.frequencia.toFixed(1)} MHz`);
        }
    }
}
// Abstração
class ControleRemoto {
    constructor(dispositivo) {
        this.dispositivo = dispositivo;
    }
    ligarDesligar() {
        if (this.dispositivo.estaLigado()) {
            this.dispositivo.desligar();
        }
        else {
            this.dispositivo.ligar();
        }
    }
    aumentarVolume() {
        this.dispositivo.setVolume(this.dispositivo.getVolume() + 10);
    }
    diminuirVolume() {
        this.dispositivo.setVolume(this.dispositivo.getVolume() - 10);
    }
    avancarCanal() {
        this.dispositivo.setCanal(this.dispositivo.getCanal() + 1);
    }
    voltarCanal() {
        this.dispositivo.setCanal(this.dispositivo.getCanal() - 1);
    }
}
// Abstração refinada
class ControleRemotoAvancado extends ControleRemoto {
    silenciar() {
        this.dispositivo.setVolume(0);
    }
    irParaCanal(canal) {
        this.dispositivo.setCanal(canal);
    }
}
// Make classes globally available
window.TV = TV;
window.RadioFM = RadioFM;
window.ControleRemotoAvancado = ControleRemotoAvancado;
//# sourceMappingURL=bridge.js.map