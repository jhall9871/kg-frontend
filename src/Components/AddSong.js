import React from "react";

const AddSong = ({ handleAddSong, handleArtistChange, handleTitleChange, handleDurationChange }) => {
  return (
    <div className="add-song-wrapper">
      <h2>Add Song</h2>
      <form onSubmit={handleAddSong}>
        <label>Title:</label>
        <input type="text" onChange={handleTitleChange}></input>
        <label>Artist:</label>
        <input type="text" onChange={handleArtistChange}></input>
        <label>Duration:</label>
        <input type="text" onChange={handleDurationChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
};

export default AddSong;
