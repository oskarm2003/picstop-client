import { useRef, useState } from 'react'
import './backgroundStyle.less'
import { t_photo_data } from '../../../types'
import useFetchFile from '../../../net/get files/fetchFile'

export default function BackgroundTile({ size, photo }: { size: number, photo: t_photo_data }) {

    const [shown, setShown] = useState(false)
    const childDiv = useRef<HTMLDivElement>(null)

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

    return <div className="background-tile" style={{ width: size + 'rem' }} onMouseEnter={mouseEnter}>
        <div ref={childDiv}>
            <img src={file} alt="fetching image..." style={{ display: shown ? 'block' : 'none' }} />
        </div>
    </div>

}
