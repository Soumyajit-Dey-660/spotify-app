import { useEffect, useState } from 'react';
import { accessToken, logout } from './utils/spotify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';

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
                {/* <Route path="top" element={<UserTopItems />} /> */}
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
