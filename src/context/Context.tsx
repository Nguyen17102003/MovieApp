import { createContext, useContext, useState, ReactNode } from "react";
import { useQueries, usePrefetchQuery, useQuery, UseQueryResult, useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";
import { queryClient } from "./QueryClient";


// Kiểu dữ liệu của dữ liệu context truyền xuống
interface ContextType {
  trendingMovies: UseQueryResult<any>;
  trendingTV: UseQueryResult<any>;
  topratedMovies: UseQueryResult<any>;
  topratedTV: UseQueryResult<any>;
  hydrated: boolean;
  searchTerm: string | null;
  searchQuery: UseInfiniteQueryResult<any>;
  fetchHangingTrailer: UseQueryResult<any>;
  searchType: string | null;
  isOpenTrailer: boolean;
  keyword: string;
  useMovies: (type: string) => UseInfiniteQueryResult<any>; 
  handleSearch: () => void;
  prefetchHangingTrailer: (id: string) => void;
  openTrailer: (id: string) => void;
  searchBaseOnLocation: (locationQuery: string) => void;
  setIsOpenTrailer: React.Dispatch<React.SetStateAction<boolean>>;
  setHydrated: React.Dispatch<React.SetStateAction<boolean>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setSearchType: React.Dispatch<React.SetStateAction<string | null>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>
}

const AppContext = createContext<ContextType | undefined>(undefined);

// Props cho Provider
interface ProviderProps {
  children: ReactNode;
}

// Provider cung cấp data cho các component 
const Provider = ({ children }: ProviderProps) => {
  const [hydrated, setHydrated] = useState(false)
  const [currentMovieId, setCurrentMovieId] = useState<string | null>(null)
  const [isOpenTrailer, setIsOpenTrailer] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string | null>(""); //  Chuỗi tìm kiếm được gửi đi
  const [searchType, setSearchType] = useState<string | null>("movie"); // Chuỗi người dùng nhập tạm thời trên thanh input

  const API_URL = import.meta.env.VITE_API_URL as string; // API trang web
  const API_KEY = import.meta.env.VITE_API_KEY as string; // API key

  // Các tham số phụ của khi thực hiện fetch
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  // Thực hiện nhiều yêu cầu fetch cùng 1 lúc
  const results = useQueries({
    queries: [
      {
        // Trending Movie
        queryKey: ["Trending movies"],
        queryFn: () =>
          fetch(`${API_URL}/trending/movie/day?include_adult=false`, options).then((res) =>
            res.json()
          ),
        enabled: !queryClient.getQueryData(["Trending movies"]),
      },
      {
        // Trending TV 
        queryKey: ["Trending TV"],
        queryFn: () =>
          fetch(`${API_URL}/trending/tv/day?include_adult=false`, options).then((res) =>
            res.json()
          ),
        enabled: !queryClient.getQueryData(["Trending TV"]),
      },
      {
        // Top rated movie
        queryKey: ["Top rated movies"],
        queryFn: () =>
          fetch(`${API_URL}/movie/top_rated?include_adult=false`, options).then((res) =>
            res.json()
          ),
        enabled: !queryClient.getQueryData(["Top rated movies"]),
      },
      {
        // Top rated tv
        queryKey: ["Top rated TV"],
        queryFn: () =>
          fetch(`${API_URL}/tv/top_rated?include_adult=false`, options).then((res) =>
            res.json()
          ),
        enabled: !queryClient.getQueryData(["Top rated TV"]),
      },
    ],
  });

  const prefetchHangingTrailer = (id: string) => usePrefetchQuery({
    queryKey: ['Movie', id],
    queryFn: () => 
      fetch(`${API_URL}/movie/${id}/videos?language=en-US`, options).then(res => res.json()),
  })
  const fetchHangingTrailer = useQuery({
    queryKey: ['Movie', currentMovieId],
    queryFn: () => 
      fetch(`${API_URL}/movie/${currentMovieId}/videos?language=en-US`, options).then(res => res.json()),
    enabled: isOpenTrailer
  })
  const openTrailer = (id: string) => {
    setCurrentMovieId(id)
    setIsOpenTrailer(true)
  }
  // Hàm tìm kiếm
  const searchQuery = useInfiniteQuery({
  queryKey: ['search', searchType, searchTerm],
  queryFn: async ({ pageParam = 1 }) => {
    const res = await fetch(
      `${API_URL}/search/${searchType}?query=${encodeURIComponent(
        searchTerm || ""
      )}&page=${pageParam}&include_adult=false`,
      options
    );
    return res.json();
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    if (lastPage.page < lastPage.total_pages) {
      return lastPage.page + 1;
    }
    return undefined;
  },
  enabled: !!searchTerm && !!searchType,
});

  const searchBaseOnLocation = (locationQuery: string) => {
    setSearchTerm(locationQuery)
    const el = document.getElementById("results")
      if (el) {
        const yOffset = -100
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset

        window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  const handleSearch = () => {
    setSearchTerm(keyword)
    const el = document.getElementById("results")
      if (el) {
        const yOffset = -100
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset

        window.scrollTo({ top: y, behavior: "smooth" })
    }
  };

  const useMovies = (type: string) => {
    return useInfiniteQuery({
      queryKey: [type],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetch(`${API_URL}/${type}/popular?page=${pageParam}&include_adult=false`, options)
        return res.json()
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1
        }
        return undefined
      },
      enabled: true
    })
  }


  // Promise từ các lần fetch trên 
  const trendingMovies = results[0];
  const trendingTV = results[1];
  const topratedMovies = results[2];
  const topratedTV = results[3];

  // Các dữ liệu truyền qua lại giữa các component
  const passingData: ContextType = {
    trendingMovies, trendingTV, 
    topratedMovies, topratedTV, fetchHangingTrailer,
    useMovies, hydrated, isOpenTrailer,
    searchQuery, searchType, searchTerm, keyword,
    handleSearch, openTrailer, searchBaseOnLocation,
    prefetchHangingTrailer, setIsOpenTrailer, setKeyword,
    setHydrated, setSearchType, setSearchTerm
  };

  return (
    <AppContext.Provider value={passingData}>
      {children}
    </AppContext.Provider>
  );
};

export const useData = (): ContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useData must be used within a Provider");
  }
  return context;
};

export default Provider;
