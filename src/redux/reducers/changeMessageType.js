const initialValue = {
    messageType: 'message'
}

const message_type = (state = initialValue, action) => {
    switch (action.type) {
        case 'MESSAGE_TYPE' :
            return {
                messageType: action.data
            };

        default :
            return state;
    }
}

export default message_type;