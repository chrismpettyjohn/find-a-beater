import { createContext, useState, useContext, ReactNode } from 'react';

interface Vehicle {
  make: string;
  model: string;
  year: number;
}

interface VehicleContextType {
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export function VehicleProvider({ children }: { children: ReactNode }) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const value = {
    selectedVehicle,
    setSelectedVehicle,
  };

  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicleContext() {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicleContext must be used within a VehicleProvider');
  }
  return context;
}

export function useVehicle() {
  const { selectedVehicle, setSelectedVehicle } = useVehicleContext();

  const selectVehicle = (make: string, model: string, year: number) => {
    setSelectedVehicle({ make, model, year });
  };

  const clearSelection = () => {
    setSelectedVehicle(null);
  };

  return {
    selectedVehicle,
    selectVehicle,
    clearSelection,
  };
}
