import React, { useContext, useState } from 'react';
import './MessageType.css';
import MainDashboardLeft from './MainDashboardLeft/MainDashboardLeft';
import useLocalStorage from '../../../../LocalStorage/LocalStorage';
import MessagesArea from './MessagesArea/MessagesArea';
import { NavBtnToggler } from '../../../../App';

const MessageType = (props) => {
    const [chatAppLoginData, setChatAppLoginData] = useLocalStorage('chatAppLoginData', [])
    const [navbarToggle, setNavbarToggle] = useContext(NavBtnToggler)
    // console.log(props.messageListId, props.gotAllMessages)
    const navHandleToggler = () => {
        setNavbarToggle(!navbarToggle)
    }
    return (
        <div className="message_type">
            <div className="message_type_top_detail inactive_M">
                <h1 className="message_type_h1">Messages</h1>
                <img className="message_type_avatar" src={chatAppLoginData.image} alt=""/>
            </div>
            <div className="message_type_top_detail_M active_flex_M">
                <div className="my_detail">
                    <img className="message_type_avatar" src={chatAppLoginData.image} alt=""/>
                    <h1>{chatAppLoginData.name}</h1>
                </div>
                <div id="nav_handle" className="nav_handle" onClick={navHandleToggler}>
                    <div id="nav_handle_1" className={`nav_handle_1 nav_handle_bar ${navbarToggle === false && 'nav_handle_1_style'}`}></div>
                    <div id="nav_handle_2" className={`nav_handle_2 nav_handle_bar ${navbarToggle === false && 'nav_handle_2_style'}`}></div>
                    <div id="nav_handle_3" className={`nav_handle_3 nav_handle_bar ${navbarToggle === false && 'nav_handle_3_style'}`}></div>
                </div>
            </div>
            <div className="message_full_container">
                <MainDashboardLeft />
                <MessagesArea socket={props.socket} />
            </div>
        </div>
    );
};

export default MessageType;