import { LOGIN, LOGOUT, SELECT_TYPE, SELECT_ESTAB } from '../actions/types';

const initialState = {
    loggedUser: {
        email: '',
        nome: ''
    },
    selectedType: {
        nome: '',
        url: ''
    },
    selectedEstab: {}
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
                selectedEstab: action.data
            }
        default:
            return state;
    }
}

export default authReducer;