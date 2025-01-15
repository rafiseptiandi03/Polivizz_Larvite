import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Container, Form, Button, Alert } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider.jsx";
import "../index.css";

export default function Login() {
    const [errors, setErrors] = useState({});
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const { setUser, setToken, setRole } = useStateContext();

    const submitHandler = async (ev) => {
        ev.preventDefault();
        setErrors({});
        setErrorMessage("");

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        if (!payload.email || !payload.password) {
            setErrorMessage("Email dan Password tidak boleh kosong.");
            return;
        }

        try {
            const { data } = await axiosClient.post("/login", payload);
            setUser(data.user);
            setToken(data.token);
            setRole(data.user.role);

            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            if (data.user.role) {
                if (data.user.role === "admin") {
                    navigate("/admin/dashboard");
                } else if (data.user.role === "mahasiswa") {
                    navigate("/mahasiswa/dashboard");
                }
            } else {
                setErrorMessage("Role pengguna tidak ditemukan.");
            }
        } catch (err) {
            const response = err.response;

            if (response) {
                if (response.status === 422 && response.data.errors) {
                    setErrors(response.data.errors);
                } else if (response.status === 401) {
                    setErrorMessage(response.data.message);
                } else {
                    setErrorMessage("Terjadi kesalahan, silakan coba lagi.");
                }
            } else {
                setErrorMessage(
                    "Kesalahan jaringan, silakan periksa koneksi Anda."
                );
            }
        }
    };

    return (
        <>
            <Navbar expand={false} className="bg-white mb-3 shadow-sm">
                <Container>
                    <img
                        src="/images/logov.png"
                        alt="Logo"
                        style={{ maxHeight: "50px" }}
                        className="mb-2"
                    />
                    <Navbar.Brand href="/" className="text-dark">
                        Beranda
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <div className="form-container">
                <div className="login-signup-form animated fadeInDown">
                    <div className="form">
                        <div className="logo">
                            <img
                                src="/images/logov.png"
                                alt="Logo"
                                className="logo-image"
                            />
                            <h3 className="title welcome-text">Login</h3>
                        </div>
                        {errorMessage && (
                            <Alert variant="danger" className="global-error">
                                {errorMessage}
                            </Alert>
                        )}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaEnvelope />
                                    </span>
                                    <Form.Control
                                        ref={emailRef}
                                        type="email"
                                        placeholder="Email"
                                        isInvalid={!!errors.email}
                                        className="rounded-end"
                                    />
                                    {errors.email && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email[0]}
                                        </Form.Control.Feedback>
                                    )}
                                </div>
                            </Form.Group>

                            <Form.Group
                                controlId="formPassword"
                                className="mb-3"
                            >
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaLock />
                                    </span>
                                    <Form.Control
                                        ref={passwordRef}
                                        type="password"
                                        placeholder="Password"
                                        isInvalid={!!errors.password}
                                        className="rounded-end"
                                    />
                                    {errors.password && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password[0]}
                                        </Form.Control.Feedback>
                                    )}
                                </div>
                            </Form.Group>

                            <Button
                                type="submit"
                                className="btn btn-secondary btn-block rounded-pill mb-3"
                            >
                                Login
                            </Button>

                            <p className="message">
                                Not Registered?{" "}
                                <Link to="/register" className="link">
                                    Create a new account
                                </Link>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
