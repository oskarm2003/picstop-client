import { useState, useEffect } from "react"
import * as VARS from '../vars.json'

//memorize the fetched files
const fetched_files: Array<{ name: string, file_url: string }> = []

/**
 * Checks if required fetch already occured and if so returns the result
 * 
 * @param name - combined photo's author and name (author + name)
 */
const searchFetched = (name: string): false | string => {

    for (let el of fetched_files) {
        if (el.name === name) return el.file_url
    }
    return false

}

/**
 * Fetches the image from the server and returns it's url
 * 
 * @param filename - the name of the desired file
 * @param author - author of the desired file
 * @returns file url to use in img src
 */
export default function useFetchFile(filename: string, author: string): string | undefined {

    const [file, setFile] = useState<string>()

    let author_arg = ''
    if (author) author_arg = '/' + author

    useEffect(() => {

        if (filename === '' || author === '') return

        //check if fetch necessary
        const result = searchFetched(author + filename)

        if (result) {
            setFile(result)
            return
        }

        const options = { method: 'GET' }

        fetch(VARS.API_URL + `/photo/file${author_arg}/${filename}`, options)
            .then(result => result.blob())
            .then(data => {
                const url = URL.createObjectURL(data)
                if (!searchFetched(author + filename)) {
                    fetched_files.push({ name: author + filename, file_url: url })
                }
                setFile(url)
            })
            .catch(err => console.log(err))
    }, [filename, author])

    return file

}