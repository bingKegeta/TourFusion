"use client"
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState, Component } from "react";

export const Login = (props) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/register");
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/homepage");
    }
    
    return (
        <><h1>GeoTourist</h1><div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button type="submit" className="get-in-btn">Log In</button>
            </form>
            <button className="link-btn" onClick={handleClick}>First time? Register here.</button>
        </div></>
    )
}