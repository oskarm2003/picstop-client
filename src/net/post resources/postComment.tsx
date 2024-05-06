import { useState } from "react"
import getCookie from "../../getCookie"
import * as VARS from '../vars.json'


type t_response = 'error' | 'not signed in' | 'success' | 'authorization failed'
export default function usePostComment(): [boolean, t_response | null, (photo_author: string, photo_name: string, comment: string) => void] {

    const [loading, setLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<t_response | null>(null)

    const postComment = (photo_author: string, photo_name: string, comment: string) => {

        const author = getCookie('username')
        const token = getCookie('token')

        if (author === undefined || token === undefined) {
            setResponse('not signed in')
            return
        }

        setLoading(true)

        const options = {
            method: "POST",
            headers: { "Authorization": "Bearer " + token },
            body: JSON.stringify({
                photo_author: photo_author,
                photo_name: photo_name,
                content: comment
            })
        }

        fetch(VARS.API_URL + '/comment', options)
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

    return [loading, response, postComment]

}