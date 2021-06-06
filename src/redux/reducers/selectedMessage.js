const initialValue = {
    message: []
}
const selectedMessage = ( state = initialValue, action) => {
    switch (action.type) {
        case 'SELECTED_MESSAGE' :
            return {
                message: action.data
            }
        
        default: 
            return state
    }
}

export default selectedMessage;