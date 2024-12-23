import { useVehicle } from "../../contexts/VehicleContext";
import { formatNumber } from "../../hooks/formatNumber";
import { useVehicleTestimonies } from "../../hooks/useVehicle";

export function VehicleTestimonials() {
    const { selectedVehicle } = useVehicle();
    const testimonials = useVehicleTestimonies({ make: selectedVehicle?.make ?? '', model: selectedVehicle?.model ?? '', year: selectedVehicle?.year ?? 0 })
    return (
        <div className="section testimonials-section" style={{ maxHeight: 400, overflowY: 'auto' }}>
            <h2 className="section-title">Owner Testimonials</h2>
            <div className="testimonials">
                {
                    testimonials.data?.map((_, i) => (
                        <div className="testimonial" key={`testimonial_${i}`}>
                            <p>{_.experience}</p>
                        </div>
                    ))
                }
                <div className="testimonial">
                    "Great reliable car, had it for 5 years with minimal issues. Regular maintenance is key."
                </div>
                <div className="testimonial">
                    "Decent fuel economy and comfortable for long trips. Watch out for the timing belt though."
                </div>
            </div>
        </div>
    )
}