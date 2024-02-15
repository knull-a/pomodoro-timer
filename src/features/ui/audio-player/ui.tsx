import YouTube from "react-youtube";
import { IconPause } from "@/features/assets/icon-pause";
import { IconPlay } from "@/features/assets/icon-play";
import { useAudioStore } from "@/shared/lib/zustand/audio";
import { Button } from "@/shared/ui/button/ui";

export function AudioPlayer() {
  const { isPlaying, setPlaying, videoId } = useAudioStore();

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      {isPlaying ? (
        <Button variant="no-bg" onClick={() => setPlaying(false)}>
          <IconPause />
          <YouTube
            videoId={videoId}
            style={{ top: 0, left: 0, position: "absolute", opacity: 0 }}
            opts={opts}
          />
        </Button>
      ) : (
        <Button variant="no-bg" onClick={() => setPlaying(true)}>
          <IconPlay />
        </Button>
      )}
    </div>
  );
}
