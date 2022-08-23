import { useEffect, useState } from 'react';
import { getUserProfile } from '../../../utils/spotify';
import Loader from '../../utils/Loader';
import './UserDetails.style.css';

const UserDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await getUserProfile();
        setProfile(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      {profile && (
        <div className="profile-container">
          {profile.images.length && profile.images[0].url && (
            <img
              src={profile.images[0].url}
              alt="Avatar"
              className="avatar-img"
            />
          )}
          <h2>{profile.display_name}</h2>
          Followers: {profile.followers.total}
        </div>
      )}
    </>
  );
};

export default UserDetails;
