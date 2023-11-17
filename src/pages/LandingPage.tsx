import React, { useState } from 'react'
import logo from '/TF_logo-removebg.png'
import '../styles/LandingPage.css'
import Button from '../components/Button'
import AuthForm from '../components/AuthForm'

const LandingPage = () => {

  const [showReg, setShowReg] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  const handleLogin = () => {
    setShowPrompt(true)
    setShowReg(false)
  }

  const handleRegister = () => {
    setShowPrompt(true)
    setShowReg(true)
  }

  const handleClose = () => {
    setShowPrompt(false)
  }

  return (
    <div className='body'>
      <div id='container'>
        <header className='main-nav-bar'>
          <Button text='Sign In' onClick={handleLogin} />
          <img src={logo} alt='Icon' onClick={()=> console.log('Logo Clicked')}/>
          <Button text='Register Now' onClick={handleRegister} />
        </header>
        <div className='main'>
          {showPrompt && <AuthForm isRegister={showReg} onClose={handleClose}/>}
        </div>
        <footer className='links-nav-bar'>
            
        </footer>
      </div>
    </div>
  )
}

export default LandingPage