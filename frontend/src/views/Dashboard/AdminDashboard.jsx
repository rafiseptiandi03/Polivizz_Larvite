import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MapsAdmin from "../../components/maps/mapsAdmin.jsx";
import { FaUsers, FaClipboardList, FaSeedling } from "react-icons/fa";

function AdminDashboard() {
    return (
        <>
            <Card className="text-center shadow-sm border-0">
                <h3 className="fw-bold text-dark">Halo, Admin</h3>
                <p className="text-secondary">
                    Selamat datang di <strong>POLIVIZ</strong>! Kelola lahan dan
                    data untuk memastikan kelancaran operasional!
                </p>
            </Card>
            <br />
            <Row className="mb-5">
                <Col md={6} lg={4}>
                    <Card className="text-center shadow-sm border-0">
                        <Card.Body>
                            <FaSeedling
                                size={40}
                                className="mb-2 text-success"
                            />
                            <Card.Title>Data Perkebunan</Card.Title>
                            <Link
                                to="/admin/perkebunan"
                                className="btn btn-success"
                            >
                                Lihat Data
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4}>
                    <Card className="text-center shadow-sm border-0">
                        <Card.Body>
                            <FaClipboardList
                                size={40}
                                className="mb-2 text-warning"
                            />
                            <Card.Title>Data Peminjaman</Card.Title>
                            <Link
                                to="/admin/daftar-pengajuan"
                                className="btn btn-warning"
                            >
                                Lihat Data
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4}>
                    <Card className="text-center shadow-sm border-0">
                        <Card.Body>
                            <FaUsers size={40} className="mb-2 text-primary" />
                            <Card.Title>Total Pengguna</Card.Title>
                            <Link to="/admin/users" className="btn btn-primary">
                                Lihat Data
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div>
                <Card>
                    <h4 className="text-center">Visualisasikan Lahan</h4>
                </Card>
                <br />
                <Card>
                    <MapsAdmin />
                </Card>
            </div>
        </>
    );
}

export default AdminDashboard;
