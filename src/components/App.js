import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './App.css';
import { Dropdown } from './dropdown'

const data = [
  {name: 'a'}, {name:'b'}, {name:'c'}
]

const App = () => {
  const [token, setToken] = useState('');

  console.log(token)

  useEffect(() => {
    // Client Credentials Flow
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)
      },
      method: 'POST',
      data: 'grant_type=client_credentials',
      url: 'https://accounts.spotify.com/api/token',
      
    };
    axios(config)
      .then(tokenResponse => {
        console.log(tokenResponse.data.access_token)
        setToken(tokenResponse.data.access_token)

        // second axios request to genre 

      })
      .catch((err) => console.log(err))

  }, [])

  return (
    <form onSubmit={() => {}}>
      <div className="dropdown-container">
        <Dropdown options={data}/>
        <Dropdown options={data}/>
        <button type="submit">Search</button>
      </div>
    </form>
  )
}

export default App;

/*
Use the Spotify api to create an application that lets you discover music. 
It will help you find top songs, trending artists, and explore new genres. 
If you want to get really advanced, how about a music suggestion feature?

******** app mock up *********** 

search bar - genre lists data 

search bar - playlists data

submit button 

clickable list of tracks  

detail section for track: 
-album pic
-song title
-artist

*/
