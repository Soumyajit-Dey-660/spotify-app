import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getParticularCategoryPlaylist } from '../../../utils/spotify';
import { capitalizeWord } from '../../../utils/generics';

const Category = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [categoryPlaylist, setCategoryPlaylist] = useState(null);
  const sectionHeaderStyle = { fontWeight: 800, marginLeft: '2rem' };

  useEffect(() => {
    const fetchCategoryPlaylist = async () => {
      try {
        const {
          data: {
            playlists: { items },
          },
        } = await getParticularCategoryPlaylist(categoryId);
        setCategoryPlaylist(items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategoryPlaylist();
  }, [categoryId]);
  return (
    <>
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
