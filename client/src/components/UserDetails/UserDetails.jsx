import { useEffect, useState } from 'react';
import { getUserProfile } from '../../utils/spotify';
import './UserDetails.style.css';
const UserDetails = () => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
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
