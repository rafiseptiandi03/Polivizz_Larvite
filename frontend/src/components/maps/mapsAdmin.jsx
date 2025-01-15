import "../maps/style.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    useMap,
    Polyline,
    Polygon,
    Marker,
    Popup,
    Tooltip,
} from "react-leaflet";
import { LayersControl } from "react-leaflet/LayersControl";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import axiosClient from "../../axiosClient";
import { Button, ButtonGroup } from "react-bootstrap";

function SearchControl() {
    const map = useMap();

    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider: provider,
            style: "bar",
            showMarker: true,
            showPopup: true,
            autoClose: true,
            retainZoomLevel: false,
            animateZoom: true,
            keepResult: true,
        });

        map.addControl(searchControl);

        return () => map.removeControl(searchControl);
    }, [map]);

    return null;
}

export default function MapsAdmin() {
    const [polylines, setPolylines] = useState([]);
    const [polygonData, setPolygonData] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [tempLatLngs, setTempLatLngs] = useState(null);

    useEffect(() => {
        const savedPolylines = JSON.parse(localStorage.getItem("polylines"));
        const savedPolygonData = JSON.parse(
            localStorage.getItem("polygonData")
        );
        const savedMarkers = JSON.parse(localStorage.getItem("markers"));

        if (savedPolylines) setPolylines(savedPolylines);
        if (savedPolygonData) setPolygonData(savedPolygonData);
        if (savedMarkers) setMarkers(savedMarkers);
    }, []);

    const handlePolygonSave = async (polygonData) => {
        try {
            const response = await axiosClient.post("/api/polygons", {
                id_kebun: polygonData.id,
                coordinates: polygonData.coordinates,
                polygon_name: polygonData.namaLahan,
            });
            console.log("Polygon saved:", response.data);
        } catch (error) {
            console.error("Failed to save polygon:", error);
        }
    };

    const handleCreated = (e) => {
        const { layerType, layer } = e;

        if (layerType === "polygon") {
            const latlngs = layer.getLatLngs()[0];
            setTempLatLngs(latlngs);
            setModalType("polygon");
            setIsModalOpen(true);
        } else if (layerType === "marker") {
            const position = layer.getLatLng();
            setTempLatLngs(position);
            setModalType("marker");
            setIsModalOpen(true);
        } else if (layerType === "polyline") {
            const latlngs = layer.getLatLngs();
            latlngs.push(latlngs[0]);
            layer.setLatLngs(latlngs);
            setPolylines((prevPolylines) => [...prevPolylines, latlngs]);
        }
    };

    const handleModalSubmit = async () => {
        if (modalType === "polygon") {
            const kebunId = inputValue;
            if (kebunId) {
                const idExists = polygonData.some(
                    (polygon) => polygon.id === kebunId
                );
                if (idExists) {
                    alert(
                        "ID kebun sudah ada. Harap masukkan ID yang berbeda."
                    );
                    return;
                }

                try {
                    const { data } = await axiosClient.get(`/kebun/${kebunId}`);
                    const namaLahan = data.namalahan;

                    const newPolygonData = {
                        id: kebunId,
                        namaLahan,
                        coordinates: tempLatLngs,
                    };
                    setPolygonData((prevPolygonData) => [
                        ...prevPolygonData,
                        newPolygonData,
                    ]);
                    await handlePolygonSave(newPolygonData);
                } catch (error) {
                    console.error("Error fetching kebun data:", error);
                    alert("ID tidak valid atau tidak ditemukan.");
                }
            }
        } else if (modalType === "marker") {
            const description = inputValue;
            if (description) {
                const newMarker = { position: tempLatLngs, description };
                setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
            }
        }
        setIsModalOpen(false);
        setInputValue("");
        setTempLatLngs(null);
    };

    const handleSave = () => {
        localStorage.setItem("polylines", JSON.stringify(polylines));
        localStorage.setItem("polygonData", JSON.stringify(polygonData));
        localStorage.setItem("markers", JSON.stringify(markers));
        alert("Data saved successfully!");
    };

    const handleDelete = () => {
        setPolylines([]);
        setPolygonData([]);
        setMarkers([]);
        localStorage.removeItem("polylines");
        localStorage.removeItem("polygonData");
        localStorage.removeItem("markers");
        alert("All data deleted successfully!");
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setInputValue("");
        setTempLatLngs(null);
    };

    return (
        <div>
            <MapContainer
                center={[-5.351, 105.229444]}
                zoom={18}
                scrollWheelZoom={true}
                zoomControl={false}
                minZoom={3}
                maxZoom={18}
            >
                <SearchControl />

                <LayersControl position="topright">
                    <LayersControl.BaseLayer name="OpenStreetMap">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            minZoom={3}
                            maxZoom={18}
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer checked name="Google Satellite">
                        <TileLayer
                            attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                            minZoom={1}
                            maxZoom={18}
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Google Satellite (Pins)">
                        <TileLayer
                            attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                            url="https://mt1.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                            minZoom={1}
                            maxZoom={18}
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.Overlay checked name="Marking and Pins">
                        <FeatureGroup>
                            <EditControl
                                position="topright"
                                onCreated={handleCreated}
                                draw={{
                                    rectangle: false,
                                    polygon: {
                                        shapeOptions: {
                                            color: "blue",
                                            fillColor: "blue",
                                            fillOpacity: 0.1,
                                            weight: 1,
                                        },
                                    },
                                    circlemarker: false,
                                    circle: false,
                                    marker: true,
                                    polyline: {
                                        shapeOptions: {
                                            color: "red",
                                            weight: 4,
                                        },
                                    },
                                }}
                                edit={{
                                    edit: false,
                                    remove: false,
                                }}
                            />
                        </FeatureGroup>
                    </LayersControl.Overlay>
                </LayersControl>

                {polylines.map((latlngs, index) => (
                    <Polyline
                        key={`polyline-${index}`}
                        positions={latlngs}
                        color="red"
                    />
                ))}
                {polygonData.map((polygon, index) => (
                    <Polygon
                        key={`polygon-${index}`}
                        positions={polygon.coordinates}
                        color="blue"
                        fillColor="blue"
                        fillOpacity={0.3}
                    >
                        <Tooltip permanent direction="center" opacity={0.7}>
                            {polygon.namaLahan}
                        </Tooltip>
                    </Polygon>
                ))}
                {markers.map((marker, index) => (
                    <Marker key={`marker-${index}`} position={marker.position}>
                        <Popup>{marker.description}</Popup>
                    </Marker>
                ))}
            </MapContainer>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>
                            {modalType === "polygon"
                                ? "Masukkan ID Kebun"
                                : "Masukkan Deskripsi Marker"}
                        </h3>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={
                                modalType === "polygon"
                                    ? ""
                                    : "Deskripsi marker"
                            }
                        />
                        <div className="modal-buttons">
                            <button
                                onClick={handleModalSubmit}
                                className="modal-button"
                            >
                                Submit
                            </button>
                            <button
                                onClick={handleModalCancel}
                                className="modal-button cancel-button"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ButtonGroup
                className="d-flex justify-content-end mt-3"
                style={{ width: "100%" }}
            >
                <Button
                    onClick={handleSave}
                    variant="secondary"
                    size="sm"
                    style={{ flex: 1 }}
                >
                    Save
                </Button>
                <Button
                    onClick={handleDelete}
                    variant="danger"
                    size="sm"
                    style={{ flex: 1 }}
                >
                    Delete
                </Button>
            </ButtonGroup>
        </div>
    );
}
