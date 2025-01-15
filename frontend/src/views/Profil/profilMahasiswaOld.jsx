import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button, Container } from "react-bootstrap";

export default function ProfilMahasiswa() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        npm: "",
        jurusan: "Budidaya Tanaman Perkebunan",
        prodi: "",
        tahunMasuk: "",
        alamat: "",
        agama: "",
        noHp: "",
        tempatLahir: "",
        tanggalLahir: "",
        jenisKelamin: "",
        profilePhoto: null,
    });

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/api/mahasiswa/profile");
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            profilePhoto: e.target.files[0],
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formToSubmit = new FormData();
        Object.keys(formData).forEach((key) => {
            formToSubmit.append(key, formData[key]);
        });

        try {
            await axios.put("/api/mahasiswa/profile", formToSubmit);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h3 className="text-center mb-4">Profil Mahasiswa</h3>
            <Form onSubmit={handleSubmit}>
                {/* Profile Image */}
                <div className="profile-image-container text-center mb-4">
                    <img
                        src={
                            formData.profilePhoto
                                ? URL.createObjectURL(formData.profilePhoto)
                                : "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                        className="profile-image rounded-circle"
                    />
                </div>

                {/* Personal Information */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Masukkan Nama"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Masukkan Email"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>NPM</Form.Label>
                            <Form.Control
                                type="text"
                                name="npm"
                                value={formData.npm}
                                onChange={handleInputChange}
                                placeholder="Masukkan NPM"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Jurusan</Form.Label>
                            <Form.Control
                                type="text"
                                name="jurusan"
                                value="Budidaya Tanaman Perkebunan"
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Academic Information */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Program Studi</Form.Label>
                            <Form.Select
                                name="prodi"
                                value={formData.prodi}
                                onChange={handleInputChange}
                            >
                                <option value="">
                                    --Pilih Program Studi--
                                </option>
                                <option value="PMIP">
                                    Produksi Tanaman Perkebunan
                                </option>
                                <option value="PTP">
                                    Produksi dan Manajemen Industri Perkebunan
                                </option>
                                <option value="Pengelolaan Perkebunan Kopi">
                                    Pengelolaan Perkebunan Kopi
                                </option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Tahun Masuk</Form.Label>
                            <Form.Select
                                name="tahunMasuk"
                                value={formData.tahunMasuk}
                                onChange={handleInputChange}
                            >
                                <option value="">--Pilih Tahun Masuk--</option>
                                {Array.from(
                                    { length: new Date().getFullYear() - 2017 },
                                    (_, i) => 2018 + i
                                ).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Birth Information */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Tempat Lahir</Form.Label>
                            <Form.Control
                                type="text"
                                name="tempatLahir"
                                value={formData.tempatLahir}
                                onChange={handleInputChange}
                                placeholder="Masukkan Tempat Lahir"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Tanggal Lahir</Form.Label>
                            <Form.Control
                                type="date"
                                name="tanggalLahir"
                                value={formData.tanggalLahir}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Additional Information */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Select
                                name="jenisKelamin"
                                value={formData.jenisKelamin}
                                onChange={handleInputChange}
                            >
                                <option value="">
                                    --Pilih Jenis Kelamin--
                                </option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>No Handphone</Form.Label>
                            <Form.Control
                                type="text"
                                name="noHp"
                                value={formData.noHp}
                                onChange={handleInputChange}
                                placeholder="Masukkan No HP"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                                type="text"
                                name="alamat"
                                value={formData.alamat}
                                onChange={handleInputChange}
                                placeholder="Masukkan Alamat"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Agama</Form.Label>
                            <Form.Select
                                name="agama"
                                value={formData.agama}
                                onChange={handleInputChange}
                            >
                                <option value="">--Pilih Agama--</option>
                                <option value="Islam">Islam</option>
                                <option value="Kristen">Kristen</option>
                                <option value="Katolik">Katolik</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Buddha">Buddha</option>
                                <option value="Konghucu">Konghucu</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Profile Photo */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Foto Profil</Form.Label>
                            <Form.Control
                                type="file"
                                name="profilePhoto"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Submit Button */}
                <Row>
                    <Col className="text-end">
                        <Button variant="primary" type="submit">
                            Update Profile
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
