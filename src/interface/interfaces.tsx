export interface movie {
  backdrop_path: string,
  title: string,
  overview: string,
  poster_path: string,
  id: string,
  name: string
}

export interface genre {
    id: string,
    name: string
}

export interface detail {
    backdrop_path: string, 
    poster_path: string, 
    title: string, 
    name: string, 
    genres: genre[], 
    overview : string, 
}

export interface cast {
    profile_path: string,
    name: string
}


export interface bannerProps {
    movie: movie,
    isActive: boolean
}

export interface detailBannerProps {
    movie: detail,
    casts: cast[],
    isLoading: boolean
}

export interface gradientProps {
    location: string,
}

export interface listProps {
    type: string,
    movies: movie[],
    fetchFn: React.MouseEventHandler<HTMLButtonElement>
}

export interface sliderProps {
    title: string,
    type: string | undefined,
    movies: movie[],
    isLoading: boolean
}

export interface sliderItemProps {
    movie: movie,
    type: string | undefined
}

export interface videoProps {
    id: string,
    name: string,
    videoKey: string
}

export interface pagesProps {
    location: string,
    type: string
}