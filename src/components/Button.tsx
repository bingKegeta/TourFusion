import React from 'react'
import '../styles/Button.css'

interface ButtonProps {
    text: String,
    size ?: 'S' | 'M' | 'L',
    onClick: () => void
}

const Button = ({text, size, onClick}: ButtonProps) => {
  return (
    <div className='btn-container'>
        <button 
        // add size here
        className='btn'
        onClick={onClick}>
        {text}
        </button>
    </div>
  )
}

export default Button