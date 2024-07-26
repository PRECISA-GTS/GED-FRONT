import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGlobal = create(
  persist(
    (set) => ({
      data: {},
      setData: (data) => set({ data }),
    }),
    {
      name: 'global-storage', // nome da chave no localStorage
    }
  )
);
