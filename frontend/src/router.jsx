import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import MahasiswaLayout from "./components/MahasiswaLayout.jsx";
import AdminDashboard from "./views/Dashboard/AdminDashboard.jsx";
import MahasiswaDashboard from "./views/Dashboard/MahasiswaDashboard.jsx";
import ProfilAdmin from "./views/Profil/profilAdmin.jsx";
import ProfilMahasiswa from "./views/Profil/profilMahasiswa.jsx";
import App from "./views/LandingPages/App.jsx";
import MapsGuest from "./views/LandingPages/index.jsx";
import PerkebunanAdmin from "./views/Kebun/perkebunanAdmin.jsx";
import NewPerkebunan from "./views/Kebun/new.jsx";
import EditPerkebunan from "./views/Kebun/edit.jsx";
import PerkebunanMahasiswa from "./views/Kebun/perkebunanMahasiswa.jsx";
import Pengajuan from "./views/SeputarLahan/pengajuanLahan.jsx";
import DaftarPengajuan from "./views/SeputarLahan/daftarPengajuan.jsx";
import LokasiLahan from "./views/SeputarLahan/lokasi.jsx";
import InformasiMahasiswa from "./views/SeputarLahan/informasiMahasiswa.jsx";
import InformasiAdmin from "./views/SeputarLahan/informasiAdmin.jsx";
import Users from "./views/users.jsx";
import UserForm from "./views/UserForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Unauthorized from "./components/Unauthorized.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                index: true,
                element: <App />,
            },
            {
                path: "/lokasi",
                element: <MapsGuest />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute element={<AdminDashboard />} role="admin" />
                ),
            },
            {
                path: "profil",
                element: (
                    <ProtectedRoute element={<ProfilAdmin />} role="admin" />
                ),
            },
            {
                path: "perkebunan",
                element: (
                    <ProtectedRoute
                        element={<PerkebunanAdmin />}
                        role="admin"
                    />
                ),
            },
            {
                path: "perkebunan/new",
                element: (
                    <ProtectedRoute element={<NewPerkebunan />} role="admin" />
                ),
            },
            {
                path: "perkebunan/edit/:id",
                element: (
                    <ProtectedRoute element={<EditPerkebunan />} role="admin" />
                ),
            },
            {
                path: "informasi",
                element: (
                    <ProtectedRoute element={<InformasiAdmin />} role="admin" />
                ),
            },
            {
                path: "daftar-pengajuan",
                element: (
                    <ProtectedRoute
                        element={<DaftarPengajuan />}
                        role="admin"
                    />
                ),
            },
            {
                path: "users",
                element: <ProtectedRoute element={<Users />} role="admin" />,
            },
            {
                path: "users/new",
                element: <ProtectedRoute element={<UserForm />} role="admin" />,
            },
            {
                path: "users/edit/:id",
                element: <ProtectedRoute element={<UserForm />} role="admin" />,
            },
        ],
    },
    {
        path: "/mahasiswa",
        element: <MahasiswaLayout />,
        children: [
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute
                        element={<MahasiswaDashboard />}
                        role="mahasiswa"
                    />
                ),
            },
            {
                path: "profil",
                element: (
                    <ProtectedRoute
                        element={<ProfilMahasiswa />}
                        role="mahasiswa"
                    />
                ),
            },
            {
                path: "perkebunan",
                element: (
                    <ProtectedRoute
                        element={<PerkebunanMahasiswa />}
                        role="mahasiswa"
                    />
                ),
            },
            {
                path: "informasi",
                element: (
                    <ProtectedRoute
                        element={<InformasiMahasiswa />}
                        role="mahasiswa"
                    />
                ),
            },
            {
                path: "lokasi",
                element: (
                    <ProtectedRoute
                        element={<LokasiLahan />}
                        role="mahasiswa"
                    />
                ),
            },
            {
                path: "pengajuan",
                element: (
                    <ProtectedRoute element={<Pengajuan />} role="mahasiswa" />
                ),
            },
        ],
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
]);

export default router;
