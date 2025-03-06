// Implementação concreta do MediaPlayer para MP3
class MP3Player {
    play(filename) {
        return `🎵 Reproduzindo arquivo MP3: ${filename} usando player nativo`;
    }
    getDescription() {
        return "Player MP3 - Reproduz arquivos .mp3 nativamente";
    }
}
// Implementação concreta do AdvancedMediaPlayer
class VLCPlayer {
    playVLC(filename) {
        return `🎬 Reproduzindo arquivo VLC: ${filename} com codecs especiais VLC`;
    }
    playMP4(filename) {
        return ""; // Não suporta MP4
    }
    getDescription() {
        return "VLC Player - Especialista em arquivos .vlc com codecs avançados";
    }
}
class MP4Player {
    playVLC(filename) {
        return ""; // Não suporta VLC
    }
    playMP4(filename) {
        return `🎥 Reproduzindo arquivo MP4: ${filename} com otimização de vídeo HD`;
    }
    getDescription() {
        return "MP4 Player - Especialista em arquivos .mp4 com suporte a HD";
    }
}
// Classe Adaptadora para tornar AdvancedMediaPlayer compatível com MediaPlayer
class MediaAdapter {
    constructor(audioType) {
        this.type = audioType;
        if (audioType === "vlc") {
            this.advancedMusicPlayer = new VLCPlayer();
        }
        else if (audioType === "mp4") {
            this.advancedMusicPlayer = new MP4Player();
        }
        else {
            this.advancedMusicPlayer = new VLCPlayer(); // default
        }
    }
    play(filename) {
        if (filename.endsWith(".vlc")) {
            return this.advancedMusicPlayer.playVLC(filename);
        }
        else if (filename.endsWith(".mp4")) {
            return this.advancedMusicPlayer.playMP4(filename);
        }
        return `❌ Formato não suportado por este adaptador: ${filename}`;
    }
    getDescription() {
        return `Adaptador para ${this.type.toUpperCase()} - ${this.advancedMusicPlayer.getDescription()}`;
    }
}
// Classe Cliente que usa a interface MediaPlayer
class AudioPlayer {
    constructor() {
        this.mediaAdapter = null;
        this.currentAdapter = "";
    }
    play(filename) {
        // Suporte nativo para reproduzir arquivos mp3
        if (filename.endsWith(".mp3")) {
            return new MP3Player().play(filename);
        }
        // MediaAdapter fornece suporte para outros formatos
        else if (filename.endsWith(".vlc") || filename.endsWith(".mp4")) {
            const type = filename.endsWith(".vlc") ? "vlc" : "mp4";
            if (this.currentAdapter !== type) {
                this.mediaAdapter = new MediaAdapter(type);
                this.currentAdapter = type;
            }
            return this.mediaAdapter.play(filename);
        }
        else {
            return `❌ Formato de mídia inválido: ${filename}`;
        }
    }
    getDescription() {
        if (this.mediaAdapter) {
            return this.mediaAdapter.getDescription();
        }
        return new MP3Player().getDescription();
    }
    getCurrentAdapter() {
        return this.currentAdapter || "mp3";
    }
}
// Make classes globally available
window.MP3Player = MP3Player;
window.VLCPlayer = VLCPlayer;
window.MP4Player = MP4Player;
window.MediaAdapter = MediaAdapter;
window.AudioPlayer = AudioPlayer;
//# sourceMappingURL=adapter.js.map