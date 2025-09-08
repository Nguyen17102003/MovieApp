import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

// Tạo 1 queryClient mới
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   
      cacheTime: 1000 * 60 * 30,  // Lưu dữ liệu cache trong 30 phút
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})

// Bộ nhớ đệm bất đồng bộ lưu trữ dữ liệu từ những lần fetch dữ liệu (thông qua useQuery và useQueries)
export const persister = createAsyncStoragePersister({
  storage: window.localStorage, //  Sử dụng localStorage của người dùng
});

