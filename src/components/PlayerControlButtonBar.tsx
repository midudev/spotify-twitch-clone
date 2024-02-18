import { Next, Pause, Play, Prev } from "@/icons/PlayerIcons";
import { useCurrentMusic } from "@/hooks/UseCurrentMusic";
import { usePlayerStore } from "@/store/playerStore";

export function PlayerControlButtonBar() {
  const {currentMusic, isPlaying, setIsPlaying, setCurrentMusic} = usePlayerStore(state => state);
  const { getNextSong, getPreviousSong } = useCurrentMusic(currentMusic);


  const onPlayPause = () => {
    if (currentMusic.song === null) return;
    setIsPlaying(!isPlaying);
  }


  const onNextSong = () => {
    const nextSong = getNextSong();
    if (nextSong) {
      setCurrentMusic({ ...currentMusic, song: nextSong });
    }
  }

  const onPrevSong = () => {
    const prevSong = getPreviousSong();
    if (prevSong) {
      setCurrentMusic({ ...currentMusic, song: prevSong });
    }
  }

  return (
    <div className="flex justify-center flex-row flex-nowrap items-center gap-4">
      <button className="hover:scale-110" onClick={onPrevSong} title="Previous song">
        <Prev/>
      </button>
      <button className="bg-white text-black rounded-full p-2 hover:scale-110" onClick={onPlayPause}>
        {isPlaying ? <Pause/> : <Play/>}
      </button>
      <button className="hover:scale-110" onClick={onNextSong} title="Next song">
        <Next/>
      </button>
    </div>
  );
}