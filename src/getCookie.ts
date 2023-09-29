export default function getCookie(cookieName: string): string | undefined {

    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
        const broke_cookie = cookie.trim().split('=')

        if (broke_cookie[0] === cookieName) {
            return broke_cookie[1]
        }
    }
    return undefined

}