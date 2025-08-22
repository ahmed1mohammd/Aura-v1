import { useState, useEffect } from 'react'
import { Moon, Sun, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }

    // Get cart item count from localStorage
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const cartItems = JSON.parse(savedCart)
        setCartItemCount(cartItems.length)
      } else {
        setCartItemCount(0)
      }
    }

    updateCartCount()

    // Listen for changes in localStorage
    window.addEventListener('storage', updateCartCount)
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', updateCartCount)

    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white dark:bg-black border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Site Name */}
          <div className="flex items-center">
            <h1 
              className="text-3xl font-bold text-black dark:text-white cursor-pointer arabic-font"
              onClick={() => navigate('/')}
            >
              Aura-X
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/products">
              <Button variant="ghost" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                المنتجات
              </Button>
            </Link>
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-800">
                <ShoppingCart className="h-5 w-5 text-black dark:text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={isDark ? 'تبديل إلى الوضع الفاتح' : 'تبديل إلى الوضع الداكن'}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-black" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

