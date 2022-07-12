import React from 'react';
import Albums from './Albums/Albums';
import Similar from './Similar/Similar';
import Tracks from './Tracks/Tracks';

const Artist = () => {
  return (
    <>
    <div style={{marginTop: '2em'}} />
      <Albums />
      <Tracks />
      <Similar />
    </>
  );
};

export default Artist;
