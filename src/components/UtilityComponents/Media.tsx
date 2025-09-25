import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { mediaProps } from "../../interface/interfaces"

const Media:React.FC<mediaProps> = ({src, title, className, type}) => {
  const [loaded, setLoaded] = useState(false)
  return (
     <div className={`relative ${className || ""}`}>
      {!loaded && <Skeleton height="100%" width="100%" />}
      {type === 'image' ? 
      (
        <img
        loading="lazy"
        src={src}
        alt={title}
        className={`${className || ""} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
      ) : (
        <iframe
        loading="lazy"
        src={src}
        title={title}
        className={`w-full h-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
      )}
      
    </div>
  )
}

export default Media