import React, { useState, useEffect } from 'react';
import { getTopSongs } from '../../../utils/spotify';
import Loader from '../../utils/Loader';
import './UserTopSongs.style.css';

const UserTopSongs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topSongs, setTopSongs] = useState(null);
  useEffect(() => {
    const fetchUserTopSongs = async () => {
      try {
        setIsLoading(true);
        const {
          data: { items },
        } = await getTopSongs();
        setTopSongs(items);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchUserTopSongs();
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      {topSongs && (
        <>
          <div className="tracks-header">
            <h3
              style={{ fontWeight: 800, marginLeft: '2rem', marginTop: '2rem' }}
            >
              Your favorite Tracks
            </h3>
            <a href="" className="all-tracks-link">
              SEE ALL
            </a>
          </div>
          <div className="fav-tracks-list">
            {topSongs.map((item, idx) => (
              <div key={item.id} className="track-container">
                <div className="track-details">
                  <img
                    src={
                      item.album.images &&
                      item.album.images.length &&
                      item.album.images[0].url
                    }
                    alt={'track' + idx}
                    className="track-img"
                  />
                  <div className="track-text-details">
                    <p className="track-name">{item.name}</p>
                    <p className="track-artist">
                      {item.artists.length && item.artists[0].name}
                    </p>
                  </div>
                </div>
                <div className="rest-details">
                  <p className="track-album">{item.album.name}</p>
                  <span>
                    {Math.floor(item.duration_ms / (1000 * 60))}:
                    {Math.floor(item.duration_ms % (1000 * 60))
                      .toString()
                      .substring(0, 2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default UserTopSongs;
