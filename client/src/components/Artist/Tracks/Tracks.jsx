import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistTracks } from '../../../utils/spotify';
import Loader from '../../utils/Loader';

const Tracks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { artistId } = useParams();
  const [tracks, setTracks] = useState(null);
  useEffect(() => {
    const fetchArtistTracks = async () => {
      try {
        setIsLoading(true);
        const {
          data: { tracks },
        } = await getArtistTracks(artistId, 'IN');
        setTracks(tracks);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchArtistTracks();
  }, [artistId]);
  return (
    <>
      {isLoading && <Loader />}
      {tracks && (
        <>
          <div className="tracks-header">
            <h3
              style={{ fontWeight: 800, marginLeft: '2rem', marginTop: '2rem' }}
            >
              Top Tracks
            </h3>
          </div>
          <div className="fav-tracks-list">
            {tracks.map((item, idx) => (
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

export default Tracks;
