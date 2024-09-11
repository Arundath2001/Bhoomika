import React, { useState } from "react";
import './Login.css';
import adminlogo from "../assets/adminlogo.png";
import InputNormal from "./InputNormal";
import ButtonNormal from "./ButtonNormal";
import { useNavigate } from "react-router-dom";

function Login(){

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if(username === 'admin' && password === 'admin'){
            navigate('/dashboard');
        }else{
            alert("Invalid Credentials");
        }
    }

    return(
        <div className="login">
            <div className="login_data">
                <img src={adminlogo} alt="login logo" />

            <div className="login_card">
                <p className="login_head">Admin <span>Login</span></p>

                <div className="login_fields">
                    <InputNormal value={username} onChange={(e) => setUsername(e.target.value)} label="Email" required />
                    <InputNormal value={password} onChange={(e) => setPassword(e.target.value)} label="Password" required />
                </div>

                <ButtonNormal onClick={handleLogin} text="Sign In" btn_color="btn_black" />
            </div>
            </div>
        </div>
    );
}

export default Login;