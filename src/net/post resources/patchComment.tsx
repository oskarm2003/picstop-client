import { useState } from "react"
import getCookie from "../../getCookie"
import * as VARS from '../vars.json'

type t_result = "success" | "unauthorized" | "not found" | "error"
export default function usePatchComment(): [t_result | null, boolean, (comment_id: number, content: string) => void] {

    const [result, setResult] = useState<t_result | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const patchComment = (comment_id: number, content: string) => {

        const token = getCookie("token")
        if (token === undefined) {
            setResult("unauthorized")
            return
        }

        setLoading(true)
        setResult(null)

        const options = {
            method: "PATCH",
            headers: { "Authorization": "Bearer " + token },
            body: JSON.stringify({
                comment_id: comment_id,
                content: content
            })
        }

        fetch(VARS.API_URL + "/comment", options)
            .then(response => {
                if (response.status === 204) setResult("success")
                else if (response.status === 401) setResult("unauthorized")
                else if (response.status === 404) setResult("not found")
                else if (response.status === 422 || response.status === 400) throw new Error("server responsed with an error on comment PATCH")
            })
            .catch(err => {
                console.error(err)
                setResult("error")
            })
            .finally(() => setLoading(false))
    }

    return [result, loading, patchComment]

}