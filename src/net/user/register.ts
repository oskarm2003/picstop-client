import * as VARS from '../vars.json'

type t_response_status_text = 'Conflict' | 'Created' | 'Unprocessable Entity'
export default function register(username: string, email: string, password: string): Promise<t_response_status_text> {

    return new Promise((resolve, reject) => {

        const options = {
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }

        fetch(VARS.API_URL + '/user/new', options)
            .then(async response => {
                if (response.statusText != 'Created' && response.statusText != 'Conflict' && response.statusText != 'Unprocessable Entity') {
                    throw new Error('unexpected server response')
                }
                resolve(response.statusText)
            })
            .catch(err => {
                reject(err)
            })
    })

}