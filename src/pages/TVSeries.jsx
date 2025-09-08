import React, { useEffect } from 'react'
import Gradient from '../components/Gradient'
import List from '../components/List'
import { useData } from '../context/Context'
import { Outlet } from 'react-router-dom'

const TVSeries = () => {
  const { allTVSeries, loadMore, resetTV, searchQuery, searchType } = useData()

  useEffect(() => {
    resetTV()
  }, [])

  const isSearching = searchQuery.data && searchType === 'tv'

  const movies = isSearching
    ? searchQuery.data?.results || []
    : allTVSeries.data?.results || []

  return (
    <>
      <Gradient location={'TV Series'} />
      <List 
        movies={movies}
        fetchFn={() => loadMore("tv", "All TV Series")}
      />
      <Outlet />
    </>
  )
}

export default TVSeries
