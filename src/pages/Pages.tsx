import { FC, lazy, Suspense, useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { useData } from '../context/Context'
import { pagesProps } from '../interface/interfaces'
import icons from '../../public/assets/icon'

const Gradient = lazy(() => import('../components/UtilityComponents/Gradient'))
const List = lazy(() => import('../components/DetailComponents/List'))

const Pages: FC<pagesProps> = ({ location, type }) => {
  const {
    useMovies,
    searchQuery,
    searchTerm,
    searchType,
    setSearchType,
    setHydrated,
  } = useData()

  // reset khi thay đổi location
  useEffect(() => {
    setSearchType(type)
    setHydrated(false)
  }, [location])

  // Query cho popular
  const moviesQuery = useMovies(type)

  // chọn query: search hay popular
  const activeQuery =
    searchTerm && searchType === type ? searchQuery : moviesQuery

  const movies = useMemo(() => {
    if (!activeQuery.data) return []
    return activeQuery.data.pages.flatMap((page: any) => page.results)
  }, [activeQuery.data])


  const isFetchingNextPage = activeQuery.isFetchingNextPage
  const isLoading = activeQuery.isLoading
  const hasNextPage = activeQuery.hasNextPage
  const fetchNextPage = activeQuery.fetchNextPage

  return (
    <div className="w-full">
      <Gradient location={location} />
      <div id="results">
        <List isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} type={type} movies={movies} />
      </div>

      {/* Load more */}
      {hasNextPage && (
        <div className="w-full bg-[#0f0f0f] flex items-center justify-center pt-8 pb-16">
          <button
            disabled={isFetchingNextPage}
            className="flex items-center gap-2 text-sm font-medium leading-5 rounded-full md:px-5 md:text-xl md:leading-7 text-white border-2 border-white hover:bg-white hover:text-gray-500"
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage && (
              <icons.spinner className="w-[1.25rem] h-[1.25rem]" />
            )}
            Watch more
          </button>
        </div>
      )}

      <Outlet />
    </div>
  )
}

export default Pages
