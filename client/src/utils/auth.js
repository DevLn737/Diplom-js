export const login = (token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('logged', true)
}
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('logged')
}
export const isLogin = () => {
    return localStorage.getItem('logged')
}

export const getToken = () => {
    return localStorage.getItem('token')
}
