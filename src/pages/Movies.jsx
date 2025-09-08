import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Gradient from '../components/Gradient'
import List from '../components/List'
import { useData } from '../context/Context'

const Movies = () => {
  const { allMovies, loadMore, resetMovies, searchQuery, searchType } = useData()
  useEffect(() => {
    resetMovies()
  }, [])
  const isSearching = searchQuery.data && searchType === 'movie'

  const movies = isSearching
    ? searchQuery.data?.results || []
    : allMovies.data?.results || []

  return (
    <>
      <Gradient location={'Movies'}/>
      <List
        movies={movies} 
        fetchFn={() => loadMore("movie", "All movies")}
      />
      <Outlet/>
    </>
  )
}

export default Movies