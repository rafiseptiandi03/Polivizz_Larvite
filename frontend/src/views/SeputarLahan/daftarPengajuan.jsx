import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axiosClient from "../../axiosClient"; // Pastikan Anda sudah memiliki konfigurasi axiosClient

export default function Pengajuan() {
    const [pengajuan, setPengajuan] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(""); // 'create', 'edit', 'delete'
    const [formData, setFormData] = useState({
        keterangan: "",
        bukti: "",
    });
    const [selectedId, setSelectedId] = useState(null);

    // Fetch data pengajuan on component mount
    useEffect(() => {
        fetchPengajuan();
    }, []);

    const fetchPengajuan = async () => {
        try {
            const response = await axiosClient.get("/pengajuan"); // Adjust endpoint accordingly
            setPengajuan(response.data);
        } catch (error) {
            console.error("Error fetching pengajuan data:", error);
        }
    };

    const handleModalOpen = (type, data = null) => {
        setModalType(type);
        setShowModal(true);
        if (type === "edit" && data) {
            setFormData(data);
            setSelectedId(data.id);
        } else {
            setFormData({
                keterangan: "",
                bukti: "",
            });
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle status change
    const handleStatusChange = async (id, status) => {
        try {
            
            await axiosClient.post(`/pengajuan-update-status/${id}`, { status });
            fetchPengajuan(); // Re-fetch the data to get the updated status
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case 'dalam proses validasi':
                return <span className="badge bg-warning text-dark">Dalam Proses Validasi</span>;
            case 'disetujui':
                return <span className="badge bg-success">Disetujui</span>;
            case 'ditolak':
                return <span className="badge bg-danger">Ditolak</span>;
            default:
                return <span className="badge bg-secondary">Unknown</span>;
        }
    };

    return (
        <div>
            <h2>Data Pengajuan</h2>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Mahasiswa</th>
                        <th>Keterangan</th>
                        <th>Bukti</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {pengajuan.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.user ? item.user.name : "Tidak Ada"}</td>
                            <td>{item.keterangan}</td>
                            <td>
                                {item.bukti ? (
                                    <Button variant="primary" href={`http://127.0.0.1:8000/storage/bukti/${item.bukti}`} target="_blank" rel="noopener noreferrer">
                                        Lihat Bukti
                                    </Button>
                                ) : (
                                    "Tidak Ada"
                                )}
                            </td>
                            <td>
                                {renderStatusBadge(item.status)}{" "}
                            </td>
                            <td>
                                <Form.Control
                                    as="select"
                                    value={item.status}
                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                    style={{ display: "inline-block", width: "auto", marginLeft: "10px" }}
                                >
                                    <option value="dalam proses validasi">Dalam Proses Validasi</option>
                                    <option value="disetujui">Disetujui</option>
                                    <option value="ditolak">Ditolak</option>
                                </Form.Control>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
