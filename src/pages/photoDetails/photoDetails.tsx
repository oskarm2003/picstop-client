import './photoDetails.less'

import { useParams } from 'react-router-dom';
import Photo2D from '../../components/photoDetails/photo2D';
import PhotoInfo from '../../components/photoDetails/photoInfo';
import { useState } from 'react';
import Loading from '../../components/common/loading/loading';
// import { useNavigate } from 'react-router-dom';


export default function PhotoDetails() {

    const [mouse_color, setMouseColor] = useState<string>("#ffffff7f")
    const [photo_dimensions, setDimensions] = useState<[number, number]>([0, 0])

    // const navigate = useNavigate()
    const { author, filename } = useParams()
    if (author == undefined || filename == undefined) return

    console.log(photo_dimensions);

    return <div className='photo-details-wrapper'>
        {photo_dimensions[0] === 0 ?
            <div className="loading-wrapper">
                <Loading color="#cfcfcf" size={1} />
            </div>
            : null}
        <Photo2D setDimensions={setDimensions} author={author} photo_name={filename} setMouseColor={setMouseColor} />
        <PhotoInfo dimensions={photo_dimensions} author={author} photo_name={filename} mouse_color={mouse_color} />
    </div>

}