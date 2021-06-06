const CHANGE_SIDEBAR_TODO = 'CHANGE_TYPE';
export const change_sidebar_todo = (data) => {
    return {
        type: CHANGE_SIDEBAR_TODO,
        data: data
    }
};

const CHANGE_MESSAGE_TYPE = 'MESSAGE_TYPE';
export const change_message_type = (data) => {
    return {
        type: CHANGE_MESSAGE_TYPE,
        data: data
    }
}

const ALL_USER_DATA = 'ALL_USER_DATA';
export const all_user_data = (data) => {
    return {
        type: ALL_USER_DATA,
        data: data
    }
}

const ALL_MESSAGES = 'MESSAGES';
export const all_messages = (data) => {
    return {
        type: ALL_MESSAGES,
        data: data
    }
}

const SELECTED_MESSAGE = 'SELECTED_MESSAGE';
export const selected_message = (data) => {
    return {
        type: SELECTED_MESSAGE,
        data: data
    }
}
