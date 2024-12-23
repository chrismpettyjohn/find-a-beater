import { useMemo } from "react";
import { useVehicle } from "../../contexts/VehicleContext"
import { useVehicleSpecs } from "../../hooks/useVehicle";
import { formatNumber } from "../../hooks/formatNumber";

export function VehicleSpecs() {
    const { selectedVehicle } = useVehicle();
    const specs = useVehicleSpecs({ make: selectedVehicle?.make ?? '', model: selectedVehicle?.model ?? '', year: selectedVehicle?.year ?? 0 })

    const hpWeight = useMemo(() => {
        return specs.data?.horsepower && specs.data?.weight
            ? (specs.data.weight / specs.data.horsepower).toFixed(2)
            : 0;
    }, [specs.data]);

    return (
        <div className="section specs-section">
            <h2 className="section-title">Specifications</h2>
            <table className="specs-table">
                <tr>
                    <td>Weight</td>
                    <td>{formatNumber(specs.data?.weight ?? 0, 0)}lb</td>
                </tr>
                <tr>
                    <td>Horsepower</td>
                    <td>{specs.data?.horsepower ?? 0}hp</td>
                </tr>
                <tr>
                    <td>Torque</td>
                    <td>{specs.data?.torque ?? 0}lb</td>
                </tr>
                <tr>
                    <td>HP/Weight</td>
                    <td>{hpWeight} hp/lb</td>
                </tr>
            </table>
        </div>
    )
}