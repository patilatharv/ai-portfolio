import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(null)
  const pathname = usePathname()              

  useEffect(() => {
    if (pathname !== '/about') {              
      setActiveSection(null)                  
      return                                  
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds, pathname])    

  return activeSection
}