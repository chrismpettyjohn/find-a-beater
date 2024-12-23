interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  label: string;
}

const vehicles: Vehicle[] = [
  { id: '1', make: 'Toyota', model: 'Camry', year: 2015, label: '2015 Toyota Camry' },
  { id: '2', make: 'Honda', model: 'Civic', year: 2016, label: '2016 Honda Civic' },
  { id: '3', make: 'Ford', model: 'Focus', year: 2014, label: '2014 Ford Focus' }
];

export const searchVehicles = async (query: string): Promise<Vehicle[]> => {
  const searchTerm = query.toLowerCase();
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = vehicles.filter(
        (vehicle) =>
          vehicle.make.toLowerCase().includes(searchTerm) ||
          vehicle.model.toLowerCase().includes(searchTerm) ||
          vehicle.year.toString().includes(searchTerm) ||
          vehicle.label.toLowerCase().includes(searchTerm)
      );
      resolve(results);
    }, 300);
  });
};