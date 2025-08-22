import * as React from "react"

const MOBILE_BREAKPOINT = 640
const TABLET_BREAKPOINT = 768
const LAPTOP_BREAKPOINT = 1024
const DESKTOP_BREAKPOINT = 1280
const LARGE_DESKTOP_BREAKPOINT = 1536

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${LAPTOP_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < LAPTOP_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < LAPTOP_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isTablet
}

export function useIsLaptop() {
  const [isLaptop, setIsLaptop] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LAPTOP_BREAKPOINT}px) and (max-width: ${DESKTOP_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsLaptop(window.innerWidth >= LAPTOP_BREAKPOINT && window.innerWidth < DESKTOP_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsLaptop(window.innerWidth >= LAPTOP_BREAKPOINT && window.innerWidth < DESKTOP_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isLaptop
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px) and (max-width: ${LARGE_DESKTOP_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT && window.innerWidth < LARGE_DESKTOP_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT && window.innerWidth < LARGE_DESKTOP_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isDesktop
}

export function useIsLargeDesktop() {
  const [isLargeDesktop, setIsLargeDesktop] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LARGE_DESKTOP_BREAKPOINT}px)`)
    const onChange = () => {
      setIsLargeDesktop(window.innerWidth >= LARGE_DESKTOP_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsLargeDesktop(window.innerWidth >= LARGE_DESKTOP_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isLargeDesktop
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState('mobile')

  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < MOBILE_BREAKPOINT) {
        setScreenSize('mobile')
      } else if (width < TABLET_BREAKPOINT) {
        setScreenSize('small-tablet')
      } else if (width < LAPTOP_BREAKPOINT) {
        setScreenSize('tablet')
      } else if (width < DESKTOP_BREAKPOINT) {
        setScreenSize('laptop')
      } else if (width < LARGE_DESKTOP_BREAKPOINT) {
        setScreenSize('desktop')
      } else {
        setScreenSize('large-desktop')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  return screenSize
}
