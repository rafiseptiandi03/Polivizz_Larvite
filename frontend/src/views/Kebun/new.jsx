import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { Form, Button, Card, Container, Alert, Spinner } from "react-bootstrap";

export default function NewPerkebunan() {
    const [namaLahan, setNamaLahan] = useState("");
    const [jenisTanaman, setJenisTanaman] = useState("");
    const [statusPertumbuhan, setStatusPertumbuhan] = useState("Baik");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!namaLahan || !jenisTanaman) {
            setError("Nama Lahan dan Jenis Tanaman harus diisi.");
            setLoading(false);
            return;
        }

        try {
            const data = {
                namalahan: namaLahan,
                jenistanaman: jenisTanaman,
                statuspertumbuhan: statusPertumbuhan.toLowerCase(),
            };

            await axiosClient.post("/kebun", data);
            setSuccess("Data berhasil ditambahkan!");
            setTimeout(() => navigate("/admin/perkebunan"), 1500);
        } catch (err) {
            setError("Gagal menambahkan data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Card className="mt-5">
                <Card.Body>
                    <h3>Tambah Data Perkebunan</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNamaLahan">
                            <Form.Label>Nama Lahan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Lahan"
                                value={namaLahan}
                                onChange={(e) => setNamaLahan(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="formJenisTanaman"
                            className="mt-3"
                        >
                            <Form.Label>Jenis Tanaman</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Jenis Tanaman"
                                value={jenisTanaman}
                                onChange={(e) =>
                                    setJenisTanaman(e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="formStatusPertumbuhan"
                            className="mt-3"
                        >
                            <Form.Label>Status Pertumbuhan</Form.Label>
                            <Form.Select
                                value={statusPertumbuhan}
                                onChange={(e) =>
                                    setStatusPertumbuhan(e.target.value)
                                }
                            >
                                <option value="Baik">Baik</option>
                                <option value="Sedang">Sedang</option>
                                <option value="Buruk">Buruk</option>
                            </Form.Select>
                        </Form.Group>

                        <Button
                            variant="secondary"
                            type="submit"
                            className="mt-4"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span className="ms-2">
                                        Menambahka Data...
                                    </span>
                                </>
                            ) : (
                                "Tambah Data"
                            )}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate("/admin/perkebunan")}
                            className="mt-2"
                        >
                            Kembali
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
