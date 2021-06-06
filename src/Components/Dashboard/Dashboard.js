import React, { useContext, useEffect, useRef, useState } from 'react';
import './Dashboard.css';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';
import MainDashboard from './MainDashboard/MainDashboard';
import { connect } from 'react-redux';
import { all_messages, all_user_data } from '../../redux/actions';
import useLocalStorage from '../../LocalStorage/LocalStorage';
import io from 'socket.io-client';
import { ActiveUsers, LoginData } from '../../App';

const Dashboard = (props) => {
  const [activeUsers, setActiveUsers] = useContext(ActiveUsers)
  const [loginData, setLoginData] = useContext(LoginData)
    const [chatAppLoginData, setChatAppLoginData] = useLocalStorage('chatAppLoginData', [])
    const [arrivalMessage, setArrivalMessage] = useState([])
    const [messageId, setMessageId] = useState()
    const getMessageArray = props.message_data.find(message => message.messageID === messageId)

    const socket = useRef()

    useEffect(() => {
      socket.current = io("ws://localhost:5000")
      socket.current.on('getMessage', (data) => {
        // setArrivalMessage(data.message)
        setMessageId(data.messageId)
      })
    }, [])
    // console.log(arrivalMessage)

    // useEffect(() => {
    //   let index = -1;
    //   for (let i = 0; i < props.message_data.length; i++) {
    //       index++;
    //       if (props.message_data[i].messageID === messageId) {
    //           const messageArray = getMessageArray.messages
    //           messageArray.push(arrivalMessage)
    //           const allMessages = props.message_data
    //           allMessages[i].messages = messageArray
    //           // console.log(allMessages)
    //           props.dispatch(all_messages(allMessages))
    //           break;
    //       }
    //   }
    // }, [arrivalMessage, messageId])
    
    useEffect(() => {
      socket.current.emit('addUser', chatAppLoginData._id)
      socket.current.on('getSocketUsers', socketUsers => {
        setActiveUsers(socketUsers)
      })
    }, [socket])

    const [allUserData, setAllUserData] = useState([])
      useEffect(() => {
          fetch(`https://cryptic-coast-48264.herokuapp.com/get-user`)
          .then(res => res.json())
          .then(data => {
            setAllUserData(data)
            props.dispatch(all_user_data(data))

            // for changing local storage my detail
            const myLoginData = data.find(user => user.email === chatAppLoginData.email);
            if (myLoginData != undefined) {
              setChatAppLoginData(myLoginData);
              setLoginData(myLoginData);
            }
          })
          
          fetch(`https://cryptic-coast-48264.herokuapp.com/get-messages`)
          .then(res => res.json())
          .then(data => {
            props.dispatch(all_messages(data))
          })
      }, [])

      // setInterval(function(){
      //   fetch(`http://localhost:5000/get-messages`)
      //     .then(res => res.json())
      //     .then(data => {
      //       props.dispatch(all_messages(data))
      //     })
      // }, 1000);

    
      // console.log(props.message_data)
    return (
        <div className="dashboard">
            <DashboardSidebar />
            <MainDashboard socket={socket} />
        </div>
    );
};

const mapStateToProps = (state) => ({
  message_data: state.allMessages.messages
})

export default connect(mapStateToProps)(Dashboard);