import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaMapMarkerAlt, FaSeedling, FaFileAlt } from "react-icons/fa"; // Import icons

function MahasiswaDashboard() {
    const navigate = useNavigate(); // Inisialisasi useNavigate

    // Fungsi untuk navigasi ke halaman tujuan
    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Container fluid className="p-4">
            {/* Header Section */}
            <Row className="mb-4">
                <Col>
                    <Card className="text-center shadow-sm border-0">
                        <Card.Body>
                            <h3 className="fw-bold text-dark">
                                Halo, Mahasiswa
                            </h3>
                            <p className="text-secondary">
                                Selamat datang di <strong>POLIVIZ</strong>!
                                Temukan wawasan dan visualisasi lahan yang
                                bermanfaat untuk Anda!
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Content Section */}
            <Row>
                {/* Lokasi Lahan */}
                <Col md={4} sm={12} className="mb-4">
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Body className="text-center">
                            <FaMapMarkerAlt
                                size={50}
                                className="text-warning mb-3"
                            />
                            <Card.Title className="text-warning fw-bold">
                                Lokasi Lahan
                            </Card.Title>
                            <Card.Text>Lihat lokasi lahan</Card.Text>
                            <Button
                                variant="warning"
                                className="text-white"
                                onClick={() =>
                                    handleNavigate("/mahasiswa/lokasi")
                                }
                            >
                                Cek Lokasi
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Informasi Perkebunan */}
                <Col md={4} sm={12} className="mb-4">
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Body className="text-center">
                            <FaSeedling
                                size={50}
                                className="text-primary mb-3"
                            />
                            <Card.Title className="text-primary fw-bold">
                                Informasi Perkebunan
                            </Card.Title>
                            <Card.Text>
                                Lihat data lahan perkebunan secara terstruktur
                                dan mudah diakses.
                            </Card.Text>
                            <Button
                                variant="primary"
                                onClick={() =>
                                    handleNavigate("/mahasiswa/perkebunan")
                                }
                            >
                                Lihat Data
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Peminjaman Lahan */}
                <Col md={4} sm={12} className="mb-4">
                    <Card className="shadow-sm border-0 h-100">
                        <Card.Body className="text-center">
                            <FaFileAlt
                                size={50}
                                className="text-success mb-3"
                            />
                            <Card.Title className="text-success fw-bold">
                                Peminjaman Lahan
                            </Card.Title>
                            <Card.Text>
                                Ajukan peminjaman lahan sesuai kebutuhan
                                akademik Anda.
                            </Card.Text>
                            <Button
                                variant="success"
                                onClick={() =>
                                    handleNavigate("/mahasiswa/pengajuan")
                                }
                            >
                                Ajukan Sekarang
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default MahasiswaDashboard;
