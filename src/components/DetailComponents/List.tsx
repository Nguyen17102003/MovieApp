import React, {useRef, useEffect, useState} from 'react'
import { listProps } from '../../interface/interfaces'
import SliderItem from '../../components/UtilityComponents/SliderItem'

const List:React.FC<listProps> = ({movies, type, fetchFn}) => {

  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLDivElement;
            const movieId = target.dataset.movieId as string;
            setVisibleItems((prev) => [...new Set([...prev, movieId])]);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.5,
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [movies]);

  return (
    <div className='w-full flex items-center justify-center flex-col bg-black pb-10 gap-10 2xl:gap-[10vh] 2xl:pb-[10vh]'>
      <div className='bg-black grid xl:grid-cols-6 lg:grid-cols-4 grid-cols-2 gap-x-5 2xl:gap-x-10 gap-y-15 px-8 2xl:px-[3vw] pb-5'>
        {movies?.length > 0 ? (
          movies.map((movie, i) => (
            <div
              id={i.toString()}
              key={movie.id}
              data-movie-id={movie.id}
              ref={(el: HTMLDivElement | null) => {
                if (el) itemRefs.current.set(movie.id.toString(), el);
              }}
            >
              {visibleItems.includes(movie.id.toString()) ? (
                <SliderItem type={type} movie={movie} />
              ) : (
                <div className="w-full h-64 bg-gray-800 animate-pulse" />
              )}
            </div>
          ))
        ) : (
          <h1 className="xl:text-3xl py-10 px-10">Loading...</h1>
        )}
      </div>
      <button 
      className='w-fit xl:text-xl 2xl:text-[3vh] text-white bg-black border-white border-2 rounded-full px-10 py-1 font-semibold flex items-center justify-center hover:bg-white hover:text-gray-500'
      onClick={fetchFn}
      >
        Watch more
      </button>
    </div>
  )
}

export default List