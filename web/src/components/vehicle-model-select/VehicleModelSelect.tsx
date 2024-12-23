import React from 'react';
import { useVehicle } from '../../contexts/VehicleContext';
import '../vehicle-select-styles.css';

const MODELS: Record<string, string[]> = {
  Toyota: ['Camry', 'Corolla', 'RAV4'],
  Honda: ['Civic', 'Accord', 'CR-V'],
  Ford: ['F-150', 'Focus', 'Escape'],
  Chevrolet: ['Silverado', 'Malibu', 'Equinox'],
};

export const VehicleModelSelect: React.FC = () => {
  const { selectedVehicle, setSelectedVehicle } = useVehicle();
  const models = selectedVehicle?.make ? MODELS[selectedVehicle.make] : [];

  return (
    <select
      className="vehicle-select"
      value={selectedVehicle?.model || ''}
      onChange={(e) => {
        if (!selectedVehicle) return;
        setSelectedVehicle({ ...selectedVehicle, model: e.target.value });
      }}
      disabled={!selectedVehicle?.make}
    >
      <option value="">Model</option>
      {models.map((model) => (
        <option key={model} value={model}>
          {model}
        </option>
      ))}
    </select>
  );
};