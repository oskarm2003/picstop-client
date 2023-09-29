import Reel from "../../components/publicGallery/reel/reel"
import './publicGallery.less'
import UserPanel from "../../components/publicGallery/userPanel/userPanel"

export default function PublicGallery() {

    // const navigate = useNavigate()

    return <div className='public-gallery'>
        <UserPanel />
        <Reel />
    </div>

}