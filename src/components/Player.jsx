import { PlayerControlButtonBar } from "@/components/PlayerControlButtonBar";
import { PlayerCurrentSong } from "@/components/PlayerCurrentSong"
import { PlayerSoundControl } from "@/components/PlayerSoundControl"
import { PlayerVolumeControl } from "@/components/PlayerVolumeControl"
import { useCurrentMusic } from "@/hooks/UseCurrentMusic";
import { useEffect, useRef } from "react"
import { usePlayerStore } from "@/store/playerStore"


export function Player() {
  const {currentMusic, isPlaying, volume, setCurrentMusic} = usePlayerStore(state => state);
  const audioRef = useRef();
  const {getNextSong} = useCurrentMusic(currentMusic)

  useEffect(() => {
    if (!currentMusic.song) {
      return;
    }
    isPlaying ? play() : audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume])

  useEffect(() => {
    const {song, playlist} = currentMusic;
    if (song) {
      audioRef.current.src = `/music/${playlist?.id}/0${song.id}.mp3`;
      play();
    }
  }, [currentMusic])


  const play = () => {
    audioRef.current.play()
      .catch((e) => console.log('error playing: ', e))
  }

  function onNextSong() {
    const nextSong = getNextSong();
    if (nextSong) {
      setCurrentMusic({...currentMusic, song: nextSong});
    }
  }

  return (<div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[200px]">
        <PlayerCurrentSong {...currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <PlayerControlButtonBar/>
          <PlayerSoundControl audio={audioRef}/>
          <audio ref={audioRef}
                 onEnded={onNextSong}
          />
        </div>
      </div>

      <div className="grid place-content-center">
        <PlayerVolumeControl/>
      </div>
    </div>)
}