import { useState } from 'react'
import * as VARS from '../vars.json'

type t_change_password_response = 'success' | 'error' | 'wrong data format'
export default function useChangePassword(): [t_change_password_response | undefined, boolean, (email: string) => void] {

    const [response, setResponse] = useState<t_change_password_response | undefined>()
    const [loading, setLoading] = useState<boolean>(false)

    const request_password_change = (email: string) => {

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setResponse('wrong data format')
        }

        const options = {
            method: "POST",
            body: JSON.stringify({ email: email })
        }

        setLoading(true)
        setResponse(undefined)

        fetch(VARS.API_URL + '/user/change_password/request', options)
            .then(data => {
                if (data.statusText === 'No Content') {
                    setResponse('success')
                }
                else {
                    throw 'Failed to send the request'
                }
            })
            .catch(err => {
                console.error(err)
                setResponse('error')
            })
            .finally(() => setLoading(false))
    }

    return [response, loading, request_password_change]

}