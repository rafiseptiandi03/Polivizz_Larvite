import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider.jsx";
import axiosClient from "../axiosClient";
import {
    Container,
    Col,
    Navbar,
    Nav,
    NavDropdown,
    Card,
    Button,
} from "react-bootstrap";
import {
    FaClipboardList,
    FaHome,
    FaSeedling,
    FaTree,
    FaUserCircle,
    FaUsers,
    FaBars,
} from "react-icons/fa";
import "../index.css";

function AdminLayout() {
    const { user, setUser, token, setToken, role, setRole } = useStateContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient
            .get("/logout")
            .then(() => {
                setUser(null);
                setToken(null);
                setRole(null);
                localStorage.removeItem("ACCESS_TOKEN");
                localStorage.removeItem("role");
                navigate("/login");
            })
            .catch((err) => {
                console.error("Logout error:", err);
            });
    };

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
                if (data.role !== "admin") {
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

    if (!token || role !== "admin") {
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
                            to="/admin/dashboard"
                            className="text-white menu-link"
                            activeClassName="active-link"
                        >
                            <FaHome className="me-2" /> Dashboard
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/admin/profil"
                            className="text-white menu-link"
                            activeClassName="active-link"
                        >
                            <FaUserCircle className="me-2" /> Profil
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/admin/perkebunan"
                            className="text-white menu-link"
                            activeClassName="active-link"
                        >
                            <FaSeedling className="me-2" /> Data Perkebunan
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/admin/daftar-pengajuan"
                            className="text-white menu-link"
                            activeClassName="active-link"
                        >
                            <FaClipboardList className="me-2" /> Data Peminjaman
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/admin/users"
                            className="text-white menu-link"
                        >
                            <FaUsers className="me-2" /> Users
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

export default AdminLayout;
