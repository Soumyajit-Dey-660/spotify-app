import { useEffect, useState } from 'react';
import { getTopArtists } from '../../../utils/spotify';
import './UserTopArtists.style.css';

const UserTopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  useEffect(() => {
    const fetchUserTopArtists = async () => {
      try {
        const {
          data: { items },
        } = await getTopArtists();
        setTopArtists(items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserTopArtists();
  }, []);
  return (
    <>
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
              <li key={item.id}>
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
