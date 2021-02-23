import React, { useState } from 'react';
import './dropdown.css';


export const Dropdown = ({options}) => {
  const [selectedValue, setSelectedValue] = useState('');

  
  const option = options.map((item, i) => {
    return (
      <option key={i} value={item.name}>{item.name}</option>
    )
  })

  return (
    <div>
      <select 
          value={selectedValue} 
          onChange={(e) => setSelectedValue(e.target.value)}
      >
        {option}
      </select>
    </div>
  )
}