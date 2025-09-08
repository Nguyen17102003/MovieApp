import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

// Tạo 1 queryClient mới
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30, 
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

// Bộ nhớ đệm bất đồng bộ lưu trữ dữ liệu từ những lần fetch dữ liệu (thông qua useQuery và useQueries)
export const persister = createAsyncStoragePersister({
  storage: {
    // localStorage trong trình duyệt là sync, wrap thành async để khớp với interface AsyncStorage
    getItem: async (key: string): Promise<string | null> =>
      Promise.resolve(window.localStorage.getItem(key)),
    setItem: async (key: string, value: string): Promise<void> =>
      Promise.resolve(window.localStorage.setItem(key, value)),
    removeItem: async (key: string): Promise<void> =>
      Promise.resolve(window.localStorage.removeItem(key)),
  },
});
