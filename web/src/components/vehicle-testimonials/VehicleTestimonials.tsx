import { useVehicle } from "../../contexts/VehicleContext";
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
            </div>
        </div>
    )
}