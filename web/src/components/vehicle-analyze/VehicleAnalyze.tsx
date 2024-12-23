export function VehicleAnalyze() {
    return (
        <div className="chat-row">
            <div className="chat-section">
                <h2 className="section-title">Ask About This Car</h2>
                <textarea className="chat-input" placeholder="Ask anything about this car..."></textarea>
            </div>
            <div className="chat-section">
                <h2 className="section-title">Response Summary</h2>
                <div className="response-summary">
                    <p><i>Your conversation history and AI responses will appear here.</i></p>
                    <p>Example: Based on your preferences and needs, this 2018 Toyota Camry SE offers good value considering its reliability ratings and moderate repair costs. The timing belt maintenance should be scheduled within the next year.</p>
                </div>
            </div>
        </div>
    )
}