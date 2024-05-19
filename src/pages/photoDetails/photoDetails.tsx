import './photoDetails.less'

import { useParams } from 'react-router-dom';
import Photo2D from '../../components/photoDetails/photo2D';
import PhotoInfo from '../../components/photoDetails/photoInfo';
import { useState } from 'react';
import Loading from '../../components/common/loading/loading';
import { photoDataContext } from '../../contexts';
// import { useNavigate } from 'react-router-dom';


export default function PhotoDetails() {

    const [loading, setLoading] = useState(true)

    const { author, filename } = useParams()
    if (author == undefined || filename == undefined) return

    return <photoDataContext.Provider value={{ author_name: author, photo_name: filename }}>
        <div className='photo-details-wrapper'>
            {loading ?
                <div className="loading-wrapper">
                    <Loading color="#cfcfcf" size={1} />
                </div> : null
            }
            <Photo2D setLoading={setLoading} />
            <PhotoInfo />
        </div>
    </photoDataContext.Provider>

}