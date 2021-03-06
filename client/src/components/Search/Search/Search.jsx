import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import { getSearchResults } from '../../../utils/spotify';
import './Search.style.css';

const Search = () => {
  // TODO: Add loading Spinner and slice the results based on image availability
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [active, setActive] = useState('all');
  const activeStyle = {color:' #000000', backgroundColor: '#ffffff'};
  const nonActiveStyle = {backgroundColor:' #2A2A2A', color: '#ffffff'};
  const ARTIST = 'artist';
  const ALBUM = 'album';
  const PLAYLIST = 'playlist';
  const TRACK = 'track';
  const SHOW = 'show';
  const EPISODE = 'episode';
  const searchTypes = [ALBUM, ARTIST, PLAYLIST, TRACK, SHOW, EPISODE];
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
  const fetchSearchResults = async (type) => {
    try {
      const { data } = await getSearchResults(
        formatSearchInput(searchTerm),
        formatSearchTypes(type)
      );
      console.log(data);
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  };
  const debouncedSearch = debounce((type = searchTypes) => {
    fetchSearchResults(type);
  }, 500); // TODO: Why is it getting called every time after the delay!!

  useEffect(() => {
    if (searchTerm !== '' && searchTerm) {
      debouncedSearch(searchTypes);
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
      {searchTerm !== '' && searchResults && (
        <div className="search-categories-container">
          <div
            className="search-category"
            onClick={() => {
              debouncedSearch(searchTypes);
              setActive('all');
            }}
            style={active === 'all' ? activeStyle : nonActiveStyle}
          >
            All
          </div>
          <div
            className="search-category"
            onClick={() => {
              debouncedSearch(ARTIST);
              setActive(ARTIST);
            }}
            style={active === ARTIST ? activeStyle: nonActiveStyle}
          >
            Artists
          </div>
          <div
            className="search-category"
            onClick={() => {
              debouncedSearch(ALBUM);
              setActive(ALBUM);
            }}
            style={active === ALBUM ? activeStyle : nonActiveStyle}
          >
            Albums
          </div>
          <div
            className="search-category"
            onClick={() => {
              debouncedSearch(TRACK);
              setActive(TRACK);
            }}
            style={active === TRACK ? activeStyle : nonActiveStyle}
          >
            Tracks
          </div>
          <div
            className="search-category"
            onClick={() => {
              debouncedSearch(PLAYLIST);
              setActive(PLAYLIST);
            }}
            style={active === PLAYLIST ? activeStyle : nonActiveStyle}
          >
            Playlists
          </div>
          <div
            className="search-category"
            onClick={() => {
              debouncedSearch(SHOW);
              setActive(SHOW);
            }}
            style={active === SHOW ? activeStyle : nonActiveStyle}
          >
            Shows
          </div>
          <div
            className="search-category"
            onClick={() => {
              debouncedSearch(EPISODE);
              setActive(EPISODE);
            }}
            style={active === EPISODE ? activeStyle : nonActiveStyle}
          >
            Episodes
          </div>
        </div>
      )}
      <div className="search-results-container">
        {searchTerm !== '' && searchResults && searchResults.artists && (
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
            <div className="mini-separator"></div>
          </>
        )}
        {searchTerm !== '' && searchResults && searchResults.albums && (
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
        {searchTerm !== '' && searchResults && searchResults.tracks && (
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
        {searchTerm !== '' && searchResults && searchResults.playlists && (
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
            <div className="mini-separator"></div>
          </>
        )}
        {searchTerm !== '' && searchResults && searchResults.shows && (
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
            <div className="mini-separator"></div>
          </>
        )}
        {searchTerm !== '' && searchResults && searchResults.episodes && (
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
            <div className="mini-separator"></div>
          </>
        )}
      </div>
    </>
  );
};

export default Search;
