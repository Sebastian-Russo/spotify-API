import React from 'react';
import './dropdown.css';


export const Dropdown = ({options, selectedValue, changed}) => {
  
  console.log(options)
  const option = options.map((item, i) => {
    return (
      <option key={i} value={item.id}>{item.name}</option>
    )
  })

  return (
    <div>
      <select 
          value={selectedValue} 
          onChange={(e) => changed(e.target.value)}
      >
        {option}
      </select>
    </div>
  )
}