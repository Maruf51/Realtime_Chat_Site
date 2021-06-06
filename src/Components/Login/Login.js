import React, { useEffect, useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useLocalStorage from '../../LocalStorage/LocalStorage'

const Login = () => {
    const [chatAppLoginData, setChatAppLoginData] = useLocalStorage('chatAppLoginData', [])
    let location = useLocation();
    let history = useHistory();
    let { from } = location.state || { from: { pathname: "/" } };

    const [allUserData, setAllUserData] = useState([])
    useEffect(() => {
        fetch(`https://cryptic-coast-48264.herokuapp.com/get-user`)
        .then(res => res.json())
        .then(data => {
            setAllUserData(data)
        })
    }, [])

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const correctData = allUserData.find(user => user.email === data.email)
        if (correctData == undefined) {
            alert('The email you provided is not registered. Please create an account first!')
        }
        else {
            if (data.password === correctData.password) {
                setChatAppLoginData(correctData);
                history.replace(from);
            }
            else {
                alert('Your password is incorrect. Please try again!')
            }
        }
    };
    return (
        <div className="login_page">
            <div className="login_comment_logo">
                <FontAwesomeIcon icon={faCommentDots} />
            </div>
            <h1 className="login_h1">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="login_form">
                <input type="email" className="login_input" placeholder="Enter your Email*" {...register("email", { required: true })} required/>
                <input type="password" className="login_input" placeholder="Enter your Password*" {...register("password", { required: true })} required/>
                <a className="login_forgot" href="#">Forgot Password</a>
                <button className="login_btn">Login</button>
                <Link to="/register" className="login_create" href="#">Create an account!</Link>
            </form>
        </div>
    );
};

export default Login;