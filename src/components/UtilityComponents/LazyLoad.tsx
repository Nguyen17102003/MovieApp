import { FC, ReactNode, Suspense, useEffect, useRef, useState } from "react"

interface LazyLoadProps {
  children: ReactNode
  fallback?: ReactNode
}

const LazyLoad: FC<LazyLoadProps> = ({ children, fallback = null }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {isVisible ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  )
}

export default LazyLoad
