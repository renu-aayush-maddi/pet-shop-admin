import { create } from 'zustand';

const useAdminStore = create((set) => ({
  admin: null,
  setAdmin: (adminData) => set({ admin: adminData }),
}));

export default useAdminStore;
