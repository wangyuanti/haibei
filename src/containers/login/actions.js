import * as ActionTypes from './actionTypes.js';

export const addUserInfo = (userInfo) => {
    return {
        type: ActionTypes.ADD_USER_INFO,
        userInfo: userInfo
    };
};