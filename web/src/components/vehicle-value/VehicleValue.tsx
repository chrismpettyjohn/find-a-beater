import { useMemo } from "react";
import { useVehicle } from "../../contexts/VehicleContext";
import { useVehicleProblems, useVehicleValue } from "../../hooks/useVehicle";
import { formatNumber } from "../../hooks/formatNumber";

export function VehicleValue() {
    const { selectedVehicle } = useVehicle();
    const value = useVehicleValue({
        make: selectedVehicle?.make ?? '',
        model: selectedVehicle?.model ?? '',
        year: selectedVehicle?.year ?? 0,
        zipCode: '12345'
    });
    const problems = useVehicleProblems({
        make: selectedVehicle?.make ?? '',
        model: selectedVehicle?.model ?? '',
        year: selectedVehicle?.year ?? 0
    });

    const totalRepairCost = useMemo(() => (
        problems.data?.issues?.reduce((total, item) => total + item.cost, 0) ?? 0
    ), [problems.data]);

    const finalValue = useMemo(() => (
        (value.data?.value ?? 0) - totalRepairCost
    ), [value.data, totalRepairCost]);

    return (
        <div className="cost-summary">
            <div className="cost-card value">
                <div className="cost-label">Starting Value</div>
                <div
                    className="cost-value"
                    style={{ color: "green" }}
                >
                    ${formatNumber(value.data?.value ?? 0, 0)}
                </div>
            </div>
            <div className="cost-card repairs">
                <div className="cost-label">Expected Repairs</div>
                <div
                    className="cost-value"
                    style={{ color: "red" }}
                >
                    ${formatNumber(totalRepairCost, 0)}
                </div>
            </div>
            <div className="cost-card final">
                <div className="cost-label">Final Value</div>
                <div
                    className="cost-value"
                    style={{ color: finalValue >= 0 ? "green" : "red" }}
                >
                    ${formatNumber(finalValue, 0)}
                </div>
            </div>
        </div>
    );
}
