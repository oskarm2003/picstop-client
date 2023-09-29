import { useEffect, useState } from "react";
import * as VARS from '../vars.json'

type t_output = { name: string, author: string, id: number, timestamp: number }
export default function useFetchFilenames(author: string): void | t_output[] {

    const [randomFilenames, setRandomFilenames] = useState()

    useEffect(() => {

        const options = { method: "GET" }

        fetch(VARS.API_URL + `/photo/descriptor/${author}`, options)
            .then(result => result.json())
            .then(data => setRandomFilenames(data))
            .catch(err => console.log(err))

    }, [])

    return randomFilenames

} 