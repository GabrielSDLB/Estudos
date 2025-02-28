// Interface que o cliente espera usar
interface MediaPlayer {
    play(filename: string): void;
}

// Implementação concreta do MediaPlayer para MP3
class MP3Player implements MediaPlayer {
    play(filename: string): void {
        console.log(`Reproduzindo arquivo MP3: ${filename}`);
    }
}

// Interface para reprodutor de mídia avançado (incompatível com MediaPlayer)
interface AdvancedMediaPlayer {
    playVLC(filename: string): void;
    playMP4(filename: string): void;
}

// Implementação concreta do AdvancedMediaPlayer
class VLCPlayer implements AdvancedMediaPlayer {
    playVLC(filename: string): void {
        console.log(`Reproduzindo arquivo VLC: ${filename}`);
    }

    playMP4(filename: string): void {
        // Não faz nada
    }
}

class MP4Player implements AdvancedMediaPlayer {
    playVLC(filename: string): void {
        // Não faz nada
    }

    playMP4(filename: string): void {
        console.log(`Reproduzindo arquivo MP4: ${filename}`);
    }
}

// Classe Adaptadora para tornar AdvancedMediaPlayer compatível com MediaPlayer
class MediaAdapter implements MediaPlayer {
    private advancedMusicPlayer: AdvancedMediaPlayer;

    constructor(audioType: string) {
        if (audioType === "vlc") {
            this.advancedMusicPlayer = new VLCPlayer();
        } else if (audioType === "mp4") {
            this.advancedMusicPlayer = new MP4Player();
        }
    }

    play(filename: string): void {
        if (filename.endsWith(".vlc")) {
            this.advancedMusicPlayer.playVLC(filename);
        } else if (filename.endsWith(".mp4")) {
            this.advancedMusicPlayer.playMP4(filename);
        }
    }
}

// Classe Cliente que usa a interface MediaPlayer
class AudioPlayer implements MediaPlayer {
    private mediaAdapter: MediaAdapter;

    play(filename: string): void {
        // Suporte nativo para reproduzir arquivos mp3
        if (filename.endsWith(".mp3")) {
            console.log(`Reproduzindo arquivo MP3: ${filename}`);
        }
        // MediaAdapter fornece suporte para outros formatos
        else if (filename.endsWith(".vlc") || filename.endsWith(".mp4")) {
            this.mediaAdapter = new MediaAdapter(
                filename.endsWith(".vlc") ? "vlc" : "mp4"
            );
            this.mediaAdapter.play(filename);
        } else {
            console.log(`Formato de mídia inválido: ${filename}`);
        }
    }
}

// Exemplo de uso
const audioPlayer = new AudioPlayer();
audioPlayer.play("music.mp3");     // Suporte nativo
audioPlayer.play("movie.vlc");     // Usando adaptador para VLC
audioPlayer.play("video.mp4");     // Usando adaptador para MP4
audioPlayer.play("song.avi");      // Formato inválido
