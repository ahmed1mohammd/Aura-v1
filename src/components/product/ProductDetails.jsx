import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { motion } from 'framer-motion'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [product, setProduct] = useState(null)
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('m')
  const [selectedColor, setSelectedColor] = useState('white')
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  // TODO: fetch single product details from API by ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        // Simulate API call - replace with actual API endpoint
        // const response = await fetch(`/api/products/${id}`)
        // const productData = await response.json()
        // setProduct(productData)
        
        // Temporary: using static data until API is ready
        const { products, colors: staticColors, sizes: staticSizes } = await import('../../data/products')
        const foundProduct = products.find(p => p.id === parseInt(id))
        
        if (foundProduct) {
          setProduct(foundProduct)
          setColors(staticColors)
          setSizes(staticSizes)
          setSelectedSize(foundProduct.defaultSize || 'm')
          setSelectedColor(foundProduct.defaultColor || 'white')
        } else {
          setError('المنتج غير موجود')
        }
        setLoading(false)
      } catch (err) {
        setError('فشل في تحميل تفاصيل المنتج')
        setLoading(false)
      }
    }

    if (id) {
      fetchProductDetails()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 dark:border-t-purple-500 rounded-full animate-spin mx-auto mb-4 shadow-md"></div>
          <p className="text-gray-600 dark:text-gray-400 arabic-font text-lg">جاري تحميل تفاصيل المنتج...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4 arabic-font">
            {error || 'المنتج غير موجود'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 arabic-font">
            عذراً، لم نتمكن من العثور على المنتج المطلوب
          </p>
          <Link to="/">
            <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للمنتجات
            </Button>
          </Link>
        </div>
      </div>
    )
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

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1)
  }

  const addToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    }
    
    // Get existing cart items from localStorage
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    
    // Check if item already exists in cart
    const existingItemIndex = existingCartItems.findIndex(
      item => item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color
    )
    
    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      existingCartItems[existingItemIndex].quantity += cartItem.quantity
    } else {
      // Add new item if it doesn't exist
      existingCartItems.push(cartItem)
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems))
    
    // Navigate to cart page
    navigate('/cart')
  }
  
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <motion.div 
          className="flex items-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white arabic-font">
            الرئيسية
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white arabic-font">
            المنتجات
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-black dark:text-white arabic-font">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md aspect-square relative">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Like button */}
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
              
              {/* Share button */}
              <button 
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
              >
                <Share2 className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            {/* Thumbnail images */}
            <div className="flex mt-4 space-x-2 rtl:space-x-reverse justify-center">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                    currentImageIndex === index 
                      ? 'border-blue-500 dark:border-purple-500' 
                      : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              {/* Category */}
              <div className="mb-2">
                <span className="text-sm text-blue-600 dark:text-purple-400 font-medium arabic-font">
                  {product.category}
                </span>
              </div>
              
              {/* Product name */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 arabic-font">
                {product.name}
              </h1>
              
              {/* Price */}
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-white ml-2">
                  {product.price.toLocaleString()} جنيه مصري
                </span>
                
                {product.discount && (
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                    {Math.round(product.price / (1 - product.discount / 100)).toLocaleString()} جنيه مصري
                  </span>
                )}
                
                {product.discount && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    خصم {product.discount}%
                  </span>
                )}
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < product.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300 dark:text-gray-600'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                  ({product.reviews} تقييم)
                </span>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 arabic-font">
                {product.description}
              </p>
              
              {/* Size selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 arabic-font">
                  اختر المقاس
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <motion.div
                      key={size.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        type="button"
                        className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium uppercase ${
                          selectedSize === size.id
                            ? 'bg-black dark:bg-white text-white dark:text-black'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => setSelectedSize(size.id)}
                      >
                        {size.name}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Color selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 arabic-font">
                  اختر اللون
                </h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <motion.div
                      key={color.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        type="button"
                        className={`w-8 h-8 rounded-full ${
                          selectedColor === color.id ? 'ring-2 ring-offset-2 ring-black dark:ring-white' : ''
                        }`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(color.id)}
                        aria-label={color.name}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 arabic-font">
                  الكمية
                </h3>
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-l-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    onClick={decrementQuantity}
                  >
                    -
                  </motion.button>
                  <div className="w-14 h-10 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-900 dark:text-white">
                    {quantity}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-r-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    onClick={incrementQuantity}
                  >
                    +
                  </motion.button>
                </div>
              </div>
              
              {/* Fast delivery notice */}
              <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-800/20">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-purple-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white arabic-font">
                      توصيل سريع
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 arabic-font">
                      يصلك خلال 3-5 أيام عمل
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Add to cart button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={addToCart}
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 py-3 text-lg font-medium rounded-xl shadow-lg flex items-center justify-center"
                >
                  <ShoppingCart className="ml-2 h-5 w-5" />
                  <span className="arabic-font">أضف إلى السلة</span>
                </Button>
              </motion.div>
              
              {/* Back to products */}
              <div className="mt-4 text-center">
                <Link to="/products" className="text-blue-600 dark:text-purple-400 hover:underline text-sm arabic-font">
                  العودة إلى المنتجات
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductDetails

