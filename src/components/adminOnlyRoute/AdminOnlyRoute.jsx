import { useAuth } from '../../context/AuthContext';
import { Navigate } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return currentUser.email === "admin@admin.com" ? children : <Navigate to="/" />;
    }
}

export default AdminOnlyRoute