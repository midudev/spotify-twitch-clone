import { usePlayerStore } from "@/store/playerStore"
import { Next, Pause, Play, Prev } from "@/icons/PlayerIcons"
import { PlayerCurrentSong } from "@/components/PlayerCurrentSong"
import { PlayerSoundControl } from "@/components/PlayerSoundControl"
import { PlayerVolumeControl } from "@/components/PlayerVolumeControl"
import { useEffect, useRef } from "react"


export function Player() {
  const {currentMusic, isPlaying, setIsPlaying, volume, setCurrentMusic} = usePlayerStore(state => state);
  const audioRef = useRef();

  useEffect(() => {
    if (!currentMusic.song) {
      return;
    }
    isPlaying
      ? audioRef.current.play().catch((e) => console.log('error playing: ', e))
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

  const onPlayPause = () => {
    setIsPlaying(!isPlaying);
  }


  const getCurrentSongIndex = () => {
    if (currentMusic.songs.length === 0) return -1;
    return currentMusic.songs.findIndex(e => e.id === currentMusic.song.id) ?? -1
  }

  const onNextSong = () => {
    const {songs} = currentMusic;
    const playlistSongs = songs.length;
    if (playlistSongs === 0) return;

    const index = getCurrentSongIndex()
    if (index + 1 < playlistSongs) {
      updateCurrentMusicBySongId(index + 1)
    }
  }

  const onPrevSong = () => {
    const index = getCurrentSongIndex()
    if (index > 0) {
      updateCurrentMusicBySongId(index - 1)
    }
  }

  const updateCurrentMusicBySongId = (songIndex) => {
    const {playlist, songs} = currentMusic;
    setIsPlaying(false);
    setCurrentMusic({songs, playlist, song: songs[songIndex]})
    setIsPlaying(true);
  }

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[200px]">
        <PlayerCurrentSong {...currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
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
          <PlayerSoundControl audio={audioRef}/>
          <audio ref={audioRef} onEnded={onNextSong}/>
        </div>
      </div>

      <div className="grid place-content-center">
        <PlayerVolumeControl/>
      </div>
    </div>
  )
}