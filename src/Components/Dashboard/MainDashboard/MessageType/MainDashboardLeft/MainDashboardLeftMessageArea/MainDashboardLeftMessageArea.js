import React, { useContext, useEffect, useState } from 'react';
import './MainDashboardLeftMessageArea.css';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { all_message_people, all_user_data, selected_message } from '../../../../../../redux/actions';
import DashboardMessagePeoples from './DashboardMessagePeoples/DashboardMessagePeoples';
import useLocalStorage from '../../../../../../LocalStorage/LocalStorage';
import { LoginData } from '../../../../../../App';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width : '400px',
      display : 'flex',
      alignItems : 'center',
      justifyContent : 'center',
      flexDirection : 'column',
      position: 'relative'
    }
  };

const MainDashboardLeftMessageArea = (props) => {
    const [chatAppLoginData, setChatAppLoginData] = useLocalStorage('chatAppLoginData', [])
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [loginData, setLoginData] = useContext(LoginData)
    const [emailInput, setEmailInput] = useState('')
    const [messageInput, setInputMessage] = useState('')

    const email_input = (e) => {
        setEmailInput(e.target.value)
    }
    const message_input = (e) => {
        setInputMessage(e.target.value)
    }

    const messageId = {messageID: Math.random()}

    const addPeople = () => {
        if (emailInput && messageInput) {
            const myMessages = props.all_messages_id.filter(user => user.emails.find(email => email.email === chatAppLoginData.email))
            const uniqueUser = myMessages.find(user => user.emails.find(email => email.email === emailInput))
            const user = props.user_data.find(user => user.email === emailInput)
            if ( chatAppLoginData.email === emailInput) {
                alert('You can not message yourself')
            }
            else {
                if (uniqueUser) {
                    alert('The user already exists in your messages list')
                }
                else {
                    if (user) {
                        const selectedUsers = props.user_data.find(user => user.email === emailInput)
                        // console.log(selectedUsers)
                        // if (selectedUsers !== undefined) {
                        //     props.dispatch(all_message_people(selectedUsers))
                        //     setIsOpen(false)
                        // }
            
                        fetch(`https://cryptic-coast-48264.herokuapp.com/user-message-update/id?id=${chatAppLoginData._id}`,{
                                method:'PATCH',
                                headers: { 'content-type':'application/json'},
                                body:JSON.stringify(messageId)
                            })
            
                        fetch(`https://cryptic-coast-48264.herokuapp.com/user-message-update/id?id=${selectedUsers._id}`,{
                            method:'PATCH',
                            headers: { 'content-type':'application/json'},
                            body:JSON.stringify(messageId)
                        })
            
                        const startMessageData = {
                            messageID: messageId.messageID,
                            emails: [
                                {   
                                    userID: chatAppLoginData._id,
                                    name: chatAppLoginData.name,
                                    email: chatAppLoginData.email,
                                    image: chatAppLoginData.image
                                },
                                {
                                    userID: selectedUsers._id,
                                    name: selectedUsers.name,
                                    email: selectedUsers.email,
                                    image: selectedUsers.image
                                }
                            ],
                            messages: [
                                {
                                    from: chatAppLoginData.email,
                                    message: messageInput
                                }
                            ]
            
                        }
                        fetch('https://cryptic-coast-48264.herokuapp.com/start-message', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(startMessageData)
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data.insertedCount){
                                    setIsOpen(false)
                                    fetch(`https://cryptic-coast-48264.herokuapp.com/get-user`)
                                    .then(res => res.json())
                                    .then(data => {
                                        props.dispatch(all_user_data(data))
            
                                        // for changing local storage my detail
                                        const myLoginData = data.find(user => user.email === chatAppLoginData.email);
                                        if (myLoginData != undefined) {
                                            setChatAppLoginData(myLoginData);
                                        }
                                    })
                                }
                            })
                    }
                    else {
                        alert('The email you provided does not have a user.')
                    }
                }
            }
        }
        else {
            alert("Input field can not be empty!")
        }
    }

    useEffect(() => {
        if (chatAppLoginData.messages) {
            props.dispatch(selected_message(chatAppLoginData.messages[0].messageID))
        }
    }, [])
    return (
        <div className="message_people">
            <div className="message_people_all_people">
                {
                    loginData.messages && loginData.messages.map(data => <DashboardMessagePeoples key={data.messageID} messageId={data.messageID} />)
                }
            </div>
            <button onClick={() => setIsOpen(true)} className="message_people_btn">Create a new conversation</button>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h1 className="message_modal_h1">Create a new conversation</h1>
                <input name="email" onChange={(e) => email_input(e)} className="message_modal_input" type="text" placeholder="Add people by email*"  required/>
                <input name="message" onChange={(e) => message_input(e)} className="message_modal_input" type="text" placeholder="Write your first message*"  required/>
                <button onClick={addPeople} className="message_modal_btn">Add people</button>
                <div onClick={() => setIsOpen(false)} className="message_modal_close"><FontAwesomeIcon icon={faTimes} /></div>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user_data: state.allUserData.userData,
    all_messages_id: state.allMessages.messages
})

export default connect(mapStateToProps)(MainDashboardLeftMessageArea);