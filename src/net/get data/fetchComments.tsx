import { useState } from "react"
import * as VARS from '../vars.json'


type t_comment = { id: number, author: string, content: string }
export default function useFetchComments(): [Array<t_comment>, (photo_name: string, author: string) => void] {

    const [comments, setComments] = useState<Array<t_comment>>([])

    const loadComments = (photo_name: string, author: string) => {

        const options = { method: "GET" }
        fetch(VARS.API_URL + `/comment/${author}/${photo_name}`, options)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(err => console.log(err))

    }

    return [comments, loadComments]

}