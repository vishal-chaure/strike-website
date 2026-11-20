/** The typewriter's sounds. */
export type TypewriterSoundName = "key" | "space" | "bell" | "return";

const NOISE_SECONDS = 0.5;
const SILENT = 0.0001;

/**
 * Typewriter sounds made on the fly with Web Audio (no sound files): a key's
 * clack, the space bar's softer thud, the margin bell and the carriage return.
 * Browsers only allow sound after a click, so create it from one.
 */
export class TypewriterSound {
  private readonly context = new AudioContext();
  private readonly noise = this.makeNoise();

  /** Wakes the audio if the browser paused it. */
  resume(): void {
    if (this.context.state === "suspended") {
      void this.context.resume();
    }
  }

  play(name: TypewriterSoundName): void {
    switch (name) {
      case "key":
        this.burst({
          frequency: 2200 + Math.random() * 900,
          q: 1.4,
          gain: 0.5,
          decay: 0.045,
        });
        this.tone({
          frequency: 110 + Math.random() * 30,
          gain: 0.25,
          decay: 0.07,
          type: "triangle",
        });
        break;
      case "space":
        this.burst({ frequency: 900, q: 0.8, gain: 0.35, decay: 0.06 });
        break;
      case "bell":
        this.tone({ frequency: 2093, gain: 0.12, decay: 1.4 });
        this.tone({ frequency: 4186, gain: 0.05, decay: 0.9 });
        break;
      case "return":
        this.carriageReturn();
        break;
    }
  }

  close(): void {
    void this.context.close();
  }

  /** The carriage sliding back, then landing with a clunk. */
  private carriageReturn(): void {
    const slide = this.burst({
      frequency: 700,
      q: 0.7,
      gain: 0.25,
      decay: 0.38,
      type: "lowpass",
    });
    slide.frequency.exponentialRampToValueAtTime(
      3200,
      this.context.currentTime + 0.32,
    );
    const landing = this.context.currentTime + 0.36;
    this.burst({ frequency: 400, q: 1, gain: 0.6, decay: 0.08, at: landing });
    this.tone({
      frequency: 80,
      gain: 0.3,
      decay: 0.1,
      type: "triangle",
      at: landing,
    });
  }

  private makeNoise(): AudioBuffer {
    const { sampleRate } = this.context;
    const buffer = this.context.createBuffer(
      1,
      sampleRate * NOISE_SECONDS,
      sampleRate,
    );
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /** A short burst of filtered noise; returns the filter so it can be swept. */
  private burst(options: {
    frequency: number;
    q: number;
    gain: number;
    decay: number;
    type?: BiquadFilterType;
    at?: number;
  }): BiquadFilterNode {
    const {
      frequency,
      q,
      gain,
      decay,
      type = "bandpass",
      at = this.context.currentTime,
    } = options;
    const source = this.context.createBufferSource();
    source.buffer = this.noise;
    const filter = this.context.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    filter.Q.value = q;
    source.connect(filter).connect(this.envelope(gain, decay, at));
    source.start(at);
    source.stop(at + decay);
    return filter;
  }

  private tone(options: {
    frequency: number;
    gain: number;
    decay: number;
    type?: OscillatorType;
    at?: number;
  }): void {
    const {
      frequency,
      gain,
      decay,
      type = "sine",
      at = this.context.currentTime,
    } = options;
    const oscillator = this.context.createOscillator();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.connect(this.envelope(gain, decay, at));
    oscillator.start(at);
    oscillator.stop(at + decay);
  }

  /** Starts at `gain` and fades to silence over `decay` seconds. */
  private envelope(gain: number, decay: number, at: number): GainNode {
    const node = this.context.createGain();
    node.gain.setValueAtTime(gain, at);
    node.gain.exponentialRampToValueAtTime(SILENT, at + decay);
    node.connect(this.context.destination);
    return node;
  }
}
