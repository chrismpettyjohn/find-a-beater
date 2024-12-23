import { useVehicle } from "../../contexts/VehicleContext";
import { formatNumber } from "../../hooks/formatNumber";
import { useVehicleProblems } from "../../hooks/useVehicle";

export function VehicleProblems() {
    const { selectedVehicle } = useVehicle();
    const problems = useVehicleProblems({ make: selectedVehicle?.make ?? '', model: selectedVehicle?.model ?? '', year: selectedVehicle?.year ?? 0 })
    return (
        <div className="section problems-section">
            <h2 className="section-title">Expected Problems</h2>
            <table className="problems-table">
                <tr>
                    <th>Issue</th>
                    <th>Probability</th>
                    <th>Cost</th>
                </tr>
                {
                    problems.data?.issues?.map(_ => (
                        <tr key={`issue_${_.issue}`}>
                            <td>{_.issue}</td>
                            <td>{_.probability * 100}%</td>
                            <td>${formatNumber(_.cost, 0)}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}