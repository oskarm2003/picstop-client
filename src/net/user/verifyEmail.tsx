import { useState } from "react"
import * as VARS from '../vars.json'

type t_result = "success" | "error" | "not found"
export default function useVerifyEmail(): [t_result | null, boolean, (email: string) => void] {

    const [result, setResult] = useState<t_result | null>(null)
    const [loading, setLoading] = useState(false)

    const verifyEmail = (email: string) => {

        const options = {
            method: "POST",
            body: JSON.stringify({ email: email })
        }

        setResult(null)
        setLoading(true)

        fetch(VARS.API_URL + "/user/prepare_verification", options)
            .then(response => {
                if (response.status === 204)
                    setResult("success")
                else if (response.status === 404)
                    setResult("not found")
                else
                    throw new Error(response.statusText)
            })
            .catch(err => {
                console.error(err)
                setResult("error")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return [result, loading, verifyEmail]

}