import * as VARS from '../vars.json'

/**
 * Logs in the user
 * 
 * @param login - email or username
 * @param password - password
 * @returns status text or token if response code 200
 */
export default function login(login: string, password: string): Promise<'Not Found' | 'Unauthorized' | { token: string }> {

    return new Promise((resolve, reject) => {

        const data: { password: string, email?: string, username?: string } = {
            password: password
        }

        if (login.includes('@')) data.email = login
        else data.username = login

        const options = {
            method: "POST",
            body: JSON.stringify(data)
        }

        fetch(VARS.API_URL + '/user/login', options)
            .then(async response => {
                if (response.statusText === 'OK') {
                    resolve({ token: await response.text() })
                }
                else if (response.statusText === 'Not Found' || response.statusText === 'Unauthorized') {
                    resolve(response.statusText)
                }
            })
            .catch(err => reject(err))
    })
}