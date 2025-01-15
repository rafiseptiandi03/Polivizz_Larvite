import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Container, Form, Button, Alert } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axiosClient from "../axiosClient";
import "../index.css";

export default function Register() {
    const [errors, setErrors] = useState({});
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const submitHandler = async (ev) => {
        ev.preventDefault();
        setErrors({});
        setErrorMessage("");

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        if (!payload.name || !payload.email || !payload.password) {
            setErrorMessage("Name, Email dan Password tidak boleh kosong.");
            return;
        }

        try {
            await axiosClient.post("/register", payload);
            navigate("/login");
        } catch (err) {
            const response = err.response;

            if (response && response.status === 422) {
                setErrors(response.data.errors);
            } else {
                setErrorMessage("Terjadi kesalahan, silakan coba lagi.");
            }
        }
    };

    return (
        <>
            {[false].map((expand) => (
                <Navbar
                    key={expand}
                    expand={expand}
                    className="bg-white mb-3 shadow-sm"
                >
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
            ))}
            <div className="form-container">
                <div className="login-signup-form animated fadeInDown">
                    <div className="form">
                        <h2 className="title">Create A New Account</h2>
                        {errorMessage && (
                            <Alert variant="danger" className="global-error">
                                {errorMessage}
                            </Alert>
                        )}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="formName" className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <FaUser />
                                    </span>
                                    <Form.Control
                                        ref={nameRef}
                                        type="text"
                                        placeholder="Name"
                                        isInvalid={!!errors.name}
                                        className="rounded-end"
                                    />
                                    {errors.name && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name[0]}
                                        </Form.Control.Feedback>
                                    )}
                                </div>
                            </Form.Group>

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
                                Register
                            </Button>

                            <p className="message">
                                Already Registered?{" "}
                                <Link to="/login" className="link">
                                    Login
                                </Link>
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
