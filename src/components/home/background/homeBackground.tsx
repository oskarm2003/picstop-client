import { useEffect, useMemo, useState } from "react"
import useFetchRandomPhotos from "../../../net/get files/fetchRandomPhotos"
import { t_photo_data } from "../../../types"
import BackgroundTile from "./backgroundTile"


export default function HomeBackground({ vertical_density }: { vertical_density: number }) {

    //calculate tiles' cuantity
    const font_size = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size').replace('px', ''))
    const tile_space = Math.floor(window.innerHeight / vertical_density)
    const size = tile_space / font_size - 2

    //states
    const [horizontal_density, setHorizontalDensity] = useState<number>(Math.floor(window.innerWidth / tile_space) + 1)
    const [photos, setPhotos] = useState<Array<t_photo_data>>([])

    //create tiles
    const tiles = useMemo(() => {
        const arr: Array<number> = new Array()
        for (let i = 0; i < (vertical_density + 1) * horizontal_density; i++) {
            let num = Math.floor(Math.random() * 7)
            arr.push(num)
        }
        return arr
    }, [])

    const [response, _, fetchPhotos] = useFetchRandomPhotos()

    window.onresize = () => {
        const tile_space = Math.floor(window.innerHeight / vertical_density)
        setHorizontalDensity(Math.floor(window.innerWidth / tile_space) + 1)
    }

    useEffect(() => {
        fetchPhotos(vertical_density * horizontal_density < 60 ? vertical_density * horizontal_density : 60)
    }, [])

    useEffect(() => {
        if (response.length === 0) return
        setPhotos(response)
    }, [response])

    const photo_mock: t_photo_data = { id: 0, name: '', timestamp: 0, album: '', author: '' }

    return <div className="home-background" style={{ width: horizontal_density * tile_space }}>
        {tiles.map((value, index) => {
            if (value === 0) {
                return (
                    <div
                        key={index}
                        className="background-tile"
                        style={{ width: size + 'rem' }}>
                    </div>
                )
            }
            return <BackgroundTile key={index} size={size} photo={photos.length != 0 ? photos[Math.floor(Math.random() * photos.length)] : photo_mock} />
        })}
    </div>

}
