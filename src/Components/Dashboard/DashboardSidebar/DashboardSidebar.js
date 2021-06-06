import React from 'react';
import './DashboardSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faStar } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { change_sidebar_todo } from '../../../redux/actions';

const DashboardSidebar = (props) => {
    const messages = () => {
        props.dispatch(change_sidebar_todo('messages'));
    }
    const starred = () => {
        props.dispatch(change_sidebar_todo('starred'));
    }
    console.log(props.sidebarType)
    return (
        <div className="dashboard_sidebar">
            <div onClick={messages} className={`dashboard_sidebar_logo ${props.sidebarType === 'messages' && 'dashboard_sidebar_logo_active'}`}><FontAwesomeIcon icon={faCommentDots} /></div>
            {/* <div onClick={starred} className={`dashboard_sidebar_logo ${props.sidebarType === 'starred' && 'dashboard_sidebar_logo_active'}`}><FontAwesomeIcon icon={faStar} /></div> */}
        </div>
    );
};

const mapStateToProps = (state) => ({
    sidebarType: state.dashboardSidebar.dashboardSidebarType
})

export default connect(mapStateToProps)(DashboardSidebar);