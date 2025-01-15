import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
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

    const handleSubmit = async () => {
        try {
            const data = new FormData();
            data.append("keterangan", formData.keterangan);
            if (formData.bukti) {
                data.append("bukti", formData.bukti);
            }

            if (modalType === "create") {
                await axiosClient.post("/pengajuan", data);
            } else if (modalType === "edit") {
                console.log(
                    "Editing pengajuan with keterangan:",
                    formData.bukti
                );

                const response = await axiosClient.post(
                    `/pengajuan/${selectedId}`,
                    data
                );
                console.log("Response from edit:", data);
            }

            fetchPengajuan();
            handleModalClose();
        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response);
                console.error("Error data:", error.response.data);
                console.error("Error status:", error.response.status);
            } else {
                console.error("Error:", error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosClient.delete(`/pengajuan/${id}`);
            fetchPengajuan();
        } catch (error) {
            console.error("Error deleting pengajuan:", error);
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
            <h2 className="mb-4">Data Pengajuan</h2>

            <h6 className="mb-2">Informasi (WAJIB DIBACA!)</h6>

            {/* Informasi Peminjaman */}
            <div style={{ fontSize: "14px", marginBottom: "20px" }}>
                <ul>
                    <li>
                        Pengajuan peminjaman lahan yang diajukan melalui menu{" "}
                        <strong>Pengajuan Peminjaman</strong> akan divalidasi
                        oleh admin.
                    </li>
                    <li>Silakan unduh form peminjaman yang tersedia</li>
                    <li>
                        Isi form tersebut dengan jelas dan benar sebelum
                        melanjutkan proses.
                    </li>
                    <li>
                        Unggah bukti peminjaman setelah form terisi dengan benar
                        melalui tombol<strong> +Tambah Pengajuan</strong>.
                    </li>
                    <li>
                        Setelah bukti peminjaman diunggah, admin akan
                        memvalidasi data yang Anda kirimkan. Jika validasi
                        berhasil, maka status peminjaman akan{" "}
                        <strong>Disetujui</strong>
                    </li>
                </ul>
            </div>

            <Button
                variant="primary"
                className="mb-3"
                style={{ float: "right" }}
                onClick={() => handleModalOpen("create")}
            >
                +Tambah Pengajuan
            </Button>
            <Button
                className="mt-3"
                variant="danger"
                size="sm"
                href={`http://127.0.0.1:8000/template/Form_Peminjaman_Lahan.pdf`}
                target="_blank"
            >
                Download Form
            </Button>
            <Table
                striped
                bordered
                hover
                style={{
                    backgroundColor: "#f8f9fa", // Warna latar belakang terang pada tabel
                    color: "#333", // Warna teks lebih gelap
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
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() =>
                                        handleModalOpen("edit", item)
                                    }
                                >
                                    Edit
                                </Button>{" "}
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Create and Edit */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === "create"
                            ? "Tambah Pengajuan"
                            : "Edit Pengajuan"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label
                                style={{ float: "left", textAlign: "left" }}
                            >
                                Keterangan
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="keterangan"
                                value={formData.keterangan}
                                onChange={handleInputChange}
                                placeholder="Masukkan Keterangan"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label
                                style={{ float: "left", textAlign: "left" }}
                            >
                                Bukti
                            </Form.Label>
                            <Form.Control
                                type="file"
                                name="bukti"
                                accept=".png, .jpg, .jpeg, .pdf"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    const allowedTypes = [
                                        "image/png",
                                        "image/jpeg",
                                        "application/pdf",
                                    ];

                                    if (
                                        file &&
                                        allowedTypes.includes(file.type)
                                    ) {
                                        setFormData({
                                            ...formData,
                                            bukti: file,
                                        });
                                    } else {
                                        alert(
                                            "Hanya file gambar (PNG, JPG, JPEG) atau PDF yang diperbolehkan."
                                        );
                                    }
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        {modalType === "create" ? "Create" : "Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
