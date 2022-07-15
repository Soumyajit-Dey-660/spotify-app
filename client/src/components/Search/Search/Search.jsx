import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import { getSearchResults } from '../../../utils/spotify';
import './Search.style.css';

const Search = () => {
  // TODO: Make separate search categories like all, album, playlist, track etc.
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const searchTypes = [
    'album',
    'artist',
    'playlist',
    'track',
    'show',
    'episode',
  ];
  const formatSearchTypes = (types) => {
    if (Array.isArray(types)) {
      let resultString = '';
      for (let i = 0; i < types.length; i++) {
        resultString += types[i];
        if (i !== types.length - 1) {
          resultString += '%2C';
        }
      }
      return resultString;
    }
    return types;
  };
  const formatSearchInput = (searchTerm) => searchTerm.replace(' ', '%20');
  const fetchSearchResults = async () => {
    try {
      const { data } = await getSearchResults(
        formatSearchInput(searchTerm),
        formatSearchTypes(searchTypes)
      );
      console.log(data);
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  };
  const debouncedSearch = debounce(() => {
    fetchSearchResults();
  }, 500); // TODO: Why is it getting called every time after the delay!!

  useEffect(() => {
    if (searchTerm !== '' && searchTerm) {
      debouncedSearch();
    }
  }, [searchTerm]);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <>
      <div className="search-button-container" onClick={() => navigate('/')}>
        <i className="fa fa-home" />
        <button className="search-button">Home</button>
      </div>
      <div className="search-container">
        <i className="fa fa-search search-type-input" />
        <input
          className="search-box"
          type="text"
          name="searchTerm"
          id="search-box"
          ref={searchRef}
          placeholder="Artists, songs or podcasts"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="separator"></div>
      <div className="search-results-container">
        {searchResults && searchResults.artists && (
          <>
            <div className="artists-header">
              <h3 style={{ fontWeight: 800, marginLeft: '2rem' }}>Artists</h3>
              <a href="" className="all-artists-link">
                SEE ALL
              </a>
            </div>
            <ul className="fav-artists-list">
              {searchResults.artists.items.slice(0, 6).map((item, idx) => (
                <li
                  key={item.id}
                  onClick={() => navigate(`/artist/${item.id}`)}
                >
                  <img
                    src={
                      item.images && item.images.length && item.images[0].url
                    }
                    alt={'artist' + idx}
                  />
                  <p className="artist-name">{item.name}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="mini-separator"></div>
        {searchResults && searchResults.albums && (
          <>
            <div className="artists-header">
              <h3 style={{ fontWeight: 800, marginLeft: '2rem' }}>Albums</h3>
              <a href="" className="all-artists-link">
                SEE ALL
              </a>
            </div>
            <ul className="fav-artists-list">
              {searchResults.albums.items.slice(0, 6).map((item, idx) => (
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
                    src={
                      item.images && item.images.length && item.images[0].url
                    }
                    alt={'artist' + idx}
                  />
                  <p className="artist-name">{item.name}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        {searchResults && searchResults.tracks && (
          <>
            <div className="tracks-header">
              <h3
                style={{
                  fontWeight: 800,
                  marginLeft: '2rem',
                  marginTop: '2rem',
                }}
              >
                Tracks
              </h3>
              <a
                href=""
                className="all-artists-link"
                style={{ marginTop: '2.5rem' }}
              >
                SEE ALL
              </a>
            </div>
            <div className="fav-tracks-list">
              {searchResults.tracks.items.slice(0, 6).map((item, idx) => (
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
        {searchResults && searchResults.playlists && (
          <>
            <div className="playlists-header">
              <h3 style={{ fontWeight: 800, marginLeft: '2rem' }}>Playlists</h3>
              <a href="" className="all-artists-link">
                SEE ALL
              </a>
            </div>
            <ul className="fav-artists-list">
              {searchResults.playlists.items.slice(0, 6).map((item, idx) => (
                <li
                  key={item.id}
                  onClick={() => navigate(`/browse/${item.id}`)}
                >
                  <img
                    src={
                      item.images && item.images.length && item.images[0].url
                    }
                    alt={'playlist' + idx}
                  />
                  <p className="artist-name">{item.name}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="mini-separator"></div>
        {searchResults && searchResults.shows && (
          <>
            <div className="artists-header">
              <h3 style={{ fontWeight: 800, marginLeft: '2rem' }}>Shows</h3>
              <a href="" className="all-artists-link">
                SEE ALL
              </a>
            </div>
            <ul className="fav-artists-list">
              {searchResults.shows.items.slice(0, 6).map((item, idx) => (
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
                    src={
                      item.images && item.images.length && item.images[0].url
                    }
                    alt={'artist' + idx}
                  />
                  <p className="artist-name">{item.name}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="mini-separator"></div>
        {searchResults && searchResults.episodes && (
          <>
            <div className="artists-header">
              <h3 style={{ fontWeight: 800, marginLeft: '2rem' }}>Episodes</h3>
              <a href="" className="all-artists-link">
                SEE ALL
              </a>
            </div>
            <ul className="fav-artists-list">
              {searchResults.episodes.items.slice(0, 6).map((item, idx) => (
                <li
                  className="episode-list-item"
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
                    src={
                      item.images && item.images.length && item.images[0].url
                    }
                    alt={'artist' + idx}
                  />
                  <p className="artist-name">{item.name}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="mini-separator"></div>
      </div>
    </>
  );
};

export default Search;
