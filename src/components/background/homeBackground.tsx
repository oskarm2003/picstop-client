import { useState } from "react"
import useFetchRandomPhotos from "../../net/hooks/fetchRandomPhotos"
import { t_photo_data } from "../../types"
import BackgroundTile from "./backgroundTile"



export default function HomeBackground({ vertical_density }: { vertical_density: number }) {

    //calculate tiles' cuantity
    const font_size = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size').replace('px', ''))
    const tile_space = Math.floor(window.innerHeight / vertical_density)
    const size = tile_space / font_size - 2
    const [horizontal_density, setHorizontalDensity] = useState<number>(Math.floor(window.innerWidth / tile_space) + 1)

    window.onresize = () => {
        const tile_space = Math.floor(window.innerHeight / vertical_density)
        setHorizontalDensity(Math.floor(window.innerWidth / tile_space) + 1)
    }

    //get the photos
    let photos = useFetchRandomPhotos(vertical_density * horizontal_density < 60 ? vertical_density * horizontal_density : 60)
    const photo_mock: t_photo_data = { name: '', album: '', author: '', id: 0, timestamp: 0 }

    const arr: Array<number> = new Array()
    for (let i = 0; i < (vertical_density + 1) * horizontal_density; i++) {
        let num = Math.floor(Math.random() * 7)
        arr.push(num)
    }

    return <div className="home-background" style={{ width: horizontal_density * tile_space }}>
        {arr.map((value, index) => {
            if (value === 0) {
                return (
                    <div
                        key={index}
                        className="background-tile"
                        style={{ width: size + 'rem' }}>
                    </div>
                )
            }
            return <BackgroundTile key={index} size={size} photo={photos ? photos[Math.floor(Math.random() * photos.length)] : photo_mock} />
        })}
    </div>

}
