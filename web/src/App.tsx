import './App.css'
import { SiteLayout } from './components/site-layout/SiteLayout'
import { VehicleAnalyze } from './components/vehicle-analyze/VehicleAnalyze'
import { VehicleImages } from './components/vehicle-images/VehicleImages'
import { VehicleProblems } from './components/vehicle-problems/VehicleProblems'
import { VehicleSafety } from './components/vehicle-safety/VehicleSafety'
import { VehicleSpecs } from './components/vehicle-specs/VehicleSpecs'
import { VehicleTestimonials } from './components/vehicle-testimonials/VehicleTestimonials'
import { VehicleValue } from './components/vehicle-value/VehicleValue'
import { useVehicle, VehicleProvider } from './contexts/VehicleContext'

function AppContent() {
  const { selectedVehicle } = useVehicle();
  const isValidVehicle = selectedVehicle?.make && selectedVehicle?.model && selectedVehicle?.year

  return (
    <SiteLayout>
      {
        isValidVehicle
          ? (
            <>
              <VehicleValue />
              <div className="main-grid">
                <VehicleSafety />
                <VehicleImages />
                <VehicleSpecs />
                <VehicleProblems />
                <VehicleTestimonials />
                <VehicleAnalyze />
              </div>
            </>
          )
          : null
      }
    </SiteLayout>
  )
}

function App() {
  return (
    <VehicleProvider>
      <AppContent />
    </VehicleProvider>
  );
}

export default App