import { useState } from "react"
import { t_photo_data } from "../../types"
import * as VARS from '../vars.json'

export default function useSearchByAuthor():
    [Array<t_photo_data>, boolean, (author: string) => void] {

    const [loading, setLoading] = useState<boolean>(false)
    const [result, setResult] = useState<Array<t_photo_data>>([])

    const fetchPhotos = (author: string) => {

        setLoading(true)
        const options = { method: "GET" }

        fetch(VARS.API_URL + `/photo/search/author/${author}`, options)
            .then(response => response.json())
            .then(data => setResult(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))

    }

    return [result, loading, fetchPhotos]

}