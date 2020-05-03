
export default function AuthHeader(extraHeaders = {}) {
    let headers = new Headers(),
        user = localStorage.user,
        authHeaders = ['email', 'token'];

    for(let header of authHeaders)
        headers.append(header, user[header]);
    headers.append('user_id', user.id);

    for(let header in extraHeaders)
        headers.append(header, extraHeaders[header]);
    return headers;
}
