import type { CurrentMusic } from "@/store/playerStore.ts";
import type { Song } from "@/lib/data.ts";


export function useCurrentMusic(currentMusic: CurrentMusic) {

  const getCurrentSongIndex = () => {
    if (currentMusic.songs.length === 0 || currentMusic.song === null) return -1;
    return currentMusic.songs.findIndex(e => e.id === currentMusic.song!.id) ?? -1
  }

  const getNextSong = (): null | Song => {
    const {songs} = currentMusic;
    const totalOfSongsInPlaylist = songs.length;
    if (totalOfSongsInPlaylist === 0) return null;

    const index = getCurrentSongIndex();
    if (index + 1 >= totalOfSongsInPlaylist) {
      return null;
    }
    return songs[index + 1];
  }

  const getPreviousSong = (): null | Song => {
    const index = getCurrentSongIndex();
    if (index <= 0) {
      return null;
    }
    return currentMusic.songs[index - 1];
  }


  return {getPreviousSong, getNextSong}

}