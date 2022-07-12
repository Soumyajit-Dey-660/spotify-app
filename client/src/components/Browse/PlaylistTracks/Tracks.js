import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistTracks } from '../../../utils/spotify';

const Tracks = () => {
  const { playlistId } = useParams();
  const [tracks, setTracks] = useState(null);
  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        const {
          data: { items },
        } = await getPlaylistTracks(playlistId);
        setTracks(items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlaylistTracks();
  }, [playlistId]);
  return (
    <>
      {tracks && (
        <>
          <div className="tracks-header">
            <h3
              style={{ fontWeight: 800, marginLeft: '2rem', marginTop: '2rem' }}
            >
              Tracks
            </h3>
          </div>
          <div className="fav-tracks-list">
            {tracks.map((item, idx) => (
              <div key={item.track.id} className="track-container">
                <div className="track-details">
                  <img
                    src={
                      item.track.album.images &&
                      item.track.album.images.length &&
                      item.track.album.images[0].url
                    }
                    alt={'track' + idx}
                    className="track-img"
                  />
                  <div className="track-text-details">
                    <p className="track-name">{item.track.name}</p>
                    <p className="track-artist">
                      {item.track.artists.length && item.track.artists[0].name}
                    </p>
                  </div>
                </div>
                <div className="rest-details">
                  <p className="track-album">{item.track.album.name}</p>
                  <span>
                    {Math.floor(item.track.duration_ms / (1000 * 60))}:
                    {Math.floor(item.track.duration_ms % (1000 * 60))
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

export default Tracks;
