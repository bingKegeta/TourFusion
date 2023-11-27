import React from "react";
import AuthForm from "../components/AuthForm";

function LoginRegister() {
    return (
        <AuthForm isRegister={false}/>
    );
}

export default LoginRegister;