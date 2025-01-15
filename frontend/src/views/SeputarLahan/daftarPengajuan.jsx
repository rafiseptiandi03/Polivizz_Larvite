import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosClient from "../../axiosClient";
import { Card } from "react-bootstrap";

export default function Pengajuan() {
    const [pengajuan, setPengajuan] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [formData, setFormData] = useState({
        keterangan: "",
        bukti: "",
    });
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchPengajuan();
    }, []);

    const fetchPengajuan = async () => {
        try {
            const response = await axiosClient.get("/pengajuan");
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
            await axiosClient.post(`/pengajuan-update-status/${id}`, {
                status,
            });
            fetchPengajuan(); // Re-fetch the data to get the updated status
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case "dalam proses validasi":
                return (
                    <span className="badge bg-warning text-dark">
                        Dalam Proses Validasi
                    </span>
                );
            case "disetujui":
                return <span className="badge bg-success">Disetujui</span>;
            case "ditolak":
                return <span className="badge bg-danger">Ditolak</span>;
            default:
                return <span className="badge bg-secondary">Unknown</span>;
        }
    };

    return (
        <div>
            <Card>
                <h3 className="text-center">Data Pengajuan Peminjaman</h3>
            </Card>
            <br />
            <h4 className="mb-6">Informasi (WAJIB DIBACA!)</h4>

            <div style={{ fontSize: "14px", marginBottom: "20px" }}>
                <ul>
                    <li>
                        Admin akan memeriksa data peminjaman yang diajukan oleh
                        mahasiswa melalui menu <strong>Data Peminjaman</strong>.
                    </li>
                    <li>
                        Admin perlu mengecek bukti yang diunggah apakah sudah
                        sesuai dan valid.
                    </li>
                    <li>
                        Admin akan melakukan proses validasi menyetujui
                        peminjaman dan mengubah status menjadi{" "}
                        <strong>Disetujui</strong>. Jika pengajuan tidak valid,
                        admin dapat menolak pengajuan dan mengubah status
                        menjadi <strong>Ditolak</strong>.
                    </li>
                    <li>
                        Mahasiswa akan diberi tahu apakah pengajuannya{" "}
                        <strong>disetujui</strong> atau{" "}
                        <strong>ditolak </strong>
                        melalui status.
                    </li>
                </ul>
            </div>
            <br />
            <Table
                striped
                bordered
                hover
                style={{
                    backgroundColor: "#f8f9fa",
                    color: "#333",
                }}
            >
                <thead className="table-dark">
                    <tr>
                        <th className="text-center">No</th>
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
                            <td className="text-center">{index + 1}</td>
                            <td>{item.user ? item.user.name : "Tidak Ada"}</td>
                            <td>{item.keterangan}</td>
                            <td>
                                {item.bukti ? (
                                    <Button
                                        variant="primary"
                                        href={`http://127.0.0.1:8000/storage/bukti/${item.bukti}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        size="sm"
                                    >
                                        Lihat Bukti
                                    </Button>
                                ) : (
                                    "Tidak Ada"
                                )}
                            </td>
                            <td>{renderStatusBadge(item.status)} </td>
                            <td>
                                <Form.Control
                                    as="select"
                                    value={item.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            item.id,
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        display: "inline-block",
                                        width: "auto",
                                        marginLeft: "10px",
                                    }}
                                >
                                    <option value="dalam proses validasi">
                                        Dalam Proses Validasi
                                    </option>
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
