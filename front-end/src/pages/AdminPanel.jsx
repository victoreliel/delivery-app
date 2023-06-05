import Navbar from '../components/NavBar';
import AdminRegisterForm from '../components/AdminRegisterForm';
import UsersList from '../components/UsersList';
import UserProvider from '../context/UserProvider';

function AdminPanel() {
  return (
    <>
      <Navbar />
      <UserProvider>
        <AdminRegisterForm />
        <UsersList />
      </UserProvider>
    </>
  );
}

export default AdminPanel;
