import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useVehicle } from '../../contexts/VehicleContext';
import { searchVehicles } from '../../services/mockVehicleApi';
import type { GroupBase, OptionProps, SingleValue } from 'react-select';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  label: string;
  value?: string;  // Adding value for react-select
}

export const VehicleSearch = () => {
  const { selectedVehicle, setSelectedVehicle } = useVehicle();
  const [inputValue, setInputValue] = useState('');

  const loadOptions = async (inputValue: string) => {
    const results = await searchVehicles(inputValue);
    // Transform results to include value property
    return results.map(vehicle => ({
      ...vehicle,
      value: vehicle.id
    }));
  };

  const handleChange = (newValue: SingleValue<Vehicle>) => {
    if (newValue) {
      setSelectedVehicle(newValue);
    } else {
      setSelectedVehicle(null);
    }
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      background: 'var(--bg-secondary)',
      borderColor: 'var(--text-secondary)',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'var(--accent)'
      }
    }),
    menu: (base: any) => ({
      ...base,
      background: 'var(--bg-secondary)',
      border: '1px solid var(--text-secondary)'
    }),
    option: (base: any, state: { isFocused: boolean; isSelected: boolean }) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? 'var(--accent)'
        : state.isFocused 
          ? 'var(--bg-primary)'
          : 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: 'var(--accent)'
      }
    }),
    input: (base: any) => ({
      ...base,
      color: 'var(--text-primary)'
    }),
    singleValue: (base: any) => ({
      ...base,
      color: 'var(--text-primary)'
    }),
    placeholder: (base: any) => ({
      ...base,
      color: 'var(--text-secondary)'
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: 'var(--text-secondary)',
      '&:hover': {
        color: 'var(--accent)'
      }
    }),
    loadingMessage: (base: any) => ({
      ...base,
      color: 'var(--text-primary)'
    }),
    noOptionsMessage: (base: any) => ({
      ...base,
      color: 'var(--text-primary)'
    })
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <AsyncSelect<Vehicle>
        cacheOptions
        defaultOptions
        value={selectedVehicle}
        inputValue={inputValue}
        onInputChange={(newValue) => setInputValue(newValue || '')}
        loadOptions={loadOptions}
        onChange={handleChange}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.label}
        placeholder="Search by make, model, or year..."
        styles={customStyles}
        isClearable
      />
    </div>
  );
};