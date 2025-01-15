import NavbarGuest from "./Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaTree, FaMapMarkedAlt, FaTools } from "react-icons/fa";
import { useState } from "react";

function App() {
    const [clickedIcon, setClickedIcon] = useState(null);

    // Definisikan data untuk kartu
    const cards = [
        {
            title: "Visualisasi Lahan",
            text: "Menampilkan Visualisasi lahan dan potensi area yang mendukung jenis tanaman tertentu.",
            icon: <FaMapMarkedAlt size={70} />,
        },
        {
            title: "Ajukan Peminjaman Lahan",
            text: "Formulir pengajuan untuk peminjaman lahan, dilengkapi dengan detail kebutuhan dan tujuan penggunaan lahan.",
            icon: <FaTree size={70} />,
        },
        {
            title: "Tentang Lahan",
            text: "Informasi Pengelolaan Lahan yang ada, dan status perkembangan yang optimal.",
            icon: <FaTools size={70} />,
        },
    ];

    return (
        <>
            <NavbarGuest />
            <div className="app-content landing-page"></div>
            <div className="app-content">
                <Container fluid className="landing-hero">
                    <Row>
                        <Col>
                            <h1 className="display-4">
                                POLINELA VISUALIZATION
                            </h1>
                            <p className="mt-5 description-box">
                                Platform yang dirancang khusus untuk pemetaan
                                lahan dan manajemen informasi lahan. Dengan
                                fitur canggih, POLINELA VISUALIZATION membantu
                                mahasiswa mengakses data lahan dengan mudah,
                                serta memberikan visualisasi yang akurat dan
                                terkini untuk mendukung pengambilan keputusan
                                yang lebih tepat.
                            </p>
                            <Button
                                href="/lokasi"
                                variant="primary"
                                className="mt-3 hero-btn"
                            >
                                Lihat Lahan
                            </Button>
                        </Col>
                    </Row>
                </Container>

                <Container className="py-5 info-section">
                    <Row className="text-center">
                        {cards.map((card, index) => (
                            <Col md={4} key={index}>
                                <Card
                                    className={`mb-4 shadow-sm info-card ${
                                        clickedIcon === index ? "active" : ""
                                    }`}
                                    onMouseEnter={() => setClickedIcon(index)}
                                    onMouseLeave={() => setClickedIcon(null)}
                                >
                                    <Card.Body>
                                        <div
                                            className={`mb-3 info-card-icon ${
                                                clickedIcon === index
                                                    ? "clicked"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setClickedIcon(index)
                                            }
                                        >
                                            {card.icon}
                                        </div>
                                        <Card.Title className="info-card-title">
                                            {card.title}
                                        </Card.Title>
                                        <Card.Text>{card.text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>

                <Container fluid className="footer text-center">
                    <Row>
                        <Col>
                            <p>
                                <b>
                                    &copy; 2024 Tim Proding. All Rights
                                    Reserved.
                                </b>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default App;
