"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { TypewriterSound, type TypewriterSoundName } from "./typewriter-sound";

type SoundContextValue = {
  isOn: boolean;
  toggle: () => void;
  /** Plays a sound if sound is on; does nothing otherwise. */
  play: (name: TypewriterSoundName) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

/** Shares the sound switch between the "Hear it" button and the typewriter. Off until clicked. */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isOn, setIsOn] = useState(false);
  const sound = useRef<TypewriterSound | null>(null);

  useEffect(() => () => sound.current?.close(), []);

  const toggle = useCallback(() => {
    // Created on the first click: browsers only allow audio after one.
    sound.current ??= new TypewriterSound();
    sound.current.resume();
    setIsOn((on) => !on);
  }, []);

  const play = useCallback(
    (name: TypewriterSoundName) => {
      if (isOn) {
        sound.current?.play(name);
      }
    },
    [isOn],
  );

  const value = useMemo(() => ({ isOn, toggle, play }), [isOn, toggle, play]);
  return <SoundContext value={value}>{children}</SoundContext>;
}

export function useSound(): SoundContextValue {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used inside <SoundProvider>.");
  }
  return context;
}
