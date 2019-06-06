import {ADD_USER_INFO} from './actionTypes.js';


export default (state = {}, action) => {
    switch(action.type) {
        case ADD_USER_INFO:
            return {...state, ...action.userInfo};
        default:
            return state
    }
}