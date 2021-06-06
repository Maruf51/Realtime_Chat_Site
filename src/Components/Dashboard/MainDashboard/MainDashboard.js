import React from 'react';
import './MainDashboard.css';
import { connect } from 'react-redux';
import MessageType from './MessageType/MessageType';

const MainDashboard = (props) => {
    return (
        <>
            {
                props.dashboardSidebarType === 'messages' && <MessageType socket={props.socket} />
            }
        </>
    );
};

const mapStateToProps = (state) => ({
    dashboardSidebarType: state.dashboardSidebar.dashboardSidebarType
})

export default connect(mapStateToProps)(MainDashboard);