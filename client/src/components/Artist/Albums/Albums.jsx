import React, { useState, useEffect } from 'react';
import Loader from '../../utils/Loader';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtistAlbums } from '../../../utils/spotify';

const Albums = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState(null);
  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      try {
        const {
          data: { items },
        } = await getArtistAlbums(artistId);
        setAlbums(items);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchAlbums();
  }, [artistId]);
  return (
    <>
      {isLoading && <Loader />}
      {albums && (
        <>
          <div className="artists-header">
            <h3 style={{ fontWeight: 800, marginLeft: '2rem' }}>Albums</h3>
            <a href="" className="all-artists-link">
              SEE ALL
            </a>
          </div>
          <ul className="fav-artists-list">
            {albums.map((item, idx) => (
              <li
                key={item.id}
                onClick={() =>
                  navigate(`/album/${item.id}`, {
                    state: {
                      albumName: item.name,
                      imgUrl: item.images[0].url,
                      artist: item.artists[0].name,
                    },
                  })
                }
              >
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

export default Albums;
