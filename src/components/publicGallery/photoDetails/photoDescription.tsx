import { t_photo_data } from '../../../types'
import './photoDetails.less'

export default function PhotoDetails({ photo, position }: { photo: t_photo_data, position: [number, number] }) {

    if (photo === undefined) return

    return <div className="photo-details"
        style={{ left: position[0] + 'px', top: position[1] + 'px' }}>
        <p>
            <b>author:</b> {photo.author}
            <br />
            <b>title:</b> {photo.name}
        </p>
        <hr />
        <p>click to view details</p>
    </div>

}