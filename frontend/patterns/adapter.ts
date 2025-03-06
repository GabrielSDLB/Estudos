// Interface que o cliente espera usar
interface MediaPlayer {
    play(filename: string): string;
    getDescription(): string;
}

// Implementação concreta do MediaPlayer para MP3
class MP3Player implements MediaPlayer {
    play(filename: string): string {
        return `🎵 Reproduzindo arquivo MP3: ${filename} usando player nativo`;
    }

    getDescription(): string {
        return "Player MP3 - Reproduz arquivos .mp3 nativamente";
    }
}

// Interface para reprodutor de mídia avançado (incompatível com MediaPlayer)
interface AdvancedMediaPlayer {
    playVLC(filename: string): string;
    playMP4(filename: string): string;
    getDescription(): string;
}

// Implementação concreta do AdvancedMediaPlayer
class VLCPlayer implements AdvancedMediaPlayer {
    playVLC(filename: string): string {
        return `🎬 Reproduzindo arquivo VLC: ${filename} com codecs especiais VLC`;
    }

    playMP4(filename: string): string {
        return ""; // Não suporta MP4
    }

    getDescription(): string {
        return "VLC Player - Especialista em arquivos .vlc com codecs avançados";
    }
}

class MP4Player implements AdvancedMediaPlayer {
    playVLC(filename: string): string {
        return ""; // Não suporta VLC
    }

    playMP4(filename: string): string {
        return `🎥 Reproduzindo arquivo MP4: ${filename} com otimização de vídeo HD`;
    }

    getDescription(): string {
        return "MP4 Player - Especialista em arquivos .mp4 com suporte a HD";
    }
}

// Classe Adaptadora para tornar AdvancedMediaPlayer compatível com MediaPlayer
class MediaAdapter implements MediaPlayer {
    private advancedMusicPlayer: AdvancedMediaPlayer;
    private type: string;

    constructor(audioType: string) {
        this.type = audioType;
        if (audioType === "vlc") {
            this.advancedMusicPlayer = new VLCPlayer();
        } else if (audioType === "mp4") {
            this.advancedMusicPlayer = new MP4Player();
        } else {
            this.advancedMusicPlayer = new VLCPlayer(); // default
        }
    }

    play(filename: string): string {
        if (filename.endsWith(".vlc")) {
            return this.advancedMusicPlayer.playVLC(filename);
        } else if (filename.endsWith(".mp4")) {
            return this.advancedMusicPlayer.playMP4(filename);
        }
        return `❌ Formato não suportado por este adaptador: ${filename}`;
    }

    getDescription(): string {
        return `Adaptador para ${this.type.toUpperCase()} - ${this.advancedMusicPlayer.getDescription()}`;
    }
}

// Classe Cliente que usa a interface MediaPlayer
class AudioPlayer implements MediaPlayer {
    private mediaAdapter: MediaAdapter | null = null;
    private currentAdapter: string = "";

    play(filename: string): string {
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
            return this.mediaAdapter!.play(filename);
        } else {
            return `❌ Formato de mídia inválido: ${filename}`;
        }
    }

    getDescription(): string {
        if (this.mediaAdapter) {
            return this.mediaAdapter.getDescription();
        }
        return new MP3Player().getDescription();
    }

    getCurrentAdapter(): string {
        return this.currentAdapter || "mp3";
    }
}

// Make classes globally available
(window as any).MP3Player = MP3Player;
(window as any).VLCPlayer = VLCPlayer;
(window as any).MP4Player = MP4Player;
(window as any).MediaAdapter = MediaAdapter;
(window as any).AudioPlayer = AudioPlayer;
