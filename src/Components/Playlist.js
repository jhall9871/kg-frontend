import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faEmptyHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Playlist = ({ playlist, handleFaveClick, handleDeleteClick }) => {
  //order the playlist by id, not by order of edit

  //helper function
  const compare = (a, b) => {
    const idA = a.id;
    const idB = b.id;
    let comparison = 0;
    if (idA > idB) {
      comparison = 1;
    } else if (idB > idA) {
      comparison = -1;
    }
    return comparison;
  }
  //create ordered playlist
  const orderedPlaylist = playlist.sort(compare);

  return (
    <div className="playlist-wrapper">
      <h2 className="sticky-title">Playlist</h2>

      {orderedPlaylist.map((song) => {
        return (
          <div className="song-row" key={song.id}>
            <div className="song-title">{song.title}</div>
            <div className="song-duration">{song.duration}</div>

            <div className="song-artist">{song.artist}</div>
            <div className="song-fave" value={song.id}>
              
              <button value={song.id} onClick={handleFaveClick}>
                {song.isfave ? (
                  <FontAwesomeIcon icon={faHeart} />
                ) : (
                  <FontAwesomeIcon icon={faEmptyHeart} />
                )}
              </button>
              <button value={song.id} onClick={handleDeleteClick}>
                X
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Playlist;
