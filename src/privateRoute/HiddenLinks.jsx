import { useAuth } from '../context/AuthContext';

const ShowOnLogin = ({ children }) => {

    const { currentUser } = useAuth();
    if (currentUser) {
        return children
    }
    return null;
}

const ShowOnLogOut = ({ children }) => {

    const { currentUser } = useAuth();
    if (!currentUser) {
        return children
    }
    return null;
}


export { ShowOnLogin, ShowOnLogOut } 