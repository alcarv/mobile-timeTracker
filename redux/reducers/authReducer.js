import { LOGIN, LOGOUT, SELECT_TYPE, SELECT_ESTAB, ALTER_CALENDAR, SELECTED_HORARIO } from '../actions/types';
import { createCalendarArray } from '../../view/shared/CalendarProcessor';

const initialState = {
    loggedUser: {
        email: '',
        nome: ''
    },
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
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedUser: action.data
            }
        case LOGOUT:
            return {
                ...state,
                loggedUser: {
                    email: '',
                    nome: ''
                }
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
        default:
            return state;
    }
}

export default authReducer;