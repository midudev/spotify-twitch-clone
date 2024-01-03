import {usePlayerStore} from "@/store/playerStore";
import {VolumeSilenced, VolumeLow, VolumeMedium, VolumeFull} from "@/icons/VolumeIcons/Icons";


const isVolumeSilenced = (loud: number) => loud < 0.1
const isVolumeLow = (loud: number) => loud >= 0.1 && loud < 0.5
const isVolumeMedium = (loud: number) => loud >= 0.5 && loud < 0.9
const isVolumeFull = (loud: number) => loud >= 0.9


const getVolumeIconByLouder = (loud: number) => {
  return (
    <>
      {isVolumeSilenced(loud) && <VolumeSilenced/>}
      {isVolumeLow(loud) && <VolumeLow/>}
      {isVolumeMedium(loud) && <VolumeMedium/>}
      {isVolumeFull(loud) && <VolumeFull/>}
    </>
  )
}


export const PlayerVolumeIconComponent = () => {
  const volume = usePlayerStore(state => state.volume)
  return getVolumeIconByLouder(volume)
}