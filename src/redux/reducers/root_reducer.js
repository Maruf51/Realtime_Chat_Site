import { combineReducers } from 'redux';
import dashboardSidebar from './dashboardSidebar';
import message_type from './changeMessageType';
import allUserData from './allUserData';
import allMessages from './allMessages';
import selectedMessage from './selectedMessage'

const rootReducer = combineReducers ({
    dashboardSidebar,
    message_type,
    allUserData,
    allMessages,
    selectedMessage
});

export default rootReducer;