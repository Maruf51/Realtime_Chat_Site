const initialValue = {
    messages: []
}

const allMessages = ( state = initialValue, action) => {
    switch (action.type) {
        case 'MESSAGES' :
            return {
                messages: action.data
            }

        default :
            return state
    }
}

export default allMessages;