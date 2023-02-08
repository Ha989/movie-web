
import { useState, useEffect } from 'react'

export default function useCurrentViewPortWidth() {
   const [width, setWidth] = useState(window.innerWidth);

   useEffect(() => {
    window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
    });
    return () => 
        window.removeEventListener("resize", () => {
            setWidth(window.innerWidth);
        });
   }, [])

  return { width, isMobile: width < 800 };
};
