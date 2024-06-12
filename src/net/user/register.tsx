import { useState } from 'react'
import * as VARS from '../vars.json'

type t_response_status_text = 'Conflict' | 'Created' | 'Unprocessable Entity' | 'Taken' | 'Error'
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
                switch (response.status) {
                    case 201:
                        setResponse("Created")
                        break;
                    case 409:
                        setResponse("Conflict")
                        break;
                    case 418:
                        setResponse("Unprocessable Entity")
                        break;
                    default:
                        throw new Error("REGISTER ERROR: unexpected server response")
                }
            })
            .catch(err => {
                console.error(err)
                setResponse('Error')
            })
    }

    return [response, register]

}