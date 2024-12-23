import { useVehicle } from "../../contexts/VehicleContext";
import { useVehicleProblems, useVehicleSafety } from "../../hooks/useVehicle"

export function VehicleSafety() {
    const { selectedVehicle } = useVehicle();
    const safety = useVehicleSafety({ make: selectedVehicle?.make ?? '', model: selectedVehicle?.model ?? '', year: selectedVehicle?.year ?? 0 })
    const problems = useVehicleProblems({ make: selectedVehicle?.make ?? '', model: selectedVehicle?.model ?? '', year: selectedVehicle?.year ?? 0 })
    return (
        <div className="section ratings-section">
            <h2 className="section-title">Safety & Reliability</h2>
            <div className="ratings-container">
                <div className="rating-item">
                    <div className="rating-value">{safety.data?.safetyRating ? `${safety.data?.safetyRating}/5` : '-'}</div>
                    <div>Safety Rating</div>
                </div>
                <div className="rating-item">
                    <div className="rating-value">{safety.data?.survivalRating ? `${safety.data?.survivalRating}%` : '-'}</div>
                    <div>Crash Survival Rate</div>
                </div>
                <div className="rating-item">
                    <div className="rating-value">{problems.data?.reliabilityScore ? `${problems.data?.reliabilityScore}/5` : '-'}</div>
                    <div>Reliability Score</div>
                </div>
            </div>
        </div>
    )
}