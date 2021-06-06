import React, { useEffect, useState } from 'react';
import useLocalStorage from '../../../../../../LocalStorage/LocalStorage';
import './SingleMessage.css';

const SingleMessage = (props) => {
    const [chatAppLoginData, setChatAppLoginData] = useLocalStorage('chatAppLoginData', [])
    const {from, message} = props.data;
    const [me, setMe] = useState(true)
    useEffect(() => {
        if (chatAppLoginData.email === from) {
            setMe(true)
        }
        else {
            setMe(false)
        }

        props.scrollBottom()
    }, [from])

    
    return (
        <div className={`single_message_page ${me === true && 'myself'}`}>
            {
                me === false && <img style={{marginRight: '8px'}} className="single_message_img" src={props.image} alt=""/>
            }
            <h1 className={`single_message ${me === true ? 'its_me' : 'not_me'}`}>{props.data.message}</h1>
            {
                me === true && <img style={{marginLeft: '8px'}} className="single_message_img" src={chatAppLoginData.image} alt=""/>
            }
        </div>
    );
};

export default SingleMessage;