import React, { useEffect, useState } from 'react';
import './Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Register = () => {
    const [registerSuccess, setRegisterSuccess] = useState(false)

    const [allUserData, setAllUserData] = useState([])
    useEffect(() => {
        fetch(`https://cryptic-coast-48264.herokuapp.com/get-user`)
        .then(res => res.json())
        .then(data => setAllUserData(data))
    }, [])

    const [image, setImage] = useState('')
    useEffect(() => {
        fetch('https://randomuser.me/api/')
        .then((response) => response.json())
        .then(data => setImage(data.results[0].picture.medium))
    }, [])

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const sameEmail = allUserData.find(user => user.email === data.email)

        if (sameEmail == undefined) {
            const newData = data;
            data.image = image;
            fetch('https://cryptic-coast-48264.herokuapp.com/register-user', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newData)
            })
            .then(res => res.json())
            .then(data => {
                if(data.insertedCount){
                    setRegisterSuccess(true)
                }
            })
        }
        else {
            alert('The email you provided is already registered. Please login to proceed!')
        }
    };
    return (
        <div className="register_page">
            <div className="login_comment_logo">
                <FontAwesomeIcon icon={faCommentDots} />
            </div>
            <h1 className="login_h1">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="login_form">
                <input name="name" type="text" className="login_input" placeholder="Enter your Full Name*" {...register("name", { required: true })}/>
                <input name="email" type="email" className="login_input" placeholder="Enter your Email*" {...register("email", { required: true })}/>
                <input name="password" type="password" className="login_input" placeholder="Enter your Password*" {...register("password", { required: true })}/>
                {
                    registerSuccess && <p className="account_create">Account successfully created. Please <br/><Link to="/login">Login</Link> to continue.</p>
                }
                <button type="submit" className="login_btn">Register</button>
                <Link to="/login" className="login_create" href="#">Already have an account!</Link>
            </form>
        </div>
    );
};

export default Register;