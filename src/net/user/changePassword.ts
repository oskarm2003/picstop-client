import * as VARS from '../vars.json'

export default function changePassword(email: string): Promise<void> {

    return new Promise((resolve, reject) => {

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            reject('given data is not an email')
        }

        const options = {
            method: "POST",
            body: JSON.stringify({ email: email })
        }

        fetch(VARS.API_URL + '/user/change_password/request', options)
            .then(data => {
                if (data.statusText === 'No Content') {
                    resolve()
                }
                else {
                    throw 'Failed to send the request'
                }
            })
            .catch(err => reject(err))
    })

}