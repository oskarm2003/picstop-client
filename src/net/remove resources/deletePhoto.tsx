import { useState } from "react"
import * as VARS from '../vars.json'
import getCookie from "../../getCookie"

type t_result = "success" | "unauthorized" | "error" | null
export default function useDeletePhoto(): [t_result, (author: string, name: string) => void] {

    const [result, setResult] = useState<t_result>(null)

    const deletePhoto = (author: string, name: string) => {

        //prepare data
        const options: { method: string, headers?: HeadersInit, body?: FormData } = {
            method: "DELETE",
        }

        //check if user logged in
        const token = getCookie('token')
        if (token != undefined) {

            //user logged in - authorize the operation
            options.headers = {
                "Authorization": "Bearer " + token
            }
        }

        fetch(VARS.API_URL + `/photo/${author}/${name}`, options)
            .then(response => {
                if (response.status === 204)
                    setResult("success")
                else if (response.status === 401)
                    setResult("unauthorized")
                else
                    setResult("error")
            })
            .catch(err => console.error(err))

    }

    return [result, deletePhoto]

}