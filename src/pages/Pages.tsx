import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Gradient from '../components/DetailComponents/Gradient'
import List from '../components/DetailComponents/List'
import { useData } from '../context/Context'
import { pagesProps } from '../interface/interfaces'

const Pages:React.FC<pagesProps> = ({location, type}) => {
  const { 
    allMovies, allTVSeries, 
    loadMore, resetMovies, resetTV,
    searchQuery, searchType, 
    setSearchType, searchTerm} = useData()
  useEffect(() => {
    setSearchType(type);
    resetMovies()
    resetTV()
  }, [])

  const isSearching = searchQuery.data && searchType === type

  const key = isSearching ? `search-${type}-${searchTerm}` : `All ${type === 'movie' ? type + 's' : 'TV Series'}`

  const movies = isSearching 
    ? searchQuery.data?.results || []
    : (type === 'movie' ? 
        (allMovies.data?.results || []) :
        (allTVSeries.data?.results || []))
  
  return (
    <>
      <Gradient location={location}/>
      <List
        type={type}
        movies={movies} 
        fetchFn={() => loadMore(type, key)}
      />
      <Outlet/>
    </>
  )
}

export default Pages