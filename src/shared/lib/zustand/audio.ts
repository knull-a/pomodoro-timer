import { create } from "zustand";
import { DEFAULT_VIDEO_ID } from "../consts";

type AudioStore = {
  isPlaying: boolean;
  videoId: string;
  setPlaying: (value: boolean) => void;
  setVideoId: (value: string) => void;
};

export const useAudioStore = create<AudioStore>((set) => ({
  isPlaying: false,
  videoId: DEFAULT_VIDEO_ID,
  setPlaying: (value) => set(() => ({ isPlaying: value })),
  setVideoId: (value) => set(() => ({ videoId: value })),
}));
