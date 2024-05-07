import Reel from "../../components/publicGallery/reel/reel"
import './publicGallery.less'
import UserPanel from "../../components/publicGallery/userPanel/userPanel"
import { t_photo_data } from "../../types"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useDrawUniquePhotos from "../../net/get files/drawUniquePhotos"
import Loading from "../../components/common/loading/loading"
import useSearchByAuthor from "../../net/get files/searchByAuthor"

export default function PublicGallery() {

    const { searched } = useParams()
    const [photos, setPhotos] = useState<Array<t_photo_data>>([])

    const [random_result, random_loading, fetchRandomPhotos] = useDrawUniquePhotos()
    const [author_result, author_loading, searchByAuthor] = useSearchByAuthor()

    useEffect(() => {
        if (searched === undefined)
            fetchRandomPhotos(30)
        else if (searched.startsWith("@"))
            searchByAuthor(searched.slice(1, searched.length))
        else
            fetchRandomPhotos(30)
    }, [searched])

    useEffect(() => {
        if (random_result != "error")
            setPhotos(random_result)
    }, [random_result])

    useEffect(() => {
        setPhotos(author_result)
    }, [author_result])

    const loading = random_loading || author_loading

    return <div className='public-gallery'>
        {
            loading ?
                <div className="loading-wrapper">
                    <Loading color="#cfcfcf" size={1} />
                </div>
                :
                <>
                    <UserPanel />
                    <Reel photos={photos} />
                </>
        }
    </div>

}