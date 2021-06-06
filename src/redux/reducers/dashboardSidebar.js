const initialValue = {
    dashboardSidebarType: 'messages'
}

const dashboardSidebar = ( state = initialValue, action ) => {
    switch (action.type) {
        case 'CHANGE_TYPE':
            return {
                dashboardSidebarType: action.data
            };
        default:
            return state;
    }
}

export default dashboardSidebar;