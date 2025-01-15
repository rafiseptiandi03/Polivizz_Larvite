import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { Form, Button, Card, Container, Alert, Spinner } from "react-bootstrap";

export default function EditPerkebunan() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [namaLahan, setNamaLahan] = useState("");
    const [jenisTanaman, setJenisTanaman] = useState("");
    const [statusPertumbuhan, setStatusPertumbuhan] = useState("Baik");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchPerkebunan = async () => {
            try {
                const { data } = await axiosClient.get(`/kebun/${id}`);
                setNamaLahan(data.namalahan);
                setJenisTanaman(data.jenistanaman);
                setStatusPertumbuhan(data.statuspertumbuhan);
            } catch (err) {
                setError("Gagal memuat data.");
            } finally {
                setLoading(false);
            }
        };

        fetchPerkebunan();
    }, [id]);

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

            await axiosClient.put(`/kebun/${id}`, data);
            setSuccess("Data berhasil diperbarui!");
            setTimeout(() => navigate("/admin/perkebunan"), 1500);
        } catch (err) {
            setError("Gagal memperbarui data.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container>
                <Spinner animation="border" role="status" />
                <span className="ms-2">Memuat data...</span>
            </Container>
        );
    }

    return (
        <Container>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Card className="mt-5">
                <Card.Body>
                    <h3>Edit Data Perkebunan</h3>
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
                                    <span className="ms-2">Memperbarui...</span>
                                </>
                            ) : (
                                "Perbarui Data"
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
