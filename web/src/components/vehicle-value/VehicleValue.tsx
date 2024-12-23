import { useMemo } from "react";
import { useVehicle } from "../../contexts/VehicleContext";
import { useVehicleProblems, useVehicleValue } from "../../hooks/useVehicle";
import { formatNumber } from "../../hooks/formatNumber";

export function VehicleValue() {
    const { selectedVehicle } = useVehicle();
    const value = useVehicleValue({ make: selectedVehicle?.make ?? '', model: selectedVehicle?.model ?? '', year: selectedVehicle?.year ?? 0, zipCode: '12345' })
    const problems = useVehicleProblems({ make: selectedVehicle?.make ?? '', model: selectedVehicle?.model ?? '', year: selectedVehicle?.year ?? 0 })
    const totalRepairCost = useMemo(() => problems.data?.issues?.reduce((total, item) => total + item.cost, 0) ?? 0, [problems.data]);
    return (
        <div className="cost-summary">
            <div className="cost-card value">
                <div className="cost-label">Car Value</div>
                <div className="cost-value">${formatNumber(value.data?.value ?? 0, 0)}</div>
            </div>
            <div className="cost-card repairs">
                <div className="cost-label">Expected Repairs</div>
                <div className="cost-value">${formatNumber(totalRepairCost, 0)}</div>
            </div>
        </div>
    )
}