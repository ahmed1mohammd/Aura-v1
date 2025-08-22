import * as React from "react"

// نقاط التوقف (Breakpoints) - مطابقة مع Tailwind CSS
const BREAKPOINTS = {
  MOBILE: 640,        // sm
  TABLET: 768,        // md
  LAPTOP: 1024,       // lg
  DESKTOP: 1280,      // xl
  LARGE_DESKTOP: 1536 // 2xl
}

// Hook للشاشات الصغيرة (Mobile)
export function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE - 1}px)`)
    const onChange = () => {
      setIsSmallScreen(window.innerWidth < BREAKPOINTS.MOBILE)
    }
    mql.addEventListener("change", onChange)
    setIsSmallScreen(window.innerWidth < BREAKPOINTS.MOBILE)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isSmallScreen
}

// Hook للشاشات المتوسطة (Tablet)
export function useIsMediumScreen() {
  const [isMediumScreen, setIsMediumScreen] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS.MOBILE}px) and (max-width: ${BREAKPOINTS.LAPTOP - 1}px)`)
    const onChange = () => {
      setIsMediumScreen(window.innerWidth >= BREAKPOINTS.MOBILE && window.innerWidth < BREAKPOINTS.LAPTOP)
    }
    mql.addEventListener("change", onChange)
    setIsMediumScreen(window.innerWidth >= BREAKPOINTS.MOBILE && window.innerWidth < BREAKPOINTS.LAPTOP)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isMediumScreen
}

// Hook للشاشات الكبيرة (Laptop & Desktop)
export function useIsLargeScreen() {
  const [isLargeScreen, setIsLargeScreen] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS.LAPTOP}px)`)
    const onChange = () => {
      setIsLargeScreen(window.innerWidth >= BREAKPOINTS.LAPTOP)
    }
    mql.addEventListener("change", onChange)
    setIsLargeScreen(window.innerWidth >= BREAKPOINTS.LAPTOP)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isLargeScreen
}

// Hook شامل لحجم الشاشة
export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState('mobile')

  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      
      if (width < BREAKPOINTS.MOBILE) {
        setScreenSize('mobile')           // < 640px
      } else if (width < BREAKPOINTS.TABLET) {
        setScreenSize('small-tablet')     // 640px - 767px
      } else if (width < BREAKPOINTS.LAPTOP) {
        setScreenSize('tablet')           // 768px - 1023px
      } else if (width < BREAKPOINTS.DESKTOP) {
        setScreenSize('laptop')           // 1024px - 1279px
      } else if (width < BREAKPOINTS.LARGE_DESKTOP) {
        setScreenSize('desktop')          // 1280px - 1535px
      } else {
        setScreenSize('large-desktop')    // >= 1536px
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  return screenSize
}

// Hook للتحقق من نوع معين من الشاشات
export function useScreenType() {
  const screenSize = useScreenSize()
  
  return {
    isMobile: screenSize === 'mobile',
    isSmallTablet: screenSize === 'small-tablet',
    isTablet: screenSize === 'tablet',
    isLaptop: screenSize === 'laptop',
    isDesktop: screenSize === 'desktop',
    isLargeDesktop: screenSize === 'large-desktop',
    isMobileOrTablet: ['mobile', 'small-tablet', 'tablet'].includes(screenSize),
    isDesktopOrLarger: ['laptop', 'desktop', 'large-desktop'].includes(screenSize)
  }
}

// Hook للحصول على عدد الأعمدة المطلوبة حسب حجم الشاشة
export function useGridColumns() {
  const screenSize = useScreenSize()
  
  const getColumns = () => {
    switch (screenSize) {
      case 'mobile':
        return 1
      case 'small-tablet':
      case 'tablet':
      case 'laptop':
      case 'desktop':
      case 'large-desktop':
        return 3
      default:
        return 1
    }
  }

  return getColumns()
}
