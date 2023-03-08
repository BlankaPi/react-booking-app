import { useAuth } from '../../context/AuthContext';

const AdminOnlyLinks = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return currentUser.email === "admin@admin.com" ? children : null;
  }
}

export default AdminOnlyLinks