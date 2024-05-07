import './reel.less'
import Photo from "../photo3D/photo"
import { t_photo_data } from '../../../types'
import { Canvas } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import Slider from '../slider/slider'
import Scroller from './scroller'
import PhotoDetails from '../photoDetails/photoDescription'

const PHOTO_DIMENSIONS: [number, number, number] = [5, 0, 6]
const SPACE_BETWEEN_PHOTOS: number = 5

export default function Reel({ photos }: { photos: Array<t_photo_data> }) {

    const [reelPosition, setReelPosition] = useState(0)
    const [focusedImage, setFocusedImage] = useState(0)
    const [tilt, setTilt] = useState<[number, number]>([0, 0])
    const [sliderProgress, setSliderProgress] = useState(0)
    const [sliderInDrag, setSliderInDrag] = useState(false)
    const [photoDetailsPosition, setPhotoDetailsPosition] = useState<[number, number] | null>(null)
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')

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
        setSliderProgress(-reelPosition / reelLenght)

        // //load more photos
        // if (sliderProgress > 0.9 && !loading && allow_fetch && !all_fetched) {
        //     drawUnique(15)
        //     setAllowFetch(false)
        // }
        // else if (sliderProgress <= 0.9) {
        //     setAllowFetch(true)
        // }

    }, [reelPosition])

    //set the photos to view
    const photosElements = useMemo(() => {
        const toMap = photos.slice(0, Math.floor(Math.abs(reelPosition / SPACE_BETWEEN_PHOTOS)) + 5)
        return toMap.map((element, index) => {
            //optimalization - view only in range
            if (Math.abs(index * SPACE_BETWEEN_PHOTOS + reelPosition) > SPACE_BETWEEN_PHOTOS * 5) return
            return <Photo
                focused={index === focusedImage}
                index={index}
                tilt={index === focusedImage ? tilt : [0, -0.1]}
                reelPosition={reelPosition}
                key={index}
                photo={element}
                positionX={index * SPACE_BETWEEN_PHOTOS}
                setFocusedImage={setFocusedImage}
                dimensions={PHOTO_DIMENSIONS}
                setPhotoDetailsPosition={setPhotoDetailsPosition}
            />
        })
    }, [reelPosition, tilt])

    const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        //set photo tilt
        const max_tilt = 0.1
        const x = window.innerWidth / max_tilt
        const y = window.innerHeight / max_tilt

        setTilt([(e.clientY - window.innerHeight / 2) / y, (e.clientX - window.innerWidth / 2) / x])
    }

    const onSliderDrag = (e: React.MouseEvent<HTMLElement>) => {
        //on slider drag
        if (sliderInDrag) {
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

    const scroller = new Scroller(0, (photos.length - 1) * (PHOTO_DIMENSIONS[0] + (SPACE_BETWEEN_PHOTOS - PHOTO_DIMENSIONS[0])))
    const scroll = (e: React.WheelEvent<HTMLDivElement>) => {
        if ((sliderProgress < 0 && e.deltaY < 0) || (sliderProgress > 1 && e.deltaY > 0)) return
        //if no speed
        if (scroller.getSpeed() === 0) {
            scroller.addSpeed(Math.sign(e.deltaY) * 0.05)
            scroller.run(setReelPosition, reelPosition)
            return
        }
        scroller.addSpeed(Math.sign(e.deltaY) * 0.05)
    }

    return <div className="reel" onWheel={(e) => scroll(e)} onMouseMove={(e) => onSliderDrag(e)} onMouseUp={() => setSliderInDrag(false)}>

        <Canvas camera={{ position: [0, -10, 0] }} onMouseMove={onMouseMove} onLoad={() => {
            console.log("LOADED NOW!");
        }} >
            <ambientLight intensity={theme === 'dark' ? 0.1 : 0.5} />
            <pointLight position={[2, -7, 0]} intensity={theme === 'dark' ? 30 : 45} />
            <group position={[reelPosition, 0, -0.5]}>
                {photosElements}
            </group>
        </Canvas>

        <Slider progress={sliderProgress} reference={sliderReference} setInDrag={setSliderInDrag} />
        {photoDetailsPosition === null ? null :
            <PhotoDetails photo={photos[focusedImage]} position={photoDetailsPosition} />
        }
    </div>

}