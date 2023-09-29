import { useState } from 'react'
import * as VARS from '../vars.json'

/**
 * Logs in the user
 * 
 * @param login - email or username
 * @param password - password
 * @returns status text or token if response code 200
 */
type t_login_result = 'Not Found' | 'Unauthorized' | 'Error' | { token: string }
export default function useLogin(): [undefined | t_login_result, (login: string, password: string) => void] {

    const [response, setResponse] = useState<undefined | t_login_result>()

    //authentication function
    const authenticate = (login: string, password: string) => {

        //prepare the data
        const data: { password: string, email?: string, username?: string } = {
            password: password
        }

        if (login.includes('@')) data.email = login
        else data.username = login

        const options = {
            method: "POST",
            body: JSON.stringify(data)
        }

        setResponse(undefined)

        //make the request
        fetch(VARS.API_URL + '/user/login', options)
            .then(async response => {
                if (response.statusText === 'OK') {
                    setResponse({ token: await response.text() })
                }
                else if (response.statusText === 'Not Found' || response.statusText === 'Unauthorized') {
                    setResponse(response.statusText)
                }
            })
            .catch(err => {
                console.error(err)
                setResponse('Error')
            })
    }

    return [response, authenticate]

}