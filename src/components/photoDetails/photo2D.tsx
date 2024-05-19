import { useContext, useRef } from 'react'
import useFetchFile from '../../net/get files/fetchFile'
import './photoDetails.less'
import CustomButton from '../common/customButton/customButton'
import { useNavigate } from 'react-router-dom'
import { photoDataContext } from '../../contexts'

export default function Photo2D({ setLoading }: { setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {

    const photo_data = useContext(photoDataContext)
    if (photo_data === null) return null
    const { author_name, photo_name } = photo_data

    const filepath = useFetchFile(photo_name, author_name)
    const fileRef = useRef<HTMLImageElement>(null)

    const navigate = useNavigate()

    return <div className="photo2D">
        <div className="title">
            <h2><span>{photo_name}</span> by {author_name}</h2>
        </div>
        <img ref={fileRef} src={filepath} alt="photo" onLoad={() => setLoading(false)} />
        <br />
        <div className="button-wrapper">
            <CustomButton color='white' text='back to browsing' justText whenClicked={() => navigate("/gallery")} />
        </div>
    </div>

}