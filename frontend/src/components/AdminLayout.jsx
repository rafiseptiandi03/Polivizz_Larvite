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
        <Container fluid className="d-flex p-0 bg-white" id="adminLayout">
            {/* Sidebar */}
            <Col
                md={isSidebarOpen ? 2 : 0}
                className={`bg-dark text-white p-3 d-flex flex-column justify-content-between`}
                style={{
                    minHeight: "100vh",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    transition: "width 0.3s ease",
                }}
            >
                {isSidebarOpen && (
                    <Navbar expand="lg" variant="dark" className="flex-column">
                        <Navbar.Brand className="text-center mb-4">
                            <img
                                src="/images/logov.png"
                                alt="Logo"
                                style={{ maxHeight: "50px" }}
                                className="mb-2"
                            />
                            <span
                                className="d-block fs-4"
                                style={{
                                    fontFamily: "'Poppins', sans-serif",
                                }}
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
                            <NavDropdown
                                title={
                                    <span className="text-white align-items-center">
                                        <FaTree className="me-2" /> Seputar
                                        Lahan
                                    </span>
                                }
                                id="seputar-lahan-dropdown"
                                className="menu-link"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item
                                    as={Link}
                                    to="/admin/perkebunan"
                                    className="d-flex align-items-center"
                                >
                                    <FaSeedling className="me-2" /> Data
                                    Perkebunan
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={Link}
                                    to="/admin/daftar-pengajuan"
                                    className="d-flex align-items-center"
                                >
                                    <FaClipboardList className="me-2" /> Data
                                    Peminjaman
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link
                                as={Link}
                                to="/admin/users"
                                className="text-white menu-link"
                            >
                                <FaUsers className="me-2" /> Users
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                )}
            </Col>

            {/* Content Area */}
            <Col
                md={isSidebarOpen ? 10 : 12}
                className="p-3 shadow-sm border-left bg-white"
                style={{
                    minHeight: "100vh",
                    overflowY: "auto",
                    marginLeft: isSidebarOpen ? "16.66%" : "0",
                    transition: "margin-left 0.3s ease",
                }}
                id="admin-content"
            >
                <header className="d-flex justify-content-between align-items-center border-bottom mb-3">
                    <Button
                        variant="outline-dark"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="me-3"
                    >
                        <FaBars />
                    </Button>
                    <Navbar expand="lg">
                        <Nav>
                            <NavDropdown
                                title={user ? user.name : "User"}
                                id="nav-dropdown-light"
                                menuVariant="light"
                                align="end"
                            >
                                <NavDropdown.Item onClick={onLogout}>
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
