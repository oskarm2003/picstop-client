import { useState } from "react"
import getCookie from "../../getCookie"
import * as VARS from '../vars.json'

type t_response = 'error' | 'not signed in' | 'success' | 'authorization failed'
export default function usePostTags():
    [t_response | undefined
        , boolean,
        (tags_array: string[], photo_name: string) => void] {

    const [response, setResponse] = useState<t_response | undefined>()
    const [loading, setLoading] = useState(false)

    const postTags = (tags_array: string[], photo_name: string): void => {

        setLoading(true)

        const author = getCookie('username')
        const token = getCookie('token')

        if (author === undefined || token === undefined) {
            setResponse('not signed in')
        }

        const options = {
            method: "POST",
            headers: { "Authorization": "Bearer " + token },
            body: JSON.stringify({
                photo_author: author,
                photo_name: photo_name,
                tag_names: tags_array
            })
        }

        fetch(VARS.API_URL + '/tags', options)
            .then(result => result.text())
            .then(data => {
                setLoading(false)
                if (data === 'success' || data === 'authorization failed') {
                    setResponse(data)
                    return
                }
                throw new Error('unexpected server response')
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
                setResponse('error')
            })

    }

    return [response, loading, postTags]

}