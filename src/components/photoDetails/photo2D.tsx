import { useRef } from 'react'
import useFetchFile from '../../net/get files/fetchFile'
import getDominatingColor from '../postPhoto/postPhotoForm/getDominatingColor'
import './photoDetails.less'
import CustomButton from '../common/customButton/customButton'
import { useNavigate } from 'react-router-dom'

export default function Photo2D({ author, photo_name, setMouseColor, setDimensions }:
    {
        author: string, photo_name: string,
        setMouseColor: React.Dispatch<React.SetStateAction<string>>,
        setDimensions: React.Dispatch<React.SetStateAction<[number, number]>>,
    }) {

    const filepath = useFetchFile(photo_name, author)
    const fileRef = useRef<HTMLImageElement>(null)

    const navigate = useNavigate()

    const onFileLoad = () => {
        if (fileRef.current === null) return
        const color = getDominatingColor(fileRef.current)
        setMouseColor(color)

        const setSize = () => {
            if (fileRef.current === null) return
            setDimensions([
                fileRef.current.offsetWidth,
                fileRef.current.offsetHeight
            ])
        }

        const resize_observer = new ResizeObserver(setSize)
        resize_observer.observe(fileRef.current)
        setSize()

    }

    return <div className="photo2D">
        <div className="title">
            <h2><span>{photo_name}</span> by {author}</h2>
        </div>
        <img ref={fileRef} src={filepath} alt="photo" onLoad={onFileLoad} />
        <br />
        <div className="button-wrapper">
            <CustomButton color='white' text='back to browsing' justText whenClicked={() => navigate("/publicGallery")} />
        </div>
    </div>

}