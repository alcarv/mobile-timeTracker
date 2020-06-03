import { LOGIN, LOGOUT, SELECT_TYPE, SELECT_ESTAB, ALTER_CALENDAR, SELECTED_HORARIO, LOGIN_ESTAB, SELECTED_HORARIO_INFOS, REFRESH_TILES, SELECT_TYPE_CADASTRO } from '../actions/types';
import { createCalendarArray } from '../../view/shared/CalendarProcessor';

const url = require('../../environments')

const initialState = {
    loggedUser: {
        email: '',
        nome: ''
    },
    loggedEstab: {},
    selectedType: {
        nome: '',
        url: ''
    },
    selectedEstab: {},
    calendar:{
        dia: new Date().getDate(),
        mes: new Date().getMonth() + 1
    },
    tiles: [],
    selectedHorario: {
        hora:'',
        data: '' 
    },
    selectedHorarioInfos: {},
    selectedTypeCadastro: 'Estabelecimento'
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedUser: action.data
            }
        case LOGIN_ESTAB:
            return {
                ...state,
                loggedEstab: action.data,
                selectedEstab: action.data,
                calendar:{
                    dia: new Date().getDate(),
                    mes: new Date().getMonth() + 1
                },
                tiles: createCalendarArray(action.data.configuracoes.inicio, action.data.configuracoes.fim, action.data.configuracoes.duracao, action.data.horarios.filter(horario => {
                    return ((new Date(horario.dia).getDate() == new Date().getDate()) && ((new Date(horario.dia).getMonth() + 1) == (new Date().getMonth() + 1)))
                }))
            }
        case LOGOUT:
            action.data.navigate('Login');
            return {
                ...state,
                loggedUser: {},
                loggedEstab: {}
            }
        case SELECT_TYPE:
            return {
                ...state,
                selectedType: action.data
            }
        case SELECT_ESTAB:
            return {
                ...state,
                selectedEstab: action.data,
                calendar:{
                    dia: new Date().getDate(),
                    mes: new Date().getMonth() + 1
                },
                tiles: createCalendarArray(action.data.configuracoes.inicio, action.data.configuracoes.fim, action.data.configuracoes.duracao, action.data.horarios.filter(horario => {
                    return ((new Date(horario.dia).getDate() == new Date().getDate()) && ((new Date(horario.dia).getMonth() + 1) == (new Date().getMonth() + 1)))
                }))
            }
        case ALTER_CALENDAR:
            return {
                ...state,
                calendar: action.data,
                tiles: createCalendarArray(state.selectedEstab.configuracoes.inicio, state.selectedEstab.configuracoes.fim, state.selectedEstab.configuracoes.duracao, state.selectedEstab.horarios.filter(horario => {
                    return ((new Date(horario.dia).getDate() == action.data.dia) && ((new Date(horario.dia).getMonth() + 1) == action.data.mes))
                }))
            }
        case SELECTED_HORARIO:
            return {
                ...state,
                selectedHorario: action.data
            }
        case SELECTED_HORARIO_INFOS:
            return {
                ...state,
                selectedHorarioInfos: action.data
            }
        case REFRESH_TILES:
            return {
                ...state,
                selectedEstab: action.data.estab,
                loggedEstab: action.data.estab,
                calendar:{
                    dia: new Date().getDate(),
                    mes: new Date().getMonth() + 1
                },
                tiles: createCalendarArray(action.data.estab.configuracoes.inicio, action.data.estab.configuracoes.fim, action.data.estab.configuracoes.duracao, action.data.estab.horarios.filter(horario => {
                    return ((new Date(horario.dia).getDate() == new Date().getDate()) && ((new Date(horario.dia).getMonth() + 1) == (new Date().getMonth() + 1)))
                }))
            }
        case SELECT_TYPE_CADASTRO:
            return {
                ...state,
                selectedTypeCadastro: action.data
            }
        default:
            return state;
    }
}

export default authReducer;