import React, { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Container, Row, Col, Table, Spinner } from "react-bootstrap";

export default function PerkebunanMahasiswa() {
    const [perkebunan, setPerkebunan] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPerkebunan();
    }, []);

    const getPerkebunan = async () => {
        setLoading(true);
        try {
            const { data } = await axiosClient.get("/kebun");
            setPerkebunan(data);
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <Row className="align-items-center mb-3">
                <Col>
                    <h4>Info Perkebunan</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    {loading ? (
                        <div className="text-center my-4">
                            <Spinner animation="border" role="status" />
                        </div>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Lahan</th>
                                    <th>Jenis Tanaman</th>
                                    <th>Status Pertumbuhan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {perkebunan.length > 0 ? (
                                    perkebunan.map((kebun, index) => (
                                        <tr key={kebun.id}>
                                            <td>{index + 1}</td>
                                            <td>{kebun.namalahan}</td>
                                            <td>{kebun.jenistanaman}</td>
                                            <td>{kebun.statuspertumbuhan}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
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
