import { useState } from 'react'
import getCookie from '../../getCookie'
import * as VARS from '../vars.json'

type t_response = 'success' | 'name already in use' | 'forbidden name' | 'error'
export default function usePostPhoto(): [t_response | undefined, (name: string, file: File) => void] {

    const [result, setResult] = useState<t_response | undefined>()

    const send = (name: string, file: File) => {

        //prepare data
        const options: { method: string, headers?: HeadersInit, body?: FormData } = {
            method: "POST",
        }

        //check if user logged in
        const token = getCookie('token')
        if (token != undefined) {

            //user logged in - authorize the operation
            options.headers = {
                "Authorization": "Bearer " + token
            }
        }

        const data = new FormData()
        data.append('name', name)
        data.append('file', file)

        options.body = data

        setResult(undefined)

        fetch(VARS.API_URL + '/photo', options)
            .then(response => response.text())
            .then(data => {
                if (data === 'success' || data === 'name already in use' || data === 'forbidden name') {
                    setResult(data)
                    return
                }
                throw 'unexpected output'
            })
            .catch(err => {
                console.log(err);
                setResult('error')
            })
    }

    return [result, send]

}