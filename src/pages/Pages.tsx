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
    searchQuery, searchType } = useData()
  useEffect(() => {
    resetMovies()
    resetTV()
  }, [])

  const key = `All ${type === 'movie' ? type : 'tv'}`

  const isSearching = searchQuery.data && searchType === type

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