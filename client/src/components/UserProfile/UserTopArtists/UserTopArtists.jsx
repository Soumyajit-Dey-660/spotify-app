import { useEffect, useState } from 'react';
import { getTopArtists } from '../../../utils/spotify';
import { useNavigate } from 'react-router-dom';
import './UserTopArtists.style.css';
import Loader from '../../utils/Loader';

const UserTopArtists = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topArtists, setTopArtists] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserTopArtists = async () => {
      try {
        setIsLoading(true);
        const {
          data: { items },
        } = await getTopArtists();
        setTopArtists(items);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchUserTopArtists();
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      {topArtists && (
        <>
          <div className="artists-header">
            <h3 style={{ fontWeight: 800, marginLeft: '2rem' }}>
              Your favorite Artists
            </h3>
            <a href="" className="all-artists-link">
              SEE ALL
            </a>
          </div>
          <ul className="fav-artists-list">
            {topArtists.map((item, idx) => (
              <li key={item.id} onClick={() => navigate(`/artist/${item.id}`)}>
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

export default UserTopArtists;
