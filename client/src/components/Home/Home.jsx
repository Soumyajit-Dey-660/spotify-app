import React, { useState, useEffect } from 'react';
import UserDetails from '../UserProfile/UserDetails/UserDetails';
import UserTopArtists from '../UserProfile/UserTopArtists/UserTopArtists';
import UserTopSongs from '../UserProfile/UserTopSongs/UserTopSongs';
import { getCurrentlyPlayingSong } from '../../utils/spotify';
import './Home.style.css';
import UserFollowing from '../UserProfile/UserFollowing/UserFollowing';
import SearchButton from '../Search/SearchButton/SearchButton';

const Home = () => {
  const [currentSong, setCurrentSong] = useState(null);
  useEffect(() => {
    const fetchCurrentSong = async () => {
      try {
        const {
          data: { item },
        } = await getCurrentlyPlayingSong();
        setCurrentSong(item);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCurrentSong();
  }, []);
  return (
    <>
      <SearchButton />
      <UserDetails />
      <UserTopArtists />
      <UserTopSongs />
      <UserFollowing />
      {currentSong && (
        <>
          <h3
            style={{
              fontWeight: 800,
              marginLeft: '1rem',
              marginBottom: '1rem',
            }}
          >
            Currently Playing
          </h3>
          <div className="song-player">
            <div className="song-details">
              <img
                src={
                  currentSong.album.images &&
                  currentSong.album.images.length &&
                  currentSong.album.images[0].url
                }
                alt="Current playing song"
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
        </>
      )}
    </>
  );
};

export default Home;
