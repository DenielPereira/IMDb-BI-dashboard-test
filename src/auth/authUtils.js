export function generateToken(payload) {
    const encodedPayload = btoa(JSON.stringify(payload));
    return encodedPayload;
}

export function setAuthData(token, expiration) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration);
}