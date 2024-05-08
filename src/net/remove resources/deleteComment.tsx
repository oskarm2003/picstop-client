import { useState } from "react"
import getCookie from "../../getCookie"
import * as VARS from '../vars.json'

type t_result = "success" | "unauthorized" | "error" | null
export default function useDeleteComment(): [t_result, (id: number) => void] {

    const [result, setResult] = useState<t_result>(null)

    const deleteComment = (id: number) => {

        const token = getCookie('token')
        if (token === undefined) {
            setResult("unauthorized")
            return
        }

        //prepare data
        const options: { method: string, headers?: HeadersInit, body?: FormData } = {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + token }
        }

        fetch(VARS.API_URL + `/comment/${id}`, options)
            .then(response => {
                if (response.status === 204)
                    setResult("success")
            })
            .catch(err => {
                console.error(err)
                setResult("error")
            })

    }

    return [result, deleteComment]

}