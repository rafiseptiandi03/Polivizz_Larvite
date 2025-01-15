import React from "react"; // mengelola komponen dan render aplikasi.
import ReactDOM from "react-dom/client"; // navigasi antar halaman.
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx"; //  konfigurasi rute aplikasi yang sudah Anda definisikan
import { ContextProvider } from "./contexts/contextprovider.jsx"; // Komponen konteks yang memungkinkan pengaturan global (seperti state atau fungsi) dapat diakses di seluruh komponen aplikasi.
import "bootstrap/dist/css/bootstrap.min.css"; // impor styling Bootstrap untuk memberikan akses ke komponen dan styling Bootstrap.
import "./index.css";

//  melakukan render ke elemen HTML dengan id="root"
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </React.StrictMode>
);
