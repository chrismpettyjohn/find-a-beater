import { VehicleMakeSelect } from '../vehicle-make-select/VehicleMakeSelect';
import { VehicleModelSelect } from '../vehicle-model-select/VehicleModelSelect';
import { VehicleYearSelect } from '../vehicle-year-select/VehicleYearSelect';
import '../vehicle-select-styles.css';

export function VehicleSearch() {
  return (
    <div style={{ display: 'flex', alignContent: 'center', gap: 12, justifyContent: 'center', width: '100%' }}>
      <VehicleMakeSelect />
      <VehicleModelSelect />
      <VehicleYearSelect />
    </div>
  );
}