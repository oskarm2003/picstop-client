import { useState } from "react"
import getCookie from "../../getCookie"
import * as VARS from '../vars.json'

type t_response = "success" | "unauthorized" | "not found" | "error"
export default function useDeleteUser(): [t_response | null, boolean, (username: string) => void] {

    const [result, setResult] = useState<t_response | null>(null)
    const [loading, setLoading] = useState(false)

    const deleteUser = (username: string) => {

        const token = getCookie("token")
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        }

        setLoading(true)
        fetch(VARS.API_URL + "/user/" + username, options)
            .then(response => {
                if (response.status === 204)
                    setResult("success")
                else if (response.status === 401)
                    setResult("unauthorized")
                else if (response.status === 404)
                    setResult("not found")
                else if (response.status === 400)
                    throw new Error(response.statusText);
            })
            .catch(err => {
                console.error(err)
                setResult("error")
            })
            .finally(() => setLoading(false))

    }

    return [result, loading, deleteUser]

}