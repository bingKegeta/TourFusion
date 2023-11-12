import React from 'react'
import '../styles/DeleteLocationPrompt.css'
import Button from './Button'

const DeleteLocationPrompt = () => {
  return (
    <><div className='backdrop'>
    </div><div className='alert-container'>
        <h2>Delete Location?</h2>
        <p className='main-prompt-text'>Are you sure you want to delete this location?</p>
        <div className='buttons'>
          <Button text='Yes' onClick={() => console.log('Yes Clicked')} />
          <Button text='No' onClick={() => console.log('No Clicked')} />
        </div>
      </div></>
  )
}

export default DeleteLocationPrompt