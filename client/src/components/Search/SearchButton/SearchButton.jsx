import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchButton.style.css';

const SearchButton = () => {
  const navigate = useNavigate();
  return (
    <div
      className="search-button-container"
      onClick={() => navigate('/search')}
    >
      <i className="fa fa-search search-type-button" />
      <button className="search-button">Search</button>
    </div>
  );
};

export default SearchButton;
