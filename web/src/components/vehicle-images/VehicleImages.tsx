import { useVehicle } from "../../contexts/VehicleContext";
import { useVehicleImages } from "../../hooks/useVehicle";

export function VehicleImages() {
    const { selectedVehicle } = useVehicle();
    const images = useVehicleImages({ make: selectedVehicle?.make ?? '', model: selectedVehicle?.model ?? '', year: selectedVehicle?.year ?? 0 })
    console.log(images.data)
    const data = images.data?.length ? images.data : []

    return (
        <div className="section images-section">
            <h2 className="section-title">Car Images</h2>
            <div className="image-gallery">
                {
                    data.map(_ => (

                        <img src={_} alt="car preview image" className="car-image" />
                    ))
                }
            </div>
        </div>
    )
}