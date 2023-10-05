import { Pause, Play } from "./Player"
import { usePlayerStore } from '@/store/playerStore'

export function CardPlayButton ({ id }) {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic
  } = usePlayerStore(state => state)

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data

        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] })
      })

    // async/await
    // const res = await fetch(`/api/get-info-playlist.json?id=${id}`)
    // const data = await res.json()
    // const { songs, playlist } = data
  }


  return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4">
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  )
}