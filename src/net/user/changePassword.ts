import { useState } from 'react'
import * as VARS from '../vars.json'

type t_change_password_response = 'Success' | 'Error'
export default function useChangePassword(): [t_change_password_response | undefined, Error | undefined, (email: string) => void] {

    const [response, setResponse] = useState<t_change_password_response | undefined>()
    const [error, setError] = useState<undefined | Error>()

    const request_password_change = (email: string) => {

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setError(new Error('given data is not an email'))
        }

        const options = {
            method: "POST",
            body: JSON.stringify({ email: email })
        }

        setResponse(undefined)

        fetch(VARS.API_URL + '/user/change_password/request', options)
            .then(data => {
                if (data.statusText === 'No Content') {
                    setResponse('Success')
                }
                else {
                    throw 'Failed to send the request'
                }
            })
            .catch(err => {
                setResponse('Error')
                setError(new Error(err))
            })
    }

    return [response, error, request_password_change]

}