import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getParticularCategoryPlaylist } from '../../../utils/spotify';
import { capitalizeWord } from '../../../utils/generics';
import Loader from '../../utils/Loader';

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [categoryPlaylist, setCategoryPlaylist] = useState(null);
  const sectionHeaderStyle = { fontWeight: 800, marginLeft: '2rem' };

  useEffect(() => {
    const fetchCategoryPlaylist = async () => {
      try {
        setIsLoading(true);

        const {
          data: {
            playlists: { items },
          },
        } = await getParticularCategoryPlaylist(categoryId);
        setCategoryPlaylist(items);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchCategoryPlaylist();
  }, [categoryId]);
  return (
    <>
      {isLoading && <Loader />}

      {categoryPlaylist && (
        <>
          <div className="playlists-header">
            <h3 style={sectionHeaderStyle}>{capitalizeWord(categoryId)}</h3>
            <a href="" className="all-artists-link">
              SEE ALL
            </a>
          </div>
          <ul className="fav-artists-list">
            {categoryPlaylist.map((item, idx) => (
              <li
                key={item.id}
                onClick={() => navigate(`/playlists/${item.id}/tracks`)}
              >
                <img
                  src={item.images && item.images.length && item.images[0].url}
                  alt={'playlist' + idx}
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

export default Category;
