import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './App.css';
import { Dropdown } from './dropdown'
import { TrackList } from './tracklist';


const App = () => {
  const [token, setToken] = useState('');
  const [genres, setGenres] = useState({selectredGenre: '', listOfGenresFromAPI: []});
  const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []})
  const [trackList, setTrackList] = useState([]);

  console.log(trackList)

  useEffect(() => {
    // First API Call: for auth token, "Client Credentials Flow"
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
        setToken(tokenResponse.data.access_token)

        // Second API Call, request to genre 
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + tokenResponse.data.access_token
          },
          method: 'GET',
          url: 'https://api.spotify.com/v1/browse/categories?locale=sv_US'
        }
        
        axios(config)
        .then(genreResponse => {
          setGenres({
            selectredGenre: genres.selectredGenre,
            listOfGenresFromAPI: genreResponse.data.categories.items
          })
        })
      })
      .catch((err) => console.log(err))

  }, [genres.selectredGenre]);

  // Third API Call, request playlists for Second search bar
  // Select genre in first search bar
  const genreChanged = val => {
    setGenres({
      selectedValue: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    })
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'GET',
      url: `https://api.spotify.com/v1/browse/categories/${val}/playlists`
    }
    axios(config)
    .then(playlistResponse => {
      console.log(playlistResponse)
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items
      })
    })
  }
    
  // Select playlist in second search bar 
  const playlistChanged = val => {
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicked', playlist.selectedPlaylist)

    // Fourth API Call, gets songs/tracks from selected/submitted playlist 
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'GET',
      url: `https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?market=US`
    }
    axios(config)
      .then((res) => {
        setTrackList(res.data.items)
      })

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="dropdown-container">
        <Dropdown options={genres.listOfGenresFromAPI} selectedValue={genres.selectedValue} changed={genreChanged} />
        <Dropdown options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedValue} changed={playlistChanged} />
        <button type="submit" disabled={playlist.selectedPlaylist === ''}>Search</button>
        <TrackList trackList={trackList} />
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

search bar - playlist data

submit button 

clickable list of tracks  

detail section for track: 
-album pic
-song title
-artist

*/
