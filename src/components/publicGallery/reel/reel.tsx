import './reel.less'
import Photo from "../photo3D/photo"
import useFetchRandomPhotos from '../../../net/get files/fetchRandomPhotos'
import { t_photo_data } from '../../../types'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import Slider from '../slider/slider'
import Scroller from './scroller'
import PhotoDetails from '../photoDetails/photoDescription'

const PHOTO_DIMENSIONS: [number, number, number] = [5, 0, 6]
const SPACE_BETWEEN_PHOTOS: number = 5

export default function Reel() {

    const [reelPosition, setReelPosition] = useState(0)
    const [focusedImage, setFocusedImage] = useState(0)
    const [tilt, setTilt] = useState<[number, number]>([0, 0])
    const [sliderProgress, setSliderProgress] = useState(0)
    const [sliderInDrag, setSliderInDrag] = useState(false)
    const [photoDetailsPosition, setPhotoDetailsPosition] = useState<[number, number] | null>(null)

    const sliderReference = useRef<HTMLDivElement>(null)

    const result = useFetchRandomPhotos(30)
    let photos: Array<t_photo_data> = []

    if (result != undefined) {
        photos = [...result]
    }

    useEffect(() => {
        const reelLenght = (photos.length - 1) * (PHOTO_DIMENSIONS[0] + (SPACE_BETWEEN_PHOTOS - PHOTO_DIMENSIONS[0]))
        setSliderProgress(-reelPosition / reelLenght)
    }, [reelPosition])

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
        if ((sliderProgress < 0.01 && e.deltaY < 0) || (sliderProgress > 0.99 && e.deltaY > 0)) return
        //if no speed
        if (scroller.getSpeed() === 0) {
            scroller.addSpeed(Math.sign(e.deltaY) * 0.05)
            scroller.run(setReelPosition, reelPosition)
            return
        }
        scroller.addSpeed(Math.sign(e.deltaY) * 0.05)
    }

    return <div className="reel" onWheel={(e) => scroll(e)} onMouseMove={(e) => onSliderDrag(e)} onMouseUp={() => setSliderInDrag(false)}>
        <Canvas camera={{ position: [0, -10, 0] }} onMouseMove={onMouseMove} >
            <ambientLight intensity={0.1} />
            <pointLight position={[0, -7, 0]} intensity={20} />
            <group position={[reelPosition, 0, -0.5]}>
                {photos.map((element, index) => {
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
                })}
            </group>
        </Canvas>
        <Slider progress={sliderProgress} reference={sliderReference} setInDrag={setSliderInDrag} />
        {photoDetailsPosition === null ? null :
            <PhotoDetails photo={photos[focusedImage]} position={photoDetailsPosition} />
        }
    </div>

}