import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import initialClientsData from '../data/clients.json';
import initialPropertiesData from '../data/properties.json';
import initialContractsData from '../data/contracts.json';

interface WhiteLabelConfig {
  companyName: string;
  primaryColor: string;
  logoUrl: string;
}

interface AppClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  interest: {
    propertyType: string;
    maxPrice?: number;
  } | null;
  createdAt: string;
}

interface AppProperty {
  id: string;
  title: string;
  type: string;
  address: string;
  price: number;
  rentPrice: number;
  status: string;
  createdAt: string;
  image: string;
  description?: string;
  images?: string[];
  features: {
    bedrooms: number;
    bathrooms: number;
    parking: number;
    area: number;
  };
}

interface AppContract {
  id: string;
  type: string;
  clientId: string;
  propertyId: string;
  value: number;
  status: string;
  startDate: string;
  endDate: string;
  signedAt: string | null;
}

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  config: WhiteLabelConfig;
  setConfig: (config: Partial<WhiteLabelConfig>) => void;
  clients: AppClient[];
  properties: AppProperty[];
  contracts: AppContract[];
  upsertClient: (client: AppClient) => void;
  upsertProperty: (property: AppProperty) => void;
  upsertContract: (contract: AppContract) => void;
  updatePropertyStatus: (propertyId: string, status: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      
      config: {
        companyName: 'RealEstate ERP',
        primaryColor: '#3b82f6', // blue-500
        logoUrl: '',
      },
      setConfig: (newConfig) => set((state) => ({ 
        config: { ...state.config, ...newConfig } 
      })),
      clients: initialClientsData as AppClient[],
      properties: initialPropertiesData as AppProperty[],
      contracts: (initialContractsData as Omit<AppContract, 'signedAt'>[]).map((contract) => ({
        ...contract,
        signedAt: null,
      })),
      upsertClient: (client) =>
        set((state) => ({
          clients: state.clients.some((item) => item.id === client.id)
            ? state.clients.map((item) => (item.id === client.id ? client : item))
            : [client, ...state.clients],
        })),
      upsertProperty: (property) =>
        set((state) => ({
          properties: state.properties.some((item) => item.id === property.id)
            ? state.properties.map((item) => (item.id === property.id ? property : item))
            : [property, ...state.properties],
        })),
      upsertContract: (contract) =>
        set((state) => ({
          contracts: state.contracts.some((item) => item.id === contract.id)
            ? state.contracts.map((item) => (item.id === contract.id ? contract : item))
            : [contract, ...state.contracts],
        })),
      updatePropertyStatus: (propertyId, status) =>
        set((state) => ({
          properties: state.properties.map((item) =>
            item.id === propertyId ? { ...item, status } : item
          ),
        })),
    }),
    {
      name: 'erp-imobiliario-storage',
      partialize: (state) => ({ theme: state.theme, config: state.config }),
    }
  )
);
