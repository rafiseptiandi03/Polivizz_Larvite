import React from "react";
import MapsMahasiswa from "../../components/maps/mapsMahasiswa.jsx";
import { Card } from "react-bootstrap";

function LokasiLahan() {
    return (
        <>
            <Card>
                <h4 className="text-center mb-2">
                    Lokasi Lahan Jurusan Budidaya Tanaman Perkebunan
                </h4>
            </Card>
            <br />
            <div>
                <MapsMahasiswa />
            </div>
        </>
    );
}

export default LokasiLahan;
