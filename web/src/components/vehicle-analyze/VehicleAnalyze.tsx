import { ChangeEvent, useCallback, useState } from "react";
import { useVehicle } from "../../contexts/VehicleContext";
import { useVehicleAnalysis } from "../../hooks/useVehicle";

export function VehicleAnalyze() {
    const [prompt, setPrompt] = useState('');
    const { selectedVehicle } = useVehicle();
    const analysis = useVehicleAnalysis({ make: selectedVehicle?.make ?? '', model: selectedVehicle?.model ?? '', year: selectedVehicle?.year ?? 0, prompt })

    const onChangePrompt = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(event.currentTarget.value ?? '');
    }, [setPrompt]);
    return (
        <div className="chat-row">
            <div className="chat-section">
                <h2 className="section-title">Describe the car</h2>
                <textarea className="chat-input" placeholder="Tell us more about the condition of the car.  Any weird noises, scratches or other issues?" value={prompt} onChange={onChangePrompt}></textarea>
            </div>
            <div className="chat-section">
                <h2 className="section-title">Response Summary</h2>
                <div className="response-summary">
                    <p>{analysis.data?.common_issues ?? ''}</p>
                    <p><i>Your conversation history and AI responses will appear here.</i></p>
                </div>
            </div>
        </div>
    )
}