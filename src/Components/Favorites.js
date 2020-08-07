import React from "react";

const Favorites = ({ playlist }) => {
let favorites = playlist.filter(item => {
    return item.isfave === true
});
// console.log(favorites)

  return (
    <div className="favorites-wrapper">
          <h2 className="sticky-title">Favorite Songs</h2>
          <ul>
          {favorites.map(item => {
              return (
                  <li key={item.id}>{item.title} / {item.artist} / {item.duration}</li>
          )
          })}
              </ul>
    </div>
  );
};

export default Favorites;
