import React, { useState, useEffect } from 'react';
import {
  categoriesURL,
  newReleasesURL,
  featuredPlaylistsURL,
} from '../../../utils/spotify';
import './Categories.style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [newReleases, setNewReleases] = useState(null);
  const [featuredPlaylist, setFeaturedPlaylist] = useState(null);
  const sectionHeaderStyle = { fontWeight: 800, marginLeft: '2rem' };
  const fetchBrowseAll = () => {
    try {
      axios
        .all([
          axios.get(categoriesURL),
          axios.get(newReleasesURL),
          axios.get(featuredPlaylistsURL),
        ])
        .then(
          axios.spread((...responses) => {
            const [data1, data2, data3] = responses;
            setCategories(data1.data.categories.items);
            setNewReleases(data2.data.albums.items);
            setFeaturedPlaylist(data3.data.playlists.items);
          })
        );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchBrowseAll();
  }, []);
  return (
    <>
      {categories && (
        <>
          <div className="playlists-header">
            <h3 style={sectionHeaderStyle}>Playlists for you</h3>
            <a href="" className="all-artists-link">
              SEE ALL
            </a>
          </div>
          <ul className="fav-artists-list">
            {categories.map((item, idx) => (
              <li key={item.id} onClick={() => navigate(`/browse/${item.id}`)}>
                <img
                  src={item.icons && item.icons.length && item.icons[0].url}
                  alt={'playlist' + idx}
                />
                <p className="artist-name">{item.name}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      {newReleases && (
        <>
          <div className="playlists-header">
            <h3 style={sectionHeaderStyle}>New Releases</h3>
            <a href="" className="all-artists-link">
              SEE ALL
            </a>
          </div>
          <ul className="fav-artists-list">
            {newReleases.map((item, idx) => (
              <li key={item.id}>
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
      {featuredPlaylist && (
        <>
          <div className="playlists-header">
            <h3 style={sectionHeaderStyle}>Featured Playlists</h3>
            <a href="" className="all-artists-link">
              SEE ALL
            </a>
          </div>
          <ul className="fav-artists-list">
            {featuredPlaylist.map((item, idx) => (
              <li key={item.id}>
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

export default Categories;

// TODO: Make use of the data.categories.items.next property to fetch the next categories
