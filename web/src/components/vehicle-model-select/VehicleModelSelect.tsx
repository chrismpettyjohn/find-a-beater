import React from 'react';
import { useVehicle } from '../../contexts/VehicleContext';
import '../vehicle-select-styles.css';

const MODELS: Record<string, string[]> = {
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Prius', '4Runner', 'Sienna', 'Tundra'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V', 'Ridgeline'],
  Ford: ['F-150', 'Escape', 'Explorer', 'Fusion', 'Edge', 'Mustang', 'Expedition', 'Ranger'],
  Chevrolet: ['Silverado', 'Malibu', 'Equinox', 'Tahoe', 'Suburban', 'Traverse', 'Colorado', 'Camaro'],
  Nissan: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Frontier', 'Murano', 'Versa', 'Maxima'],
  BMW: ['3 Series', '5 Series', 'X5', 'X3', '7 Series', 'X1', 'M3', 'M5'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC', 'GLA', 'CLS', 'AMG GT'],
  Audi: ['A4', 'A6', 'Q5', 'Q7', 'A3', 'A8', 'Q3', 'TT'],
  Hyundai: ['Elantra', 'Sonata', 'Santa Fe', 'Tucson', 'Accent', 'Palisade', 'Kona', 'Ioniq'],
  Kia: ['Soul', 'Sorento', 'Sportage', 'Optima', 'Telluride', 'Forte', 'Rio', 'Stinger'],
  Subaru: ['Outback', 'Forester', 'Impreza', 'Crosstrek', 'WRX', 'Legacy', 'Ascent', 'BRZ'],
  Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y'],
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