import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import api from '../service/request';

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    const { data } = await api.get('/users');

    setUsers(data.filter(({ role }) => role !== 'administrator'));
  }, []);

  useEffect(() => fetchUsers(), [fetchUsers]);

  const handleRemove = useCallback(async (id) => {
    await api.delete(`/users/${id}`);

    fetchUsers();
  }, [fetchUsers]);

  const value = useMemo(() => ({
    users,
    fetchUsers,
    handleRemove,
  }), [users, fetchUsers, handleRemove]);

  return (
    <UserContext.Provider value={ value }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
