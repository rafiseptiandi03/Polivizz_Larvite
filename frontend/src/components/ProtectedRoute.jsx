import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider.jsx";

function ProtectedRoute({ element, role }) {
    const { user } = useStateContext();

    // Jika user belum login, arahkan ke halaman login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Jika role user tidak sesuai, arahkan ke halaman unauthorized
    if (role && user.role !== role) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Jika user login dan role sesuai, tampilkan elemen yang diminta
    return element;
}

export default ProtectedRoute;
