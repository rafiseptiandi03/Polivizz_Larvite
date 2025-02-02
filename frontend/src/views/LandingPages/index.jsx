import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import MapsMahasiswa from "../../components/maps/mapsMahasiswa.jsx";

export default function MapsGuest() {
    return (
        <>
            {[false].map((expand) => (
                <Navbar
                    key={expand}
                    expand={expand}
                    className="bg-white mb-3 shadow-sm"
                >
                    <Container>
                        <Navbar.Brand href="/">POLIVIZ</Navbar.Brand>
                    </Container>
                </Navbar>
            ))}
            <Card>
                <h4 className="text-center">
                    LOKASI LAHAN JURUSAN BUDIDAYA TANAMAN PERKEBUNAN
                </h4>
            </Card>
            <br />
            <Card>
                <Card.Body>
                    <MapsMahasiswa />
                </Card.Body>
            </Card>
        </>
    );
}
