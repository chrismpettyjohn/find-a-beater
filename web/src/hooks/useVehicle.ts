import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { VehicleService } from '@find-a-beater/client';
import type {
  VehicleIdentifier,
  VehicleAnalysis,
  VehicleSafety,
  VehicleSpecs,
  VehicleTestimony,
  VehicleProblem,
  VehicleProblemReport
} from '@find-a-beater/client';

const service = new VehicleService();

// Common retry logic for regular SWR hooks
const retryConfig: SWRConfiguration = {
  errorRetryCount: 3,
  errorRetryInterval: 1000,
  onError: (err: any) => {
    console.error('Request failed:', err);
  },
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    if (error?.message?.includes('Failed to fetch') || error?.message?.includes('status: 5')) {
      const delay = retryCount * retryCount * 1000;
      setTimeout(() => revalidate({ retryCount }), delay);
    }
  }
};

// Mutation-specific retry logic
const mutationRetryConfig: Partial<SWRMutationConfiguration<any, any>> = {
  onError: (err: any) => {
    console.error('Mutation failed:', err);
  },
};

const createKey = (base: string, params: Record<string, any>) => {
  const queryString = Object.entries(params ?? {})
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  return `${base}?${queryString}`;
};

const fetcher = <T>(promise: () => Promise<T>): Promise<T> => promise();

export const useVehicleImages = (params: VehicleIdentifier | null) => {
  const key = params ? createKey('vehicle/images', params) : null;
  return useSWR<string[]>(
    key,
    () => fetcher(() => service.getVehicleImages(params!)),
    {
      revalidateOnFocus: false,
      ...retryConfig
    }
  );
};

export const useVehicleValue = (params: (VehicleIdentifier & { zipCode: string }) | null) => {
  const key = params ? createKey('vehicle/value', params) : null;
  return useSWR<{ value: number }>(
    key,
    () => fetcher(() => service.getVehicleValue(params!)),
    {
      revalidateOnFocus: false,
      ...retryConfig
    }
  );
};

export const useVehicleSpecs = (params: VehicleIdentifier | null) => {
  const key = params ? createKey('vehicle/specs', params) : null;
  return useSWR<VehicleSpecs>(
    key,
    () => fetcher(() => service.getVehicleSpecs(params!)),
    {
      revalidateOnFocus: false,
      ...retryConfig
    }
  );
};

export const useVehicleSafety = (params: VehicleIdentifier | null) => {
  const key = params ? createKey('vehicle/safety', params) : null;
  return useSWR<VehicleSafety>(
    key,
    () => fetcher(() => service.getVehicleSafety(params!)),
    {
      revalidateOnFocus: false,
      ...retryConfig
    }
  );
};

export const useVehicleProblems = (params: VehicleIdentifier | null) => {
  const key = params ? createKey('vehicle/problems', params) : null;
  return useSWR<VehicleProblemReport>(
    key,
    () => fetcher(() => service.getVehicleProblems(params!)),
    {
      revalidateOnFocus: false,
      ...retryConfig
    }
  );
};


export const useVehicleTestimonies = (params: VehicleIdentifier | null) => {
  const key = params ? createKey('vehicle/testimonies', params) : null;
  return useSWR<VehicleTestimony[]>(
    key,
    () => fetcher(() => service.getVehicleTestimonies(params!)),
    {
      revalidateOnFocus: false,
      ...retryConfig
    }
  );
};

export const useVehicleAnalysis = (params: VehicleIdentifier & { prompt: string }) => {
  return useSWRMutation<
    VehicleAnalysis, // Type of the data returned
    Error, // Type of the error
    string, // Type of the key
    { params: VehicleIdentifier; prompt: string } // Type of the mutation argument
  >(
    'vehicle/analyze', // Key
    async (key, { arg }) => {
      const { params, prompt } = arg;
      return service.analyzeVehicle(params, prompt); // Fetcher
    },
    {
      errorRetryCount: 3,
      onError: (error: Error) => {
        console.error('Mutation error:', error);
      },
      onSuccess: (data, key, config) => {
        console.log('Mutation success:', data);
      },
    } as SWRMutationConfiguration< // Explicitly typing the mutation configuration
      VehicleAnalysis,
      Error,
      string,
      { params: VehicleIdentifier; prompt: string }
    >
  );
};
