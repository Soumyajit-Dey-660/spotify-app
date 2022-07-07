import React from 'react'
import UserDetails from '../UserDetails/UserDetails'
import UserTopArtists from '../UserTopArtists/UserTopArtists'
import UserTopSongs from '../UserTopSongs/UserTopSongs'

const Home = () => {
  return (
    <>
        <UserDetails />
        <UserTopArtists />
        <UserTopSongs />
    </>
  )
}

export default Home