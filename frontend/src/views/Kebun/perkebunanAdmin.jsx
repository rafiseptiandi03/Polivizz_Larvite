import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Spinner,
    Alert,
} from "react-bootstrap";

export default function PerkebunanAdmin() {
    const [perkebunan, setPerkebunan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(null);

    useEffect(() => {
        getPerkebunan();
    }, []);

    const getPerkebunan = async () => {
        setLoading(true);
        try {
            const { data } = await axiosClient.get("/kebun");
            setPerkebunan(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDeleteClick = async (kebun) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?"))
            return;

        setDeleting(true);
        try {
            await axiosClient.delete(`/kebun/${kebun.id}`);
            setDeleteSuccess("Data berhasil dihapus!");
            getPerkebunan();
        } catch (error) {
            console.error("Gagal Menghapus Data:", error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Container className="mt-4">
            {deleteSuccess && <Alert variant="success">{deleteSuccess}</Alert>}
            <Row className="align-items-center mb-3">
                <Col>
                    <h2>Data Perkebunan</h2>
                </Col>
                <Col className="text-end">
                    <Link to="/admin/perkebunan/new">
                        <Button variant="primary">+ Add New Data</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    {loading ? (
                        <div className="text-center my-4">
                            <Spinner animation="border" role="status" />
                            <span className="ms-2">Loading data...</span>
                        </div>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Lahan</th>
                                    <th>Jenis Tanaman</th>
                                    <th>Status Pertumbuhan</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {perkebunan.length > 0 ? (
                                    perkebunan.map((kebun) => (
                                        <tr key={kebun.id}>
                                            <td>{kebun.id}</td>
                                            <td>{kebun.namalahan}</td>
                                            <td>{kebun.jenistanaman}</td>
                                            <td>{kebun.statuspertumbuhan}</td>
                                            <td>
                                                <Link
                                                    to={`/admin/perkebunan/edit/${kebun.id}`}
                                                >
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        className="me-2"
                                                    >
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() =>
                                                        onDeleteClick(kebun)
                                                    }
                                                    disabled={deleting}
                                                >
                                                    {deleting ? (
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        "Hapus"
                                                    )}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            Data Belum Tersedia
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
