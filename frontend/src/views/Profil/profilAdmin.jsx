import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function ProfilAdmin() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        jurusan: "Budidaya Tanaman Perkebunan",
        alamat: "",
        agama: "",
        tempatLahir: "",
        tanggalLahir: "",
        jenisKelamin: "",
        profilePhoto: null,
    });

    // Fetch admin profile data on component mount
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axiosClient.get("/profile");
                setFormData(response.data);  // Update state with fetched data
                console.log("Fetched data:", response.data.profilePhoto);  // Check the fetched data
            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        };

        fetchAdminData();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (formData.profilePhoto) {
            URL.revokeObjectURL(formData.profilePhoto);  // Revoke the previous object URL if needed
        }
        setFormData((prevData) => ({
            ...prevData,
            profilePhoto: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form data before submit:", formData);

        const formToSubmit = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "profilePhoto") {
                // Pastikan profilePhoto ada dan bertipe File
                if (formData.profilePhoto instanceof File) {
                    formToSubmit.append(key, formData.profilePhoto, formData.profilePhoto.name);
                }
            } else {
                formToSubmit.append(key, formData[key]);
            }
        });

        for (let pair of formToSubmit.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            const response = await axiosClient.post("/profile", formToSubmit, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Response data:", response.data);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("There was an error updating the profile. Please try again.");
        }
    };

    return (
        <Container className="mt-4">
            <h3 className="text-center mb-4">Profil Admin</h3>
            <Form onSubmit={handleSubmit}>
                {/* Profile Image */}
                <div className="profile-image-container text-center mb-4">
                    <img
                        src={
                            formData.profilePhoto
                                ? formData.profilePhoto instanceof File
                                    ? URL.createObjectURL(formData.profilePhoto) 
                                    : `${formData.profilePhoto}` 
                                : "https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small/simple-user-default-icon-free-png.png" // Default jika null/undefined
                        }
                        alt="Profil"
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

                {/* Additional Information */}
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Jurusan</Form.Label>
                            <Form.Control
                                type="text"
                                name="jurusan"
                                value={formData.jurusan}
                                onChange={handleInputChange}
                                placeholder="Masukkan Jurusan"
                                disabled
                            />
                        </Form.Group>
                    </Col>
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
                </Row>

                <Row className="mb-3">
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
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Select
                                name="jenisKelamin"
                                value={formData.jenisKelamin}
                                onChange={handleInputChange}
                            >
                                <option value="">--Pilih Jenis Kelamin--</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

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
