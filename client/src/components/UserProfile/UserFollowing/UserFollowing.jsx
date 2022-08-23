import React, { useState, useEffect } from 'react';
import { getFollowingArtists } from '../../../utils/spotify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../utils/Loader';

const UserFollowing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState(null);
  useEffect(() => {
    const fetchFollowingArtists = async () => {
      try {
        setIsLoading(true);
        const {
          data: {
            artists: { items },
          },
        } = await getFollowingArtists();
        setArtists(items);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchFollowingArtists();
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      {artists && (
        <div style={{ marginBottom: '2rem' }}>
          <div className="artists-header">
            <h3 style={{ fontWeight: 800, marginLeft: '2rem' }}>Following</h3>
            <a href="" className="all-artists-link">
              SEE ALL
            </a>
          </div>
          <ul className="fav-artists-list">
            {artists.map((item, idx) => (
              <li key={item.id} onClick={() => navigate(`/artist/${item.id}`)}>
                <img
                  src={item.images && item.images.length && item.images[0].url}
                  alt={'artist' + idx}
                />
                <p className="artist-name">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default UserFollowing;
