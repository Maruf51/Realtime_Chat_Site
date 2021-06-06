import React, { useContext, useEffect, useState } from 'react';
import './MessagesArea.css';
import { connect } from 'react-redux';
import useLocalStorage from '../../../../../LocalStorage/LocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import sendBtn from '../../../../../images/send.png';
import { all_messages } from '../../../../../redux/actions'
import SingleMessage from './SingleMessage/SingleMessage';
import { render } from '@testing-library/react';
import { ActiveUsers, LoginData, RefreshLastMessage } from '../../../../../App';

const MessagesArea = (props) => {
    const [refreshLastMessage, setRefreshLastMessage] = useContext(RefreshLastMessage);
    const [activeUsers, setActiveUsers] = useContext(ActiveUsers)
    const [userDetails, setUserDetails] = useState({})
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [arrivalMessageId, setArrivalMessageId] = useState()
    const [chatAppLoginData, setChatAppLoginData] = useLocalStorage('chatAppLoginData', [])
    const [refreshMessage, setRefreshMessage] = useState()
    const [refreshPage, setRefreshPage] = useState(true)
    const [loginData, setLoginData] = useContext(LoginData)

    // const [wantChangeData, setWantChangeData] = useState([])
    // useEffect(() => {
    //     setWantChangeData(chatAppLoginData.messages)
    // }, [])
    // console.log(wantChangeData)

    useEffect(() => {
        setRefreshMessage(props.gotAllMessages)
    }, [props.gotAllMessages, refreshPage])
    useEffect(() => {
        setRefreshMessage(props.gotAllMessages)
    }, [arrivalMessage, refreshPage])
    const getMessageArray = refreshMessage?.find(message => message.messageID === props.messageListId)

    useEffect(() => {
        if (getMessageArray != undefined) {
            setUserDetails(getMessageArray.emails.find(email => email.email != chatAppLoginData.email))
            setMessages(getMessageArray.messages)
        }
    }, [getMessageArray])

    
    const activeUser = activeUsers.find(user => user.userId === userDetails.userID)

    const updateMessageArray = refreshMessage?.find(message => message.messageID === arrivalMessageId)
    useEffect(() => {
        // if (arrivalMessageId === userDetails.userID) {
            if (updateMessageArray) {
                if (arrivalMessage !== null) {
                    let index = -1;
                    for (let i = 0; i < props.gotAllMessages.length; i++) {
                        index++;
                        if (props.gotAllMessages[i].messageID === arrivalMessageId) {
                            const messageArray = updateMessageArray.messages
                            messageArray.push(arrivalMessage)
                            const allMessages = props.gotAllMessages
                            allMessages[i].messages = messageArray
                            setRefreshPage(!refreshPage)
                            setRefreshLastMessage(!refreshLastMessage)
                            props.dispatch(all_messages(allMessages))
                            render()
                            break;
                        }
                    }
                }
            }
        // }
    }, [arrivalMessage])

    props.socket.current?.on('getMessage', (data) => {
        setArrivalMessageId(data.messageId)
        // let ID = data.sendId
        // if (ID == userDetails.userID) {
            setArrivalMessage(data.message)
        // }
        // else {
        //     setArrivalMessage(null)
        //     console.log('id did not match')
        // }
        let newLoginData = chatAppLoginData;
        let changeConversationsPosition = chatAppLoginData.messages.filter(Data => Data.messageID != data.messageId)
        let messageID = {messageID: data.messageId};
        changeConversationsPosition = [messageID, ...changeConversationsPosition]
        newLoginData.messages = changeConversationsPosition;
        setChatAppLoginData(newLoginData);
        setLoginData(newLoginData);

        const conversationData = {id: chatAppLoginData._id, data: newLoginData.messages}
        fetch(`https://cryptic-coast-48264.herokuapp.com/add-conversation-to-top`,{
            method:'PATCH',
            headers: { 'content-type':'application/json'},
            body:JSON.stringify(conversationData)
        })
        
        render()
      })


    // console.log(props.gotAllMessages)
    // const [data, setData] = useState()
    // useEffect(() => {
    //     let index = -1;
    //     for (let i = 0; i < props.gotAllMessages.length; i++) {
    //         index++;
    //         if (props.gotAllMessages[i].messageID === props.messageListId) {
    //             setData(props.gotAllMessages[i])
    //             break;
    //         }
    //     }
    // })
    // console.log(getMessageArray)
    
    const addMessage = (e) => {
        e.preventDefault()
        const data = {
            from: chatAppLoginData.email,
            message: inputMessage
        }

        props.socket.current.emit('sendMessage', {
            messageId: props.messageListId,
            sendId: chatAppLoginData._id,
            receiverId: userDetails.userID,
            message: data
        })

        // taking the chat head to top
        let newLoginData = chatAppLoginData;
        let changeConversationsPosition = chatAppLoginData.messages.filter(Data => Data.messageID != props.messageListId)
        let messageID = {messageID: props.messageListId};
        changeConversationsPosition = [messageID, ...changeConversationsPosition]
        newLoginData.messages = changeConversationsPosition;
        setChatAppLoginData(newLoginData);
        setLoginData(newLoginData);


        const conversationData = {id: chatAppLoginData._id, data: newLoginData.messages}
        fetch(`https://cryptic-coast-48264.herokuapp.com/add-conversation-to-top`,{
            method:'PATCH',
            headers: { 'content-type':'application/json'},
            body:JSON.stringify(conversationData)
        })




        setRefreshLastMessage(!refreshLastMessage)

        let index = -1;
        for (let i = 0; i < props.gotAllMessages.length; i++) {
            index++;
            if (props.gotAllMessages[i].messageID === props.messageListId) {
                const messageArray = getMessageArray.messages
                messageArray.push(data)
                const allMessages = props.gotAllMessages
                allMessages[i].messages = messageArray
                console.log(allMessages)
                props.dispatch(all_messages(allMessages))
                break;
            }
        }

        fetch(`https://cryptic-coast-48264.herokuapp.com/add-message/id?id=${getMessageArray._id}`,{
            method:'PATCH',
            headers: { 'content-type':'application/json'},
            body:JSON.stringify(data)
        })
        setInputMessage('')
        
//         setTimeout(function(){
//             fetch(`http://localhost:5000/get-messages`)
//             .then(res => res.json())
//             .then(data => {
//                 props.dispatch(all_messages(data))
//                 console.log(data)
//             })
//         }, 500);
    }

    const scrollBottom = () => {
        var element = document.getElementById("ID");
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    }
    return (
        <div className="message_area">
            <div className="message_area_header">
                <div className="message_area_header_left">
                    <img src={userDetails.image} alt=""/>
                    <div className="message_area_header_left_name">
                        <h3>{userDetails.name}</h3>
                        {
                            activeUser ? <p><FontAwesomeIcon className="active_user" icon={faCircle} />Online</p> : <p><FontAwesomeIcon icon={faCircle} />Offline</p>
                        }
                    </div>
                </div>
                <FontAwesomeIcon className='triple_dot' icon={faEllipsisV} />
            </div>
            <div id="ID" className="message_area_messages">
                {
                    messages.map(message => <SingleMessage scrollBottom={scrollBottom} image={userDetails.image} key={message._id} data={message} />)
                }
            </div>
            <form className="message_area_send_message">
                <input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} type="text" placeholder="Write a message*" required/>
                {
                    inputMessage.length === 0 ? <button><img src={sendBtn} alt=""/></button> : <button onClick={(e) => addMessage(e)}><img src={sendBtn} alt=""/></button>
                }
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    messageListId: state.selectedMessage.message,
    gotAllMessages: state.allMessages.messages
})

export default connect(mapStateToProps)(MessagesArea);