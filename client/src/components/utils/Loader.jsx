import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = () => {
  return (
    <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ClipLoader color="#52bfd9" size={100} />
        </div>
  )
}

export default Loader