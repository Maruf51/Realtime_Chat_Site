import React, { useContext, useState } from 'react';
import './MainDashboardLeft.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faUserFriends, faCog } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { change_message_type, selected_message } from '../../../../../redux/actions';
import MainDashboardLeftMessageArea from './MainDashboardLeftMessageArea/MainDashboardLeftMessageArea';
import { LoginData, NavBtnToggler } from '../../../../../App';

const MainDashboardLeft = (props) => {
    const [loginData, setLoginData] = useContext(LoginData)
    const [searchBoxText, setSearchBoxText] = useState("")
    const [navbarToggle, setNavbarToggle] = useContext(NavBtnToggler)
    const [vanish, setVanish] = useState(false)

    const myConversations = props.all_messages.filter(data => {
        return loginData.messages.find(message => data.messageID === message.messageID)
    })
    const searchedConversations = myConversations.filter(data => {
        if (searchBoxText != "") {
            const userEmailData = data.emails.find(email => email.email != loginData.email)
            return userEmailData.name.toLowerCase().includes(searchBoxText.toLowerCase())
        }
    })
    console.log(searchedConversations)

    const getInputValue = (e) => {
        setVanish(false)
        setSearchBoxText(e.target.value)
    }

    const addMessageId = (data) => {
        // setMessage_id(data.messageID)
        console.log(data)
        props.dispatch(selected_message(data.messageID))
        setNavbarToggle(true)
        setVanish(true)
    }
    return (
        <div className={`main_dashboard_left ${navbarToggle === true && 'height_0_M'}`}>
            <div className="main_dashboard_left_search_box">
                <label htmlFor="search" className="search_btn_label">
                    <FontAwesomeIcon icon={faSearch} />
                </label>
                <input id="search" type="text" className="search_box_input" onChange={(e) => getInputValue(e)} placeholder="Search People or Messages..."/>
                <div id={`${vanish === true && `display_none`}`} className='searched_conversations'>
                    {
                        searchedConversations.map(data => 
                        {
                            const details = data.emails.find(email => email.email != loginData.email)
                            return <div className="searched_single_conversations                    dashboard_single_message_people" onClick={() => addMessageId(data)}>
                                        <img className="searched_image" src={details.image} alt="" />
                                        <div className="nameEmail">
                                            <h1>{details.name}</h1>
                                            <p>{details.email}</p>
                                        </div>
                                    </div>})
                    }
                </div>
            </div>
            <div className="main_dashboard_left_3_type">
                <div onClick={() => props.dispatch(change_message_type('message'))} className={`main_dashboard_left_single_type ${props.messageTypeData === 'message' && 'message_type_active'}`}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div onClick={() => props.dispatch(change_message_type('group'))} className={`main_dashboard_left_single_type ${props.messageTypeData === 'group' && 'message_type_active'}`}>
                    <FontAwesomeIcon icon={faUserFriends} />
                </div>
                <div onClick={() => props.dispatch(change_message_type('setting'))} className={`main_dashboard_left_single_type ${props.messageTypeData === 'setting' && 'message_type_active'}`}>
                    <FontAwesomeIcon icon={faCog} />
                </div>
            </div>
            <MainDashboardLeftMessageArea />
        </div>
    );
};

const mapStateToProps = (state) => ({
    messageTypeData: state.message_type.messageType,
    all_messages:state.allMessages.messages
})

export default connect(mapStateToProps)(MainDashboardLeft);