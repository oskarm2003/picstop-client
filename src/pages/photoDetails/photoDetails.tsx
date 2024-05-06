import './photoDetails.less'

import { useParams } from 'react-router-dom';
import Photo2D from '../../components/photoDetails/photo2D';
import PhotoInfo from '../../components/photoDetails/photoInfo';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


export default function PhotoDetails() {

    const [mouse_color, setMouseColor] = useState<string>("#ffffff7f")

    // const navigate = useNavigate()
    const { author, filename } = useParams()
    if (author == undefined || filename == undefined) return


    return <div className='photo-details-wrapper'>
        <Photo2D author={author} photo_name={filename} setMouseColor={setMouseColor} />
        <PhotoInfo author={author} photo_name={filename} mouse_color={mouse_color} />
    </div>

}