import React, { useContext, useEffect, useState } from 'react';
import './DashboardMessagePeoples.css';
import { connect } from 'react-redux';
import useLocalStorage from '../../../../../../../LocalStorage/LocalStorage';
import { selected_message } from '../../../../../../../redux/actions/index';
import { ActiveUsers, NavBtnToggler, RefreshLastMessage } from '../../../../../../../App';

const DashboardMessagePeoples = (props) => {
    const [navbarToggle, setNavbarToggle] = useContext(NavBtnToggler)
    const [refreshLastMessage, setRefreshLastMessage] = useContext(RefreshLastMessage)
    const [activeUsers, setActiveUsers] = useContext(ActiveUsers)
    const [chatUser, setChatUser] = useState({})
    const [lastMessage, setLastMessage] = useState({})
    const [chatAppLoginData, setChatAppLoginData] = useLocalStorage('chatAppLoginData', [])
    const [findActive, setFindActive] = useState(false)
    const chatMessage = props.all_messages.find(message => message.messageID === props.messageId)

    setTimeout(function(){
        const active = activeUsers.find(user => user.userId === chatUser.userID)
        if (active) {
            setFindActive(true)
        }
        else {
            setFindActive(false)
        }
      }, 10);

    useEffect(() => {
        const active = activeUsers.find(user => user.userId === chatUser.userID)
        if (active) {
            setFindActive(true)
        }
        else {
            setFindActive(false)
        }
    }, [activeUsers])
    
    useEffect(() => {
        if (chatMessage != undefined) {
            const chatEmail = chatMessage.emails.find(email => email.email != chatAppLoginData.email)
            setChatUser(chatEmail)
            setLastMessage(chatMessage.messages[chatMessage.messages.length - 1])
        }
    }, [chatMessage, refreshLastMessage])

    const addMessageId = () => {
        props.dispatch(selected_message(props.messageId))
        setNavbarToggle(true)
    }
    // console.log(chatUser)
    // console.log(props.messageId, props.selectedMessage)
    return (
        <div onClick={addMessageId} className={`dashboard_single_message_people ${props.messageId === props.selected_message && 'active_dashboard_single_message_people'}`}>
            <div className="logo_img_with_active_show">
                <div className={`img_active_show ${findActive === true && 'active_user_bg'}`}></div>
                <img className="message_people_img" src={chatUser.image} alt=""/>
            </div>
            <div className="message_people_h1_p">
                <h1 className="message_people_h1">{chatUser.name}</h1>
                <p className="show_last_message">{lastMessage.message}</p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    all_user: state.allUserData.userData,
    all_messages: state.allMessages.messages,
    selected_message: state.selectedMessage.message
})

export default connect(mapStateToProps)(DashboardMessagePeoples);