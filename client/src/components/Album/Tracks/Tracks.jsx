import React, { useState, useEffect } from 'react';
import Loader from '../../utils/Loader';
import { useParams, useLocation } from 'react-router-dom';
import { getAlbumTracks } from '../../../utils/spotify';

const Tracks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { albumId } = useParams();
  const {
    state: { albumName, imgUrl },
  } = useLocation();
  const [tracks, setTracks] = useState(null);
  useEffect(() => {
    const fetchAlbumTracks = async () => {
      try {
        setIsLoading(true);
        const {
          data: { items },
        } = await getAlbumTracks(albumId);
        setTracks(items);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchAlbumTracks();
  }, [albumId]);
  return (
    <>
      {isLoading && <Loader />}

      {tracks && (
        <>
          <div className="tracks-header">
            <h3
              style={{ fontWeight: 800, marginLeft: '2rem', marginTop: '2rem' }}
            >
              <p style={{ fontSize: '0.95rem', color: '#888888' }}>
                All Tracks from
                <span style={{ fontSize: '1.5rem', marginLeft: '0.75rem' }}>
                  {albumName}
                </span>
              </p>
            </h3>
          </div>
          <div className="fav-tracks-list">
            {tracks.map((item, idx) => (
              <div key={item.id} className="track-container">
                <div className="track-details">
                  <img src={imgUrl} alt={'track' + idx} className="track-img" />
                  <div className="track-text-details">
                    <p className="track-name">{item.name}</p>
                    <p className="track-artist">
                      {item.artists.length && item.artists[0].name}
                    </p>
                  </div>
                </div>
                <div className="rest-details">
                  <p className="track-album">{albumName}</p>
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

export default Tracks;
