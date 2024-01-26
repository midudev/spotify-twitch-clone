import { usePlayerStore } from "@/store/playerStore"
import { Pause, Play } from "@/icons/PlayerIcons"
import { PlayerCurrentSong } from "@/components/PlayerCurrentSong"
import { PlayerSoundControl } from "@/components/PlayerSoundControl"
import { PlayerVolumeControl } from "@/components/PlayerVolumeControl"
import { useEffect, useRef } from "react"


export function Player() {
  const {currentMusic, isPlaying, setIsPlaying, volume} = usePlayerStore(state => state);
  const audioRef = useRef();

  useEffect(() => {
    isPlaying
      ? audioRef.current.play()
      : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume])

  useEffect(() => {
    const {song, playlist} = currentMusic;
    if (song) {
      audioRef.current.src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentMusic])

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[200px]">
        <PlayerCurrentSong {...currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause/> : <Play/>}
          </button>
          <PlayerSoundControl audio={audioRef}/>
          <audio ref={audioRef}/>
        </div>
      </div>

      <div className="grid place-content-center">
        <PlayerVolumeControl/>
      </div>
    </div>
  )
}