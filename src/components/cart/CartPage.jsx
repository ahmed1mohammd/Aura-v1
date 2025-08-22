import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { motion } from 'framer-motion'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: fetch cart data from API here
    const fetchCartData = async () => {
      try {
        setLoading(true)
        // Simulate API call - replace with actual API endpoint
        // const response = await fetch('/api/cart')
        // const data = await response.json()
        // setCartItems(data)
        
        // Temporary: using localStorage until API is ready
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          setCartItems(JSON.parse(savedCart))
        }
        setLoading(false)
      } catch (err) {
        console.error('Error fetching cart data:', err)
        setLoading(false)
      }
    }

    fetchCartData()
  }, [])

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return
    
    const updatedCart = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateShipping = () => {
    return cartItems.length > 0 ? 50 : 0
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 dark:border-t-purple-500 rounded-full animate-spin mx-auto mb-4 shadow-md"></div>
          <p className="text-gray-600 dark:text-gray-400 arabic-font text-lg">جاري التحميل...</p>
        </motion.div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-28 h-28 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full mx-auto mb-8 flex items-center justify-center shadow-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ShoppingCart className="w-14 h-14 text-blue-500 dark:text-purple-400" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 arabic-font">
              سلة التسوق فارغة
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto arabic-font">
              لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. يمكنك تصفح منتجاتنا واختيار ما يناسبك.
            </p>
            <Link to="/products">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg">
                  تصفح المنتجات
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/products" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
            <ArrowLeft className="w-5 h-5 ml-2" />
            <span className="arabic-font font-medium">العودة للتسوق</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white arabic-font">
            سلة التسوق <span className="text-blue-600 dark:text-purple-400">({cartItems.length})</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 arabic-font">
                المنتجات ({cartItems.length})
              </h2>
              
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-white dark:bg-gray-600 flex-shrink-0 shadow-sm">
                      <motion.img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 arabic-font">
                        {item.name}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <span className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-md">المقاس: {item.size}</span>
                        <span className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-md">اللون: {item.color}</span>
                      </div>
                      <div className="text-lg font-bold text-black dark:text-white mt-2">
                        {item.price.toLocaleString()} جنيه مصري
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                        whileTap={{ scale: 0.9 }}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <motion.button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 arabic-font">
                ملخص الطلب
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="arabic-font">المجموع الفرعي:</span>
                  <span className="font-medium">{calculateSubtotal().toLocaleString()} جنيه مصري</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="arabic-font">الشحن:</span>
                  <span className="font-medium">{calculateShipping().toLocaleString()} جنيه مصري</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span className="arabic-font">الإجمالي:</span>
                    <span className="text-blue-600 dark:text-purple-400">{calculateTotal().toLocaleString()} جنيه مصري</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="block">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-medium rounded-xl shadow-lg">
                    إتمام الطلب
                  </Button>
                </motion.div>
              </Link>

              <div className="mt-4 text-center">
                <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 text-sm arabic-font transition-colors">
                  متابعة التسوق
                </Link>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 arabic-font">
                <p>الشحن السريع متاح لجميع الطلبات</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default CartPage
