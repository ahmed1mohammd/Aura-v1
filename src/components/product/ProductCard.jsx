import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { motion } from 'framer-motion'

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])

  // TODO: fetch sizes and colors data from API here
  useEffect(() => {
    const fetchSizesAndColors = async () => {
      try {
        // Simulate API call - replace with actual API endpoint
        // const [sizesResponse, colorsResponse] = await Promise.all([
        //   fetch('/api/sizes'),
        //   fetch('/api/colors')
        // ])
        // const sizesData = await sizesResponse.json()
        // const colorsData = await colorsResponse.json()
        // setSizes(sizesData)
        // setColors(colorsData)
        
        // Temporary: using static data until API is ready
        const { sizes: staticSizes, colors: staticColors } = await import('../../data/products')
        setSizes(staticSizes)
        setColors(staticColors)
      } catch (err) {
        console.error('Error fetching sizes and colors:', err)
      }
    }

    fetchSizesAndColors()
  }, [])

  const handleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Get default size and color
    const defaultSize = product.defaultSize || product.availableSizes[0]
    const defaultColor = product.defaultColor || product.availableColors[0]
    
    // Create cart item
    const cartItem = {
      id: `${product.id}-${defaultSize}-${defaultColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: defaultSize.toUpperCase(),
      color: defaultColor,
      quantity: 1
    }
    
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('cart')
    let cart = existingCart ? JSON.parse(existingCart) : []
    
    // Check if item already exists
    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id)
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += 1
    } else {
      // Add new item
      cart.push(cartItem)
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'))
    
    // Product added silently without alert
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const getSizeLabel = (sizeId) => {
    const size = sizes.find(s => s.id === sizeId)
    return size ? size.label : sizeId
  }

  const getColorName = (colorId) => {
    const color = colors.find(c => c.id === colorId)
    return color ? color.name : colorId
  }

  return (
    <div 
      className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container with Slider */}
        <motion.div 
          className="relative aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Image Navigation - Smaller */}
          {product.images.length > 1 && (
            <>
              <motion.button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute top-1/2 right-2 w-6 h-6 bg-white/80 dark:bg-black/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black transition-all duration-300 opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-3 h-3 text-black dark:text-white" />
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute top-1/2 left-2 w-6 h-6 bg-white/80 dark:bg-black/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black transition-all duration-300 opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-3 h-3 text-black dark:text-white" />
              </motion.button>
              
              {/* Image Indicators - Smaller */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white dark:bg-black' 
                        : 'bg-white/50 dark:bg-black/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    animate={index === currentImageIndex ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
            </>
          )}

          {/* NEW Badge - Black and white only */}
          <motion.div 
            className="absolute top-3 left-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
              جديد
            </span>
          </motion.div>

          {/* Like Button - Black and white only */}
          <motion.button
            onClick={handleLike}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 dark:bg-black/90 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-black'
            } shadow-sm`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Quick Actions Overlay */}
          <motion.div 
            className={`absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={handleAddToCart}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-4 py-2 rounded-full font-medium shadow-lg transition-all duration-300 text-sm"
              >
                <ShoppingCart className="w-4 h-4 ml-2" />
                أضف للسلة
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          className="p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide arabic-font">
              {product.category === 'men' ? 'رجالي' : 'حريمي'}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-lg text-black dark:text-white mb-2 line-clamp-2 leading-tight arabic-font">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-black dark:text-white currency-egp">
              {product.price.toLocaleString()} جنيه مصري
            </span>
          </div>

          {/* Available Sizes */}
          <div className="mb-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1.5 arabic-font">المقاسات المتاحة:</p>
            <div className="flex flex-wrap gap-1.5">
              {product.availableSizes.map((sizeId) => {
                const size = sizes.find(s => s.id === sizeId)
                return size ? (
                  <motion.span 
                    key={sizeId}
                    className="px-2 py-0.5 text-xs border border-gray-200 dark:border-gray-600 rounded-full text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors cursor-pointer arabic-font"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size.name}
                  </motion.span>
                ) : null
              })}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1.5 arabic-font">الألوان المتاحة:</p>
            <div className="flex gap-1.5">
              {product.availableColors.map((colorId) => {
                const color = colors.find(c => c.id === colorId)
                return color ? (
                  <motion.div
                    key={colorId}
                    className="w-5 h-5 rounded-full border-2 border-gray-200 dark:border-gray-600 cursor-pointer hover:border-black dark:hover:border-white transition-colors shadow-sm"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ) : null
              })}
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 py-2 rounded-lg font-medium shadow-md transition-colors duration-300 text-sm"
            >
              <ShoppingCart className="w-4 h-4 ml-2" />
              أضف للسلة
            </Button>
          </motion.div>
        </motion.div>
      </Link>
    </div>
  )
}

export default ProductCard

