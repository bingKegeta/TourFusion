import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import '../styles/AuthForm.css';

type FormProps = {
  isRegister: boolean;
};

const AuthForm = ({ isRegister }: FormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(isRegister);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegisterMode) {
      // Handle registration logic here
      console.log('Registering with email:', email, 'and password:', password);
    } else {
      // Handle login logic here
      console.log('Logging in with email:', email, 'and password:', password);
    }
  };

  return (
    <div className='auth-form-container'>
      <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className='form-container'>
        <div className='inp-container'>
            <Input
                labelText='Email'
                type="email"
                placeholder='example@email.com'
                value={email}
                onChange={setEmail}
            />
        </div>
        <div className='inp-container'>
            <Input
                labelText='Password'
                type='password'
                placeholder='**********'
                value={password}
                onChange={setPassword}
            />

        </div>
        {isRegisterMode && (
          <div className='inp-container'>
            <Input
                labelText='Confirm Password'
                type='password'
                placeholder='**********'
                value={confirmPassword}
                onChange={setConfirmPassword}
            />
          </div>
        )}
        <Button onClick={()=> console.log(email, password)} text={isRegisterMode ? "Create Account": "Login"} type='submit' />
        <div>
      </div>
      </form>
      <button
          onClick={() => setIsRegisterMode(!isRegisterMode)}
          className="toggle-button"
      >
          {isRegisterMode ? 'Already have an account? Click Here!' : 'Don\'t have an account yet? Click Here!'}
      </button>
    </div>
  );
};

export default AuthForm;
