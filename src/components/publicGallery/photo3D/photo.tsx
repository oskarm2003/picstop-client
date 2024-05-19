import useFetchFile from '../../../net/get files/fetchFile';
import { t_photo_data } from '../../../types'
import { TextureLoader } from 'three';
import { useEffect, useRef, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';


export default function Photo({ photo, x_position, focused, index, reel_position, tilt, setPhotoDetailsPosition, dimensions, setFocusedImage, }:
    {
        photo: t_photo_data,
        focused: boolean,
        index: number,
        setPhotoDetailsPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>,
        dimensions: [number, number, number],
        x_position: number,
        reel_position: number,
        setFocusedImage: React.Dispatch<React.SetStateAction<number>>,
        tilt: [number, number]
    }) {

    const [textureMap, setTextureMap] = useState<THREE.Texture | null>(null)
    const photoRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null)

    const url = useFetchFile(photo.name, photo.author)
    const navigate = useNavigate()

    //load photo after url change
    useEffect(() => {
        if (url === undefined) return
        const loader = new TextureLoader()
        loader.load(url, (texture) => {
            setTextureMap(texture)
        })
    }, [url])

    useEffect(() => {
        const canvasPosition = x_position + reel_position
        if (photoRef.current === null) return

        const range = 3
        //move forward
        if (Math.abs(canvasPosition) < range) {
            if (Math.abs(canvasPosition) > 1) {
                photoRef.current.position.y = (Math.abs(canvasPosition) - range) * 1.5
            }
            else {
                photoRef.current.position.y = -range
            }
        }
        //back to original position
        else {
            photoRef.current.position.y = 0
        }

        //check if photo should be focused
        if (!focused) {
            if (Math.abs(canvasPosition) < 1.5) {
                setFocusedImage(index)
            }
            return
        }

    }, [reel_position])

    const onMouseOver = (e: ThreeEvent<PointerEvent>) => {
        if (!focused) return
        setPhotoDetailsPosition([e.clientX, e.clientY])
        document.body.style.cursor = 'pointer'
    }

    const onMouseOut = () => {
        setPhotoDetailsPosition(null)
        document.body.style.cursor = ''
    }

    const onClick = () => {
        if (!focused) return
        navigate('/details/' + photo.author + '/' + photo.name)
    }

    return <group
        ref={photoRef}
        position={[x_position, 0, 0]}
        rotation={[tilt[0], 0, tilt[1]]}>
        <mesh position={[0, 0, 0]}
            onPointerMove={(e) => onMouseOver(e)}
            onPointerLeave={onMouseOut}
            onPointerUp={onClick}>
            <boxGeometry args={dimensions} />
            <meshStandardMaterial color='white' />
        </mesh>
        {textureMap === null ? null :
            <Image texture={textureMap} />}
    </group>
}

//external image component
function Image({ texture }: { texture: THREE.Texture }) {
    return <mesh position={[0, -0.1, 0.5]}>
        <boxGeometry args={[4.5, 0, 4.5]} />
        <meshStandardMaterial map={texture} attach='material' />
    </mesh>
}