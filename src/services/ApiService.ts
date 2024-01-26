export function getPlayListInfoById(playListId: number) {
  return fetch(`/api/get-info-playlist.json?id=${playListId}`)
    .then(res => res.json())
}