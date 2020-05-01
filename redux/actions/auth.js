import {LOGIN, LOGOUT} from './types'

export const Login = (user) => (
    {
        type: LOGIN,
        data: user
    }
)

export const Logout = () => (
    {
        type: LOGOUT,
    }
)