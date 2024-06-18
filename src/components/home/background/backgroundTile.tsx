import { useRef, useState } from 'react'
import './backgroundStyle.less'
import { t_photo_data } from '../../../types'
import useFetchFile from '../../../net/get files/fetchFile'

export default function BackgroundTile({ top_text, size, photo }: { top_text: string, size: number, photo: t_photo_data }) {

    const [shown, setShown] = useState(false)
    const childDiv = useRef<HTMLDivElement>(null)

    const tile_loading_ref = useRef<HTMLDivElement>(null)

    let file = useFetchFile(photo.name, photo.author)
    if (file === undefined) file = ''


    const mouseEnter = () => {
        if (childDiv.current === null || childDiv.current.classList.contains('flip')) return
        childDiv.current.classList.add('flip')

        setTimeout(() => {
            setShown(!shown)
            setTimeout(() => childDiv.current?.classList.remove('flip'), 150)
        }, 150)
    }

    const remove_tile_loading = () => {
        if (tile_loading_ref.current === null) return
        tile_loading_ref.current.remove()
    }

    return <div className="background-tile" style={{ width: size + 'rem' }} onMouseEnter={mouseEnter}>
        <div ref={childDiv}>
            <p style={{ display: shown ? 'none' : 'block' }}>{top_text}</p>
            <div style={{ visibility: shown ? "visible" : "hidden" }} ref={tile_loading_ref} className="tile-loading"></div>
            <img onLoad={remove_tile_loading} src={file} alt="image not found" style={{ display: shown ? 'block' : 'none' }} />
        </div>
    </div>

}
