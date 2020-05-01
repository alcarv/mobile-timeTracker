import { LOGIN, LOGOUT } from '../actions/types';

const initialState = {
    loggedUser: {
        email: '',
        nome: ''
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
        default:
            return state;
    }
}

export default authReducer;