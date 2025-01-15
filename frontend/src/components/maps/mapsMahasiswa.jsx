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

export default function MapsMahasiswa() {
    const [polylines, setPolylines] = useState([]);
    const [polygonData, setPolygonData] = useState([]);
    const [markers, setMarkers] = useState([]);

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
                                onCreated={() => {}}
                                draw={{
                                    rectangle: false,
                                    polygon: false,
                                    circle: false,
                                    marker: false,
                                    polyline: false,
                                    circlemarker: false,
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
        </div>
    );
}
