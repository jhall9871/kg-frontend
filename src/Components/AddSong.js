import React from "react";

const AddSong = ({ handleAddSong, handleArtistChange, handleTitleChange, handleDurationChange, handleInputChange }) => {
  return (
    <div className="add-song-wrapper">
      <h2>Add Song</h2>
      <form onSubmit={handleAddSong}>
        <label>Title:</label>
        <input type="text" name="title" onChange={handleInputChange}></input>
        <label>Artist:</label>
        <input type="text" name="artist" onChange={handleInputChange}></input>
        <label>Duration:</label>
        <input type="text" name="duration" onChange={handleInputChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
};

export default AddSong;
