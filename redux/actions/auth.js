import {LOGIN, LOGOUT, SELECT_TYPE, SELECT_ESTAB, ALTER_CALENDAR, SELECTED_HORARIO, LOGIN_ESTAB, SELECTED_HORARIO_INFOS, REFRESH_TILES, SELECT_TYPE_CADASTRO} from './types'

export const Login = (user) => (
    {
        type: LOGIN,
        data: user
    }
)

export const Logout = (nav) => (
    {
        type: LOGOUT,
        data: nav
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

export const SelectHorario = (infoHorario) => (
    {
        type: SELECTED_HORARIO,
        data: infoHorario
    }
)

export const LoginEstab = (estab) => (
    {
        type: LOGIN_ESTAB,
        data: estab
    }
)

export const SelectHorarioInfo = (infos) => (
    {
        type: SELECTED_HORARIO_INFOS,
        data: infos
    }
)

export const RefreshTiles = (nav) => 
(
    {
        type: REFRESH_TILES,
        data: nav
    }
)

export const SelectTypeCadastro = (type) => (
    {
        type: SELECT_TYPE_CADASTRO,
        data: type
    }
)