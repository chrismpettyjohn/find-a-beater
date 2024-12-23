export function VehicleProblems() {
    return (
        <div className="section problems-section">
            <h2 className="section-title">Expected Problems</h2>
            <table className="problems-table">
                <tr>
                    <th>Issue</th>
                    <th>Probability</th>
                    <th>Cost</th>
                </tr>
                <tr>
                    <td>Timing Belt</td>
                    <td>75%</td>
                    <td>$800</td>
                </tr>
                <tr>
                    <td>Brakes</td>
                    <td>60%</td>
                    <td>$400</td>
                </tr>
                <tr>
                    <td>Suspension</td>
                    <td>45%</td>
                    <td>$600</td>
                </tr>
            </table>
        </div>
    )
}