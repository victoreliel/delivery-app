import React, { useContext } from 'react';
import Context from '../context/UserContext';

const INDEX_DATA_TESTID = 'admin_manage__element-user-table-item-number-';
const NAME_DATA_TESTID = 'admin_manage__element-user-table-name-';
const EMAIL_DATA_TESTID = 'admin_manage__element-user-table-email-';
const ROLE_DATA_TESTID = 'admin_manage__element-user-table-role-';
const BUTTON_DATA_TESTID = 'admin_manage__element-user-table-remove-';

function UsersList() {
  const { users, handleRemove } = useContext(Context);

  return (
    <>
      {users.map(({ id, name, email, role }, index) => (
        <section key={ index }>
          <p data-testid={ INDEX_DATA_TESTID + index }>{index + 1}</p>
          <p data-testid={ NAME_DATA_TESTID + index }>{name}</p>
          <p data-testid={ EMAIL_DATA_TESTID + index }>{email}</p>
          <p data-testid={ ROLE_DATA_TESTID + index }>{role}</p>
          <button
            data-testid={ BUTTON_DATA_TESTID + index }
            onClick={ () => handleRemove(id) }
            type="button"
          >
            Excluir
          </button>
        </section>
      ))}
    </>
  );
}

export default UsersList;
