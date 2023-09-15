import { useState, useEffect } from "react"
import * as VARS from '../vars.json'

export default function useFetchReadyFiles(author: string) {

    const [files, setFiles] = useState<Array<any>>()

    useEffect(() => {

        const options = { method: "GET" }

        fetch(VARS.API_URL + `/photo/descriptor/${author}`, options)
            .then(result => result.json())
            .then(async data => {

                const files_arr = new Array()
                for (let el of data) {
                    console.log(el);

                    const response = await fetch(VARS.API_URL + `/photo/file/${author}/${el.name}`, options)
                    if (response.ok) {

                        const response_data = await response.blob()
                        const url = URL.createObjectURL(response_data)
                        files_arr.push(url)
                    }
                    else {
                        console.log('invalid fetch output');
                    }
                }
                setFiles(files_arr)
            })
            .catch(err => console.log(err))
    }, [])

    return files

}