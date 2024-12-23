export interface VehicleIdentifier {
  make: string;
  model: string;
  year: number;
}

export interface VehicleSpecs {
  weight: number;
  horsepower: number;
  torque: number;
  engine: string;
  cylinders: number;
  zeroToSixty: number;
  sixtyToOneTwenty: number;
}

export interface VehicleSafety {
  safetyRating: number;
  survivalRating: number;
}

export interface VehicleTestimony {
  experience: string;
}

export interface VehicleProblem {
  issue: string;
  probability: number;
  cost: number;
  type: string;
  howToIdentify: string;
}

export interface VehicleProblemReport {
  issues: VehicleProblem[];
  reliabilityScore: number;
}

export interface VehicleAnalysis {
  make: string;
  model: string;
  year: number;
  common_issues: string[];
  known_characteristics: {
    engine: string;
    horsepower: string;
    transmission: string;
    fuel_type: string;
  };
  market_perception: {
    reliability: string;
    resale_value: string;
  };
}