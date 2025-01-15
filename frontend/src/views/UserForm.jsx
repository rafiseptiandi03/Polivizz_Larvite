import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUsers] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUsers(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    navigate("/admin/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/users", user)
                .then(() => {
                    navigate("/admin/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="user-form-container">
            <h1>{user.id ? `Update User: ${user.name}` : "New User"}</h1>
            <Card className="p-4 mb-3">
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Form onSubmit={onSubmit}>
                        {errors && (
                            <Alert variant="danger">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </Alert>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={user.name}
                                onChange={(ev) =>
                                    setUsers({ ...user, name: ev.target.value })
                                }
                                placeholder="Enter name"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={user.email}
                                onChange={(ev) =>
                                    setUsers({
                                        ...user,
                                        email: ev.target.value,
                                    })
                                }
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(ev) =>
                                    setUsers({
                                        ...user,
                                        password: ev.target.value,
                                    })
                                }
                                placeholder="Enter password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hak Akses</Form.Label>
                            <Form.Select
                                value={user.role}
                                onChange={(e) =>
                                    setUsers({ ...user, role: e.target.value })
                                }
                                required
                            >
                                <option value="">-Pilih Hak Akses-</option>
                                <option value="admin">admin</option>
                                <option value="mahasiswa">mahasiswa</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex flex-column align-items-center gap-2">
                            <Button
                                variant="secondary"
                                type="submit"
                                className="w-100"
                            >
                                Save
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate("/admin/users")}
                                className="w-100"
                            >
                                Kembali
                            </Button>
                        </div>
                    </Form>
                )}
            </Card>
        </div>
    );
}
