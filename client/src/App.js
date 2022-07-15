import { useEffect, useState } from 'react';
import { accessToken, logout } from './utils/spotify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Categories from './components/Browse/Categories/Categories';
import Category from './components/Browse/Category/Category';
import PlaylistTracks from './components/Browse/PlaylistTracks/Tracks';
import Artist from './components/Artist/Artist';
import Album from './components/Album/Album';
import Search from './components/Search/Search/Search';

const App = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(accessToken);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {token !== null ? (
          <>
            <button className='logout-btn' onClick={logout}>Log Out</button>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="browse" element={<Categories /> } />
                <Route exact path='/browse/:categoryId' element={<Category />} />
                <Route exact path='/playlists/:playlistId/tracks' element={<PlaylistTracks />} />
                <Route exact path='/artist/:artistId' element={<Artist />} />
                <Route exact path='/album/:albumId' element={<Album />} />
                <Route path='/search' element={<Search />} />
              </Routes>
            </Router>
          </>
        ) : (
          <a className="App-link" href="http://localhost:5001/login">
            Login to Spotify
          </a>
        )}
      </header>
    </div>
  );
};

export default App;

// TODO: Fix all the "SEE ALL" links
// TODO: Upon login get the geolocation and set the ISO_3166-1_alpha-2 country code