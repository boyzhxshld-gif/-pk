
export class AudioService {
  private static audioContext: AudioContext | null = null;
  private static voices: SpeechSynthesisVoice[] = [];

  static init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    // Preload voices
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const loadVoices = () => {
            this.voices = window.speechSynthesis.getVoices();
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }
  }

  static playClickSound() {
    this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.2;
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  static playSuccessSound() {
    this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = 523.25; // C5
    gainNode.gain.value = 0.3;

    oscillator.frequency.linearRampToValueAtTime(783.99, this.audioContext.currentTime + 0.2); // G5
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.5);
  }

  static playErrorSound() {
    this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'triangle';
    oscillator.frequency.value = 329.63; // E4
    gainNode.gain.value = 0.3;

    oscillator.frequency.linearRampToValueAtTime(220, this.audioContext.currentTime + 0.3); // A3
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.4);
  }

  static startBGM(bgmType?: string) {
    // No-op
  }

  static stopBGM() {
    // No-op
  }

  static playVictoryBGM() {
     // No-op
  }

  static playTTS(text: string) {
     if (!('speechSynthesis' in window)) return;
     
     // Ensure voices are loaded
     if (this.voices.length === 0) {
         this.voices = window.speechSynthesis.getVoices();
     }

     window.speechSynthesis.cancel(); // Stop previous
     const utterance = new SpeechSynthesisUtterance(text);
     utterance.lang = 'en-US';
     
     // Optimized settings for game
     utterance.rate = 1.0; // Normal speed
     utterance.pitch = 1.05; // Slightly feminine pitch shift for neutral voices
     utterance.volume = 1.0;
     
     // Voice Selection Logic - Prioritizing specific Female Voices
     let selectedVoice = null;
     
     // 1. Specific High Quality Female Voices (Cross-platform names)
     const preferredVoices = [
         'Google US English', // Chrome default (usually female)
         'Microsoft Zira',    // Windows default female
         'Samantha',          // MacOS default female
         'Victoria',
         'Karen',
         'Tessa',
         'Veena',
         'Google UK English Female'
     ];

     for (const name of preferredVoices) {
        selectedVoice = this.voices.find(v => v.name.includes(name));
        if (selectedVoice) break;
     }
     
     // 2. Generic fallback search for "female" in name
     if (!selectedVoice) {
        selectedVoice = this.voices.find(v => 
            (v.lang.startsWith('en')) && 
            (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman') || v.name.toLowerCase().includes('girl'))
        );
     }

     // 3. Fallback to any English voice if no female found
     if (!selectedVoice) {
       selectedVoice = this.voices.find(v => v.lang.startsWith('en'));
     }
     
     if (selectedVoice) {
         utterance.voice = selectedVoice;
     }
     
     window.speechSynthesis.speak(utterance);
  }
}
