import React from 'react';
import '../styles/Input.css'

type InputProps = {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  // You can add more attributes or props as needed
};

const Input = ({ placeholder, type = 'text', value, onChange }: InputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className='input-container'>
        <input
          className='input'
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
    </div>
  );
};

export default Input;
