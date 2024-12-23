import { useVehicle } from "../../contexts/VehicleContext";
import { useVehicleSafety } from "../../hooks/useVehicle"

export function VehicleSafety() {
    const { selectedVehicle } = useVehicle();
    const safety = useVehicleSafety({ make: selectedVehicle?.make ?? '', model: selectedVehicle?.model ?? '', year: selectedVehicle?.year ?? 0 })
    return (
        <div className="section ratings-section">
            <h2 className="section-title">Safety & Reliability</h2>
            <div className="ratings-container">
                <div className="rating-item">
                    <div className="rating-value">
                        {Array.from({ length: safety.data?.safetyRating ?? 0 }, () => '*').join('')}
                    </div>
                    <div>Safety Rating</div>
                </div>
                <div className="rating-item">
                    <div className="rating-value">{safety.data?.survivalRating ?? 0}%</div>
                    <div>Crash Survival Rate</div>
                </div>
                <div className="rating-item">
                    <div className="rating-value">-</div>
                    <div>Reliability Score</div>
                </div>
            </div>
        </div>
    )
}