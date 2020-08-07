import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Playlist from "./Components/Playlist";
import Favorites from "./Components/Favorites";
import AddSong from "./Components/AddSong";
import axios from "axios";

import "./App.css";

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState("");

  // =========Handle the form to create new tracks===========//
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };
  const handleAddSong = (event) => {
    event.preventDefault();
    const makeAddAPICall = async () => {
      try {
        await axios.post(`http://localhost:3000/songs`, {
          title: title,
          artist: artist,
          duration: duration,
          isfave: false,
        });
      } catch (err) {
        console.error(err);
      }
    };
    makeAddAPICall();
    refreshPage();
  };

  //==========Set playlist==============//
  const makePlaylistAPICall = async () => {
    try {
      const res = await axios(`http://localhost:3000/songs`);
      setPlaylist(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const refreshPage = () => {
    window.location.reload(false);
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
        await axios.put(`http://localhost:3000/songs/${songId}`, {
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
        await axios.delete(`http://localhost:3000/songs/${songId}`);
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
        handleTitleChange={handleTitleChange}
        handleArtistChange={handleArtistChange}
        handleDurationChange={handleDurationChange}
      />
    </div>
  );
}

export default App;
