import * as VARS from '../vars.json'
import { useEffect, useState } from "react"

export default function useFetchTags(photo_name: string, author: string) {

    const [tags, setTags] = useState<Array<string>>([])

    useEffect(() => {

        if (photo_name == undefined || author == undefined) return
        const options = { method: "GET" }

        fetch(VARS.API_URL + `/tags/${author}/${photo_name}`, options)
            .then(result => result.json())
            .then(data => setTags(data))
            .catch(err => console.log(err))

    }, [])

    return tags

}