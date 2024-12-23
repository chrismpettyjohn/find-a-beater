import React from 'react';
import { useVehicle } from '../../contexts/VehicleContext';
import '../vehicle-select-styles.css';

const MAKES = [
  'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Buick',
  'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ferrari', 'Fiat', 'Ford',
  'Genesis', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia',
  'Lamborghini', 'Land Rover', 'Lexus', 'Lincoln', 'Maserati', 'Mazda',
  'McLaren', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan', 'Porsche',
  'Ram', 'Rolls-Royce', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
];
export const VehicleMakeSelect: React.FC = () => {
  const { selectedVehicle, setSelectedVehicle } = useVehicle();

  return (
    <select
      className="vehicle-select"
      value={selectedVehicle?.make || ''}
      onChange={(e) => {
        const make = e.target.value;
        setSelectedVehicle(make ? { make, model: '', year: 0 } : null);
      }}
    >
      <option value="">Make</option>
      {MAKES.map((make) => (
        <option key={make} value={make}>
          {make}
        </option>
      ))}
    </select>
  );
};