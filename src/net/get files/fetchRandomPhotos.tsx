import { useState } from "react"
import * as VARS from '../vars.json'
import { t_photo_data } from "../../types"

/**
 * Fetch random photo descriptors from the server
 * 
 * @param cuantity - how many descriptors to fetch
 */
export default function useFetchRandomPhotos():
    [Array<t_photo_data>, boolean, (cuantity: number) => void] {

    const [photos, setPhotos] = useState<Array<t_photo_data>>([])
    const [loading, setLoading] = useState(false)

    const fetchPhotos = (cuantity: number) => {

        setLoading(true)
        const options = { method: "GET" }
        fetch(VARS.API_URL + '/photo/descriptor/random/' + cuantity, options)
            .then(result => result.json())
            .then(data => {
                if (!Array.isArray(data)) throw new Error('wrong response format')
                const output: Array<t_photo_data> = new Array()
                for (let row of data) {
                    output.push(
                        {
                            id: row.id,
                            name: row.name,
                            album: row.album,
                            author: row.author,
                            timestamp: row.timestamp
                        }
                    )
                }
                setPhotos(output)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }

    return [photos, loading, fetchPhotos]

}