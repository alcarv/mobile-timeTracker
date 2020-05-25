import {LOGIN, LOGOUT, SELECT_TYPE, SELECT_ESTAB, ALTER_CALENDAR} from './types'

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

export const SelectType = (selectedType) => (
    {
        type: SELECT_TYPE,
        data: selectedType
    }
)

export const SelectEstab = (estab) => (
    {
        type: SELECT_ESTAB,
        data: estab
    }
)

export const Altercalendar = (calendar) => (
    {
        type: ALTER_CALENDAR,
        data: calendar
    }
)