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
                            {_.experience}
                            <p><b>Pros:</b></p>
                            {
                                _.pros.map((pro, pi) => (
                                    <li key={`pro_${pi}`}>{pro}</li>
                                ))
                            }
                            <p><b>Cons:</b></p>
                            {
                                _.cons.map((con, ci) => (
                                    <li key={`con_${ci}`}>{con}</li>
                                ))
                            }
                            <p><b>Rating:</b></p>
                            {Array.from({ length: _.rating }, () => '*').join('')}
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