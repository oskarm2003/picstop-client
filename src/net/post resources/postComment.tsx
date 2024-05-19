import { useState } from "react"
import getCookie from "../../getCookie"
import * as VARS from '../vars.json'


type t_response = 'error' | 'not signed in' | 'success' | 'authorization failed' | 'conflict' | 'not found'
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
        setResponse(null)

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
            .then(result => {
                if (result.status == 409)
                    setResponse("conflict")
                else if (result.status === 201)
                    setResponse("success")
                else if (result.status === 401)
                    setResponse("authorization failed")
                else if (result.status === 404)
                    setResponse("not found")
                else
                    throw new Error('unexpected server response')
            })
            .catch(err => {
                console.error(err)
                setResponse('error')
            })
            .finally(() => setLoading(false))

    }

    return [loading, response, postComment]

}