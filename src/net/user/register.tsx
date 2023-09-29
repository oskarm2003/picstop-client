import { useState } from 'react'
import * as VARS from '../vars.json'

type t_response_status_text = 'Conflict' | 'Created' | 'Unprocessable Entity' | 'Error'
export default function useRegister(): [t_response_status_text | undefined, (username: string, email: string, password: string) => void] {

    const [response, setResponse] = useState<undefined | t_response_status_text>()

    const register = (username: string, email: string, password: string) => {

        const options = {
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }

        setResponse(undefined)

        fetch(VARS.API_URL + '/user/new', options)
            .then(async response => {
                if (response.statusText != 'Created' && response.statusText != 'Conflict' && response.statusText != 'Unprocessable Entity') {
                    throw new Error('unexpected server response')
                }
                setResponse(response.statusText)
            })
            .catch(err => {
                console.error(err)
                setResponse('Error')
            })
    }

    return [response, register]

}