import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserSearch from './UserSearch';

const UserSearchPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page user-search-page">
      <UserSearch onClose={() => navigate(-1)} />
    </div>
  );
};

export default UserSearchPage;