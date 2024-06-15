import { useState, useEffect } from "react"
import * as VARS from '../vars.json'


type t_file_base = { name: string, state: string }

type t_file = (
    t_file_base & {
        state: "pending",
        onfinish: Array<React.Dispatch<React.SetStateAction<string | undefined>>>
    }) |
    (t_file_base & {
        state: "ready",
        file_url: string
    }) |
    (t_file_base & { state: "error" })

const file_memo: Array<t_file> = []

function find_memoized(name: string): t_file | null {

    for (const file of file_memo)
        if (file.name === name)
            return file
    return null

}

function replace_memoized_with(name: string, new_obj: t_file) {

    for (let i = 0; i < file_memo.length; i++)
        if (file_memo[i].name === name)
            file_memo[i] = new_obj

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

    useEffect(() => {

        if (filename === '' || author === '') return

        //check if fetch necessary
        const result = find_memoized(filename + author)

        if (result != null) {
            if (result.state === "ready") {
                setFile(result.file_url)
                return
            }
            else if (result.state === "pending") {
                result.onfinish.push(setFile)
                return
            }
            else if (result.state === "error") {
                setFile(undefined)
                return
            }
        }
        else {
            file_memo.push({
                name: filename + author,
                state: "pending",
                onfinish: [setFile]
            })
        }

        const options = { method: 'GET' }

        fetch(VARS.API_URL + `/photo/file${author ? "/" + author : ""}/${filename}`, options)
            .then(result => {

                if (result.status === 200)
                    return result.blob()

                throw new Error("ERROR when attempting to fetch a file.")
            })
            .then(data => {

                const url = URL.createObjectURL(data)
                const file = find_memoized(filename + author)

                if (file == null || file.state != "pending")
                    throw new Error("file fetched twice")

                // set files
                for (const f of file.onfinish)
                    f(url)

                // memoize the fetched url
                replace_memoized_with(
                    filename + author,
                    { name: filename + author, state: "ready", file_url: url }
                )

            })
            .catch(err => {
                // remember that error occured
                replace_memoized_with(
                    filename + author,
                    { name: filename + author, state: "error" }
                )

                console.error(err)
            })

    }, [filename, author])

    return file

}