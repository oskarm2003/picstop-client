import { useState } from 'react'
import * as VARS from '../vars.json'

type t_user_data = { id: number, username: string, email: string }
export default function useGetUserData(): [undefined | t_user_data, Error | undefined, (user: string | number) => void] {

    const [response, setResponse] = useState<t_user_data | undefined>()
    const [error, setError] = useState<Error | undefined>()

    const getData = (user: string | number) => {

        const options = {
            method: "GET"
        }

        setResponse(undefined)

        fetch(VARS.API_URL + '/user/data/' + user, options)
            .then(response => response.json())
            .then(data => {
                setResponse({
                    id: data.id,
                    username: data.username,
                    email: data.email
                })
            })
            .catch(err => setError(new Error(err)))

    }

    return [response, error, getData]

}