import './reel.less'
import Photo from "../photo3D/photo"
import { t_photo_data } from '../../../types'
import { Canvas } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import Slider from '../slider/slider'
import Scroller from './scroller'
import PhotoDetails from '../photoDetails/photoDescription'

const PHOTO_DIMENSIONS: [number, number, number] = [5, 0, 6] //width, depth, height
const SPACE_BETWEEN_PHOTOS: number = 5

export default function Reel({ photos }: { photos: Array<t_photo_data> }) {

    const [reel_position, setReelPosition] = useState(0)
    const [focused_image, setFocusedImage] = useState(0)
    const [slider_progress, setSliderProgress] = useState(0)
    const [slider_in_drag, setSliderInDrag] = useState(false)
    const [photo_detail_position, setPhotoDetailsPosition] = useState<[number, number] | null>(null)
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    const [tilt, setTilt] = useState<[number, number]>([0, 0])

    const sliderReference = useRef<HTMLDivElement>(null)

    //run on first render
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: light)').matches)
            setTheme("light")

        // to force rerender:
        setTilt([0, 0])

    }, [])

    //on reel position change
    useEffect(() => {

        const reelLenght = (photos.length - 1) * (PHOTO_DIMENSIONS[0] + (SPACE_BETWEEN_PHOTOS - PHOTO_DIMENSIONS[0]))
        setSliderProgress(-reel_position / reelLenght)

        // //load more photos
        // if (slider_progress > 0.9 && !loading && allow_fetch && !all_fetched) {
        //     drawUnique(15)
        //     setAllowFetch(false)
        // }
        // else if (slider_progress <= 0.9) {
        //     setAllowFetch(true)
        // }

    }, [reel_position])

    //load only the photos within visibility range
    const photosElements = useMemo(() => {

        //assumed
        const max_inview_photos = 10

        const index_first = Math.max(focused_image - Math.ceil(max_inview_photos / 2), 0)
        const index_last = Math.min(focused_image + Math.ceil(max_inview_photos / 2), photos.length)
        const photos_fragment = photos.slice(index_first, index_last)

        return photos_fragment.map((element, index) => {

            return <Photo
                index={index}
                key={index}
                focused={index === focused_image}
                tilt={index === focused_image ? tilt : [0, -0.1]}
                reel_position={reel_position}
                photo={element}
                x_position={index * SPACE_BETWEEN_PHOTOS}
                setFocusedImage={setFocusedImage}
                dimensions={PHOTO_DIMENSIONS}
                setPhotoDetailsPosition={setPhotoDetailsPosition}
            />
        })
    }, [reel_position, tilt])


    const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        //set photo tilt
        const max_tilt = 0.1
        const x = window.innerWidth / max_tilt
        const y = window.innerHeight / max_tilt

        setTilt([
            (e.clientY - window.innerHeight / 2) / y,
            (e.clientX - window.innerWidth / 2) / x]
        )
    }

    const onSliderDrag = (e: React.MouseEvent<HTMLElement>) => {
        //on slider drag
        if (slider_in_drag) {
            if (sliderReference.current === null) return
            const reelLenght = (photos.length - 1) * (PHOTO_DIMENSIONS[0] + (SPACE_BETWEEN_PHOTOS - PHOTO_DIMENSIONS[0]))

            //check if mouse in range
            const minPos = sliderReference.current.offsetLeft - (sliderReference.current.offsetWidth / 2)
            const maxPos = minPos + sliderReference.current.offsetWidth
            if (e.clientX > maxPos) {
                setReelPosition(-reelLenght)
                setSliderProgress(1)
                return
            }
            if (e.clientX < minPos) {
                setReelPosition(0)
                setSliderProgress(0)
                return
            }

            const posOnSlider = (e.clientX - minPos) / sliderReference.current.offsetWidth
            const newReelPosition = -posOnSlider * reelLenght
            setReelPosition(newReelPosition)
        }
    }

    const scroller = useMemo(() => new Scroller(0, (photos.length - 1) * (PHOTO_DIMENSIONS[0] + (SPACE_BETWEEN_PHOTOS - PHOTO_DIMENSIONS[0]))), [])
    const scroll = (e: React.WheelEvent<HTMLDivElement>) => {

        scroller.maxPos = (photos.length - 1) * (PHOTO_DIMENSIONS[0] + (SPACE_BETWEEN_PHOTOS - PHOTO_DIMENSIONS[0]))
        if ((slider_progress < 0 && e.deltaY < 0) || (slider_progress > 1 && e.deltaY > 0)) return
        //if no speed
        if (scroller.speed === 0) {
            scroller.addSpeed(Math.sign(e.deltaY) * 0.05)
            scroller.run(setReelPosition, reel_position)
            return
        }
        scroller.addSpeed(Math.sign(e.deltaY) * 0.05)
    }

    return <div className="reel" onWheel={(e) => scroll(e)} onMouseMove={(e) => onSliderDrag(e)} onMouseUp={() => setSliderInDrag(false)}>

        <Canvas camera={{ position: [0, -10, 0] }} onMouseMove={onMouseMove} >
            <ambientLight intensity={theme === 'dark' ? 0.1 : 0.5} />
            <pointLight position={[2, -7, 0]} intensity={theme === 'dark' ? 30 : 45} />
            <group position={[reel_position, 0, -0.5]}>
                {photosElements}
            </group>
        </Canvas>

        <Slider progress={slider_progress} reference={sliderReference} setInDrag={setSliderInDrag} />
        {photo_detail_position === null ? null :
            <PhotoDetails photo={photos[focused_image]} position={photo_detail_position} />
        }
    </div>

}