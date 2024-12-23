import { useCallback, useEffect, useState } from "react";
import { useVehicle } from "../../contexts/VehicleContext"
import { vehicleService } from "../../services/vehicle.service";

export function VehicleSpecs() {
    const { selectedVehicle } = useVehicle();
    const [specs, setSpecs] = useState();

    const loadVehicle = useCallback(async (make: string, model: string, year: number) => {
        if (!selectedVehicle) {
            return;
        }
        setSpecs(undefined);
        const response = await vehicleService.getVehicleSpecs({ make, model, year })
    }, [setSpecs]);

    useEffect(() => {
        if (!selectedVehicle) return;
        loadVehicle(selectedVehicle.make, selectedVehicle.make, selectedVehicle.year)
    }, [selectedVehicle]);

    return (
        <div className="section specs-section">
            <h2 className="section-title">Specifications</h2>
            <table className="specs-table">
                <tr>
                    <td>Weight</td>
                    <td>3,245 lbs</td>
                </tr>
                <tr>
                    <td>Horsepower</td>
                    <td>168 hp</td>
                </tr>
                <tr>
                    <td>Torque</td>
                    <td>170 lb-ft</td>
                </tr>
                <tr>
                    <td>HP/Weight</td>
                    <td>19.3 lbs/hp</td>
                </tr>
            </table>
        </div>
    )
}