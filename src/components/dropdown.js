import React from 'react';
import './dropdown.css';


export const Dropdown = ({options, selectedValue, changed, type}) => {
  
  const label = type === "genre" ? <div>Genre:</div> : <div>Playlist:</div>
  
  // search bar options: genres, playlists 
  const option = options.map((item, i) => {
    return (
      <option key={i} className="option" value={item.id}>{item.name}</option>
    )
  })
  console.log(type)

  return (
    <div> 
      <div className="row">
        {label}
        <select 
            className="dropdown-wrapper"
            value={selectedValue} 
            onChange={(e) => changed(e.target.value)}
        >
          {option}
        </select>
        </div>
    </div>
  )
}