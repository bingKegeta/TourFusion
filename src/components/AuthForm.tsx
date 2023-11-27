import React, { useState } from "react";
import { useNavigate, Navigator, BrowserRouter } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import "../styles/AuthForm.css";
import useMutation from "../common/useMutation";
import { LOGIN, REGISTER } from "../common/mutations";
import HomePage from "../pages/HomePage";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import { makeButtonAuthenticateOrRegisterUser } from "../common/2FA"
import config from "../config";

type FormProps = {
  isRegister: boolean;
  onClose: () => void;
};

function AuthForm({ isRegister, onClose }: FormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(isRegister);

  const navigate = useNavigate();

  //! This isn't being recognized in the .env for some reason
  const endpoint = config.API_URL + "/api";

  const { executeMutation, loading, error } = useMutation(endpoint);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegisterMode) {
      // Handle registration logic here
      //? Add email, password validation maybe here?
      const variables = {
        email: email,
        username: username,
        password: password,
      };

      try {
        const response = await executeMutation(REGISTER, variables);

        // if code reaches here, login was successful
        const user_id = response.addUser;
        console.log(user_id);

        const res = await makeButtonAuthenticateOrRegisterUser(isRegister, user_id);
        console.log(res)
        if (!res) {
          throw error;
        }

        // create the cookie and set it to expire in an hour
        document.cookie = `session_token=${user_id}; path=/; expires=${
          new Date().getTime() + 3600 * 1000
        }`;

        navigate("/dashboard");
      } catch (err) {
        console.error("Error registering user:", err);
      }
    } else {
      // Handle login logic here
      // console.log("Logging in with email:", email, "and password:", password);
      const variables = {
        emailorusername: email,
        password: password,
      };

      try {
        const response = await executeMutation(LOGIN, variables);

        // if code reaches here, login was successful
        const user_id = response.login;
        console.log(user_id);

        const res = await makeButtonAuthenticateOrRegisterUser(isRegister, user_id);
        console.log(res)
        if (!res) {
          throw error;
        }

        // create the cookie and set it to expire in an hour
        document.cookie = `session_token=${user_id}; path=/; expires=${
          new Date().getTime() + 3600 * 1000
        }`;

        // go to the dashboard
        navigate("/dashboard");
      } catch (err) {
        console.error("Error logging in user:", err);
      }
    }
  };

  return (
    <>
      <div className="auth-form-container">
        <button onClick={onClose} className="close-btn">
          &times;
        </button>
        <h2>{isRegisterMode ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="inp-container">
            {isRegisterMode && (
              <Input
                labelText="Username"
                type="username"
                placeholder="username"
                value={username}
                onChange={setUsername}
              />
            )}
            <Input
              labelText={isRegisterMode ? "Email" : "Email or Username"}
              type={isRegisterMode ? "email" : "username"}
              placeholder="example@email.com"
              value={email}
              onChange={setEmail}
            />
          </div>
          <div className="inp-container">
            <Input
              labelText="Password"
              type="password"
              placeholder="**********"
              value={password}
              onChange={setPassword}
            />
          </div>
          {isRegisterMode && (
            <div className="inp-container">
              <Input
                labelText="Confirm Password"
                type="password"
                placeholder="**********"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </div>
          )}
          <Button
            onClick={() => console.log(email)}
            text={isRegisterMode ? "Create Account" : "Login"}
            type="submit"
          />
          <div></div>
        </form>
        <button
          onClick={() =>
            setIsRegisterMode((prevIsRegisterMode) => !prevIsRegisterMode)
          }
          className="toggle-button"
        >
          {isRegisterMode
            ? "Already have an account? Click Here!"
            : "Don't have an account yet? Click Here!"}
        </button>
        {loading && <LoadingPage />}
        {error && <ErrorPage message={error.message} />}
      </div>
    </>
  );
}

export default AuthForm;
