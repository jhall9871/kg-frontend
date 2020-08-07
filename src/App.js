import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Playlist from "./Components/Playlist";
import Favorites from "./Components/Favorites";
import AddSong from "./Components/AddSong";
import axios from "axios";
import apiUrl from './apiConfig'
import "./App.css";

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [newSong, setNewSong] = useState({})

  // =========Handle the form to create new tracks===========//
  const handleInputChange = (e) => {
    setNewSong({
      ...newSong,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleAddSong = async (event) => {
    event.preventDefault();
    const makeAddAPICall = async () => {
      try {
        await axios.post(`${apiUrl}/songs`, newSong);
      } catch (err) {
        console.error(err);
      }
    };
    await makeAddAPICall();
    makePlaylistAPICall();
  };

  //==========Set playlist==============//
  const makePlaylistAPICall = async () => {
    try {
      const res = await axios(`${apiUrl}/songs`);
      setPlaylist(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    makePlaylistAPICall();
  }, []);

//===========Toggle favorites=========//
  const handleFaveClick = async (event) => {
    let songId = parseInt(event.target.value);

    const makeFaveApiCall = async () => {
      let song = playlist.find((obj) => obj.id === songId);
      let favValue = !song.isfave;
      try {
        await axios.put(`${apiUrl}/songs/${songId}`, {
          isfave: favValue,
        });
      } catch (err) {
        console.error(err);
      }
    };
    await makeFaveApiCall();
    makePlaylistAPICall();
  };

//===========Delete Song=========//
  const handleDeleteClick = async (event) => {
    let songId = event.target.value;
   const makeDeleteApiCall = async () => {
      try {
        await axios.delete(`${apiUrl}/songs/${songId}`);
      } catch (err) {
        console.error(err);
      }
    }
    await makeDeleteApiCall();
    makePlaylistAPICall();
  }

  return (
    <div className="App">
      <div className="bg-wrapper">
        <Header />
        <Playlist playlist={playlist} handleFaveClick={handleFaveClick} handleDeleteClick={handleDeleteClick} />
      </div>
      <Favorites playlist={playlist} />
      <AddSong
        handleAddSong={handleAddSong}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default App;
