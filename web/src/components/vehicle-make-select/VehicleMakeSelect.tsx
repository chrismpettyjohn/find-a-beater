import React from 'react';
import { useVehicle } from '../../contexts/VehicleContext';
import '../vehicle-select-styles.css';

const MAKES = ['Toyota', 'Honda', 'Ford', 'Chevrolet'];

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