import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col className="text-center">
                    <h1 className="display-4 text-danger">403</h1>
                    <h2 className="mb-4">Unauthorized Access</h2>
                    <p className="text-muted">
                        Anda tidak memiliki izin untuk mengakses halaman ini.
                    </p>
                    <Button variant="primary" onClick={handleGoBack}>
                        Kembali
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
