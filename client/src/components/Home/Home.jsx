import React, { useState, useEffect } from 'react';
import UserDetails from '../UserProfile/UserDetails/UserDetails';
import UserTopArtists from '../UserProfile/UserTopArtists/UserTopArtists';
import UserTopSongs from '../UserProfile/UserTopSongs/UserTopSongs';
import { getCurrentlyPlayingSong } from '../../utils/spotify';
import './Home.style.css';

const Home = () => {
  const [currentSong, setCurrentSong] = useState(null);
  useEffect(() => {
    const fetchCurrentSong = async () => {
      try {
        const {
          data: { item },
        } = await getCurrentlyPlayingSong();
        // console.log(item);
        setCurrentSong(item);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCurrentSong();
  }, []);
  return (
    <>
      <UserDetails />
      <UserTopArtists />
      <UserTopSongs />
      {currentSong && (
        <div className="song-player">
          <div className="song-details">
            <img
              src={
                currentSong.album.images &&
                currentSong.album.images.length &&
                currentSong.album.images[0].url
              }
              alt='Current playing song'
              className="track-img"
            />
            <div className="current-song-text-details">
              <p className="current-song-name">{currentSong.name}</p>
              <p className="current-song-artist">
                {currentSong.artists.length && currentSong.artists[0].name}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
