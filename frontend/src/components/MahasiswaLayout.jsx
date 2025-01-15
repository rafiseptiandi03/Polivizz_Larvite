import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider.jsx";
import axiosClient from "../axiosClient";
import {
    Container,
    Col,
    Navbar,
    Nav,
    Card,
    NavDropdown,
} from "react-bootstrap";
import {
    FaClipboardList,
    FaHome,
    FaMapMarkerAlt,
    FaSeedling,
    FaUserCircle,
} from "react-icons/fa";
import "../index.css";

function MahasiswaLayout() {
    const { user, setUser, token, setToken, role, setRole } = useStateContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        axiosClient
            .get("/user")
            .then(({ data }) => {
                setUser(data);
                setRole(data.role);
                localStorage.setItem("role", data.role);
                if (data.role !== "mahasiswa") {
                    navigate("/unauthorized");
                }
            })
            .catch((err) => {
                console.error("Fetch user error:", err);
                navigate("/login");
            })
            .finally(() => setLoading(false));
    }, [token, navigate, setUser, setRole]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!token || role !== "mahasiswa") {
        return <Navigate to="/login" />;
    }

    return (
        <Container
            fluid
            className="d-flex flex-column flex-md-row p-0 bg-white"
        >
            {/* Sidebar */}
            <Col
                md={2}
                className="bg-dark text-white d-flex flex-column p-3"
                style={{ position: "sticky", top: 0 }}
            >
                <Navbar expand="lg" variant="dark" className="flex-column">
                    <Navbar.Brand
                        className="text-center mb-4"
                        style={{
                            borderBottom: "2px solid white",
                            paddingBottom: "10px",
                        }}
                    >
                        <img
                            src="/images/logov.png"
                            alt="Logo"
                            style={{ maxHeight: "50px" }}
                            className="mb-2"
                        />
                        <span
                            className="d-block fs-4"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            POLIVIZ
                        </span>
                    </Navbar.Brand>
                    <Nav className="flex-column w-100">
                        <Nav.Link
                            as={Link}
                            to="/mahasiswa/dashboard"
                            className="text-white menu-link"
                            style={{ fontSize: "14px" }}
                            activeClassName="active-link"
                        >
                            <FaHome className="me-2" /> Dashboard
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/mahasiswa/profil"
                            className="text-white menu-link"
                            style={{ fontSize: "14px" }}
                            activeClassName="active-link"
                        >
                            <FaUserCircle className="me-2" /> Profil
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/mahasiswa/perkebunan"
                            className="text-white menu-link"
                            style={{ fontSize: "14px" }}
                            activeClassName="active-link"
                        >
                            <FaSeedling className="me-2" /> Informasi
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/mahasiswa/lokasi"
                            className="text-white menu-link"
                            style={{ fontSize: "14px" }}
                            activeClassName="active-link"
                        >
                            <FaMapMarkerAlt className="me-2" /> Lokasi
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/mahasiswa/pengajuan"
                            className="text-white menu-link"
                            style={{ fontSize: "14px" }}
                            activeClassName="active-link"
                        >
                            <FaClipboardList className="me-2" /> Pengajuan
                            Peminjaman
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </Col>

            {/* Content Area */}
            <Col
                md={10}
                className="p-3 bg-white"
                style={{
                    height: "100vh",
                    overflowY: "auto",
                }}
            >
                <header className="d-flex justify-content-between align-items-center border-bottom mb-3">
                    <Navbar expand="lg" className="flex-grow-1">
                        <Nav className="ms-auto">
                            <NavDropdown
                                title={user ? user.name : "User"}
                                id="nav-dropdown-light"
                                menuVariant="light"
                                align="end"
                            >
                                <NavDropdown.Item
                                    onClick={() => navigate("/login")}
                                >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar>
                </header>
                <Card>
                    <Card.Body>
                        <Outlet />
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    );
}

export default MahasiswaLayout;
