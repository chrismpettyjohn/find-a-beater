import React from 'react';
import { useVehicle } from '../../contexts/VehicleContext';
import '../vehicle-select-styles.css';

const YEARS = Array.from({ length: 25 }, (_, i) => 2024 - i);

export const VehicleYearSelect: React.FC = () => {
  const { selectedVehicle, setSelectedVehicle } = useVehicle();

  return (
    <select
      className="vehicle-select"
      value={selectedVehicle?.year || ''}
      onChange={(e) => {
        if (!selectedVehicle) return;
        setSelectedVehicle({
          ...selectedVehicle,
          year: parseInt(e.target.value) || 0,
        });
      }}
      disabled={!selectedVehicle?.model}
    >
      <option value="">Year</option>
      {YEARS.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};