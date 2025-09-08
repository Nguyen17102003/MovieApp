import { createContext, useContext, useReducer, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { queryClient } from "./QueryClient";

const AppContext = createContext();

// Các giá trị mặc định lưu số trang đã render
const initialState = {
  allMoviesPage: 1,
  allTVPage: 1,
};

// Hàm reducer xử lý giá trị số trang
function reducer(state, action) {
  switch (action.type) {
    case "NEXT_MOVIE_PAGE":
      return { ...state, allMoviesPage: state.allMoviesPage + 1 };
    case "RESET_MOVIE_PAGE":
      return { ...state, allMoviesPage: 1 };
    case "NEXT_TV_PAGE":
      return { ...state, allTVPage: state.allTVPage + 1 };
    case "RESET_TV_PAGE":
      return { ...state, allTVPage: 1 };
    default:
      return state;
  }
}

// Provider cung cấp data cho các component 
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState); 
    const [searchTerm, setSearchTerm] = useState('') //  Chuỗi tìm kiếm được gửi đi
    const [searchType, setSearchType] = useState('movie') // Chuỗi người dùng nhập tạm thời trên thanh input
    const API_URL = import.meta.env.VITE_API_URL // API trang web
    const API_KEY = import.meta.env.VITE_API_KEY // API key
    // Các tham số phụ của khi thực hiện fetch
    const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
    }};

    // Thực hiện nhiều yêu cầu fetch cùng 1 lúc
    const results = useQueries({
        queries: [
            {
                // Trending Movie
                queryKey: ['Trending movies'],
                queryFn: () => fetch(`${API_URL}/trending/movie/day`, options)
                .then(res => res.json()),
                enabled: !queryClient.getQueryData(['Trending movies'])
            },
            {
                // Trending TV 
                queryKey: ['Trending TV'],
                queryFn: () => fetch(`${API_URL}/trending/tv/day`, options)
                .then(res => res.json()),
                enabled: !queryClient.getQueryData(['Trending TV'])
            },
            {
                // Top rated movie
                queryKey: ['Top rated movies'],
                queryFn: () => fetch(`${API_URL}/movie/top_rated`, options)
                .then(res => res.json()),
                enabled: !queryClient.getQueryData(['Top rated movies'])
            },
            {
                // Top rated tv
                queryKey: ['Top rated TV'],
                queryFn: () => fetch(`${API_URL}/tv/top_rated`, options)
                .then(res => res.json()),
                enabled: !queryClient.getQueryData(['Top rated TV'])
            },
            {
                // Toàn bộ movie ở trang 1 xếp theo độ nổi tiếng
                queryKey: ['All movies'],
                queryFn: () => fetch(`${API_URL}/movie/popular`, options)
                .then(res => res.json())
            },
            {
                // Toàn bộ tv series ở trang 1 xếp theo độ nổi tiếng
                queryKey: ['All TV Series'],
                queryFn: () => fetch(`${API_URL}/tv/popular`, options)
                .then(res => res.json())
            }
        ]
    })

    // Hàm tìm kiếm
    const searchQuery = useQuery({
    queryKey: ['search', searchType, searchTerm],
    queryFn: () => fetch(`${API_URL}/search/${searchType}?query=${encodeURIComponent(searchTerm)}`, options)
                  .then(res => res.json()),
    enabled: !!searchTerm, // Chỉ thực hiện search khi chuỗi người nhập tạm thời được cộng nhận gửi đi
    })

    const handleSearch = (keyword, type = 'movie') => {
      setSearchTerm(keyword) // Công nhận chuỗi người dùng nhập vào là chuỗi gửi đi
      setSearchType(type) // Tên thể loại (movie, tv)
    }

    // Hàm render các trang kế tiếp
    const loadMore = async (type, key) => {
    const page =
        type === "movie" ? state.allMoviesPage + 1 : state.allTVPage + 1;  
        // Nếu thể loại là movie thì số trang movie + 1, còn không số trang tv + 1

    const res = await fetch(`${API_URL}/${type}/popular?page=${page}`, options);
    const newData = await res.json();

    queryClient.setQueryData([key], (oldData) => {
      if (!oldData) return newData; // Nếu chưa có dữ liệu trong cache, gán dữ liệu mới
      return {
        ...newData, 
        results: [...oldData.results, ...newData.results], 
      }; // Thêm dữ liệu trang mới vào cache
    });

    // update reducer state
    if (type === "movie") {
      dispatch({ type: "NEXT_MOVIE_PAGE" }); // Xóa cache trang movie
    } else {
      dispatch({ type: "NEXT_TV_PAGE" }); // Xóa cache trang tv
    }};

    const resetMovies = () => {
        dispatch({ type: "RESET_MOVIE_PAGE" });
        queryClient.removeQueries(["All movies"]); // Xóa cache 
    };
    const resetTV = () => {
        dispatch({ type: "RESET_TV_PAGE" });
        queryClient.removeQueries(["All TV Series"]); // Xóa cache
    };


    // Promise từ các lần fetch trên 
    const trendingMovies = results[0] 
    const trendingTV = results[1]
    const topratedMovies = results[2]
    const topratedTV = results[3]
    const allMovies = results[4]
    const allTVSeries = results[5]

    // Các dữ liệu truyền qua lại giữa các component
    const passingData = {
        trendingMovies, trendingTV, 
        topratedMovies, topratedTV,
        allMovies, allTVSeries,
        loadMore, resetMovies, resetTV,
        handleSearch, searchQuery, searchType
    }

    return (
        <AppContext.Provider value={passingData}>
            {children}
        </AppContext.Provider>
    )
}

export const useData = () => useContext(AppContext)

export default Provider