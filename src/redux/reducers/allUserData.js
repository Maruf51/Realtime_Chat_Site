const initialValue = {
    userData: []
}

const allUserData = ( state = initialValue, action) => {
    switch (action.type) {
        case 'ALL_USER_DATA' :
            return {
                userData: action.data
            }
        
        default : 
            return state
    }
}

export default allUserData;