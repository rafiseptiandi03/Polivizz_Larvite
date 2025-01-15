import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export default function Users() {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const onDeleteClick = (user) => {
        if (
            !window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")
        ) {
            return;
        }
        axiosClient.delete(`/users/${user.id}`).then(() => {
            getUsers();
        });
    };

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUser(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div className="users-container">
            <div className="header">
                <h2>Users List</h2>
                <Link to="/admin/users/new" className="btn-add">
                    + Add New User
                </Link>
            </div>
            {loading ? (
                <div className="loading">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Table
                    striped
                    bordered
                    hover
                    responsive
                    className="user-table"
                    style={{
                        backgroundColor: "#f8f9fa", // Light background color
                        color: "#333", // Dark text color
                    }}
                >
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center">No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Hak Akses</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Link
                                            className="btn btn-warning btn-sm"
                                            to={`/admin/users/edit/${user.id}`}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => onDeleteClick(user)}
                                        >
                                            Hapus
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
