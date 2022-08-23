import React, { useState, useEffect } from 'react';
import Loader from '../../utils/Loader'
import { getRelatedArtists } from '../../../utils/spotify';
import { useParams, useNavigate } from 'react-router-dom';

const Similar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [artists, setArtists] = useState(null);
  useEffect(() => {
    const fetchSimilarArtists = async () => {
      try {
        setIsLoading(true);
        const {
          data: { artists },
        } = await getRelatedArtists(artistId);
        // LIMIT 6
        setArtists(artists.slice(0, 6));
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchSimilarArtists();
  }, [artistId]);
  return (
    <>
      {isLoading && <Loader />}
      {artists && (
        <>
          <div className="artists-header">
            <h3 style={{ fontWeight: 800, marginLeft: '2rem' }}>
              Similar Artists
            </h3>
            <a href="" className="all-artists-link">
              SEE ALL
            </a>
          </div>
          <ul className="fav-artists-list">
            {artists.map((item, idx) => (
              <li key={item.id} onClick={() => navigate(`/artist/${item.id}`)}>
                {' '}
                <img
                  src={item.images && item.images.length && item.images[0].url}
                  alt={'artist' + idx}
                />
                <p className="artist-name">{item.name}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Similar;
