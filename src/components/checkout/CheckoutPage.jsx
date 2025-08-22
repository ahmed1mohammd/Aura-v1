import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CreditCard, Truck, CheckCircle, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { motion } from 'framer-motion'

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [governorates, setGovernorates] = useState([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    governorate: '',
    city: '',
    address: '',
    paymentMethod: 'cash'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

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

  // TODO: fetch governorates data from API here
  useEffect(() => {
    const fetchGovernorates = async () => {
      try {
        // Simulate API call - replace with actual API endpoint
        // const response = await fetch('/api/governorates')
        // const data = await response.json()
        // setGovernorates(data)
        
        // Temporary: using static data until API is ready
        const { governorates: staticGovernorates } = await import('../../data/products')
        setGovernorates(staticGovernorates)
      } catch (err) {
        console.error('Error fetching governorates:', err)
      }
    }

    fetchGovernorates()
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: send order data to API (paymentType: "cash" or "visa")
      const orderData = {
        ...formData,
        cartItems,
        subtotal: calculateSubtotal(),
        shipping: calculateShipping(),
        total: calculateTotal(),
        paymentType: formData.paymentMethod === 'card' ? 'visa' : 'cash',
        orderDate: new Date().toISOString()
      }

      // Simulate API call - replace with actual API endpoint
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(orderData)
      // })
      
      // if (!response.ok) {
      //   throw new Error('فشل في إرسال الطلب')
      // }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // مسح السلة
      localStorage.removeItem('cart')
      setCartItems([])
      setIsSubmitting(false)
      setOrderSuccess(true)
      
      // Dispatch custom event to update cart count in navbar
      window.dispatchEvent(new Event('cartUpdated'))
    } catch (error) {
      console.error('Error submitting order:', error)
      setIsSubmitting(false)
      // Handle error - show error message to user
    }
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

  if (cartItems.length === 0 && !orderSuccess) {
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
              لا توجد منتجات في السلة
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto arabic-font">
              يجب عليك إضافة منتجات إلى السلة قبل إتمام الطلب. يمكنك تصفح منتجاتنا واختيار ما يناسبك.
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

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-28 h-28 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-full mx-auto mb-8 flex items-center justify-center shadow-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle className="w-14 h-14 text-green-500 dark:text-green-400" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 arabic-font">
              تم إرسال طلبك بنجاح!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto arabic-font">
              شكراً لك! سنقوم بالتواصل معك قريباً لتأكيد الطلب وتحديد طريقة الدفع والتوصيل
            </p>
            <div className="space-y-4">
              <Link to="/products">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg">
                    متابعة التسوق
                  </Button>
                </motion.div>
              </Link>
            </div>
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
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/cart" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
            <ArrowLeft className="w-5 h-5 ml-2" />
            <span className="arabic-font font-medium">العودة للسلة</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white arabic-font">
            إتمام الطلب
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-black dark:text-white mb-6 arabic-font">
                معلومات العميل
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-black dark:text-white arabic-font">
                      الاسم الأول *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      className="mt-2"
                      placeholder="أدخل اسمك الأول"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-black dark:text-white arabic-font">
                      اسم العائلة *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      className="mt-2"
                      placeholder="أدخل اسم العائلة"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-black dark:text-white arabic-font">
                      رقم الهاتف *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="mt-2"
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-black dark:text-white arabic-font">
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="governorate" className="text-black dark:text-white arabic-font">
                      المحافظة *
                    </Label>
                    <Select
                      value={formData.governorate}
                      onValueChange={(value) => handleInputChange('governorate', value)}
                      required
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="اختر المحافظة" />
                      </SelectTrigger>
                      <SelectContent>
                        {governorates.map((gov) => (
                          <SelectItem key={gov.id} value={gov.id}>
                            {gov.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-black dark:text-white arabic-font">
                      المدينة *
                    </Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => handleInputChange('city', value)}
                      required
                      disabled={!formData.governorate}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="اختر المدينة" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.governorate && governorates
                          .find(gov => gov.id === formData.governorate)
                          ?.cities.map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-black dark:text-white arabic-font">
                    العنوان التفصيلي *
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                    className="mt-2"
                    placeholder="أدخل العنوان التفصيلي"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="text-black dark:text-white arabic-font">
                    طريقة الدفع *
                  </Label>
                  <div className="mt-3 space-y-3">
                    <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="w-4 h-4 text-black dark:text-white border-gray-300 dark:border-gray-600"
                      />
                      <span className="text-black dark:text-white arabic-font">الدفع عند الاستلام</span>
                    </label>
                    <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="w-4 h-4 text-black dark:text-white border-gray-300 dark:border-gray-600"
                      />
                      <span className="text-black dark:text-white arabic-font">بطاقة ائتمان</span>
                    </label>
                  </div>
                </div>

                {/* Credit Card Form - Only show when card is selected */}
                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-black dark:text-white arabic-font">
                      معلومات البطاقة
                    </h4>
                    
                    <div>
                      <Label htmlFor="cardNumber" className="text-black dark:text-white arabic-font">
                        رقم البطاقة *
                      </Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="mt-2"
                        required={formData.paymentMethod === 'card'}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryMonth" className="text-black dark:text-white arabic-font">
                          الشهر *
                        </Label>
                        <Select required={formData.paymentMethod === 'card'}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="الشهر" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="expiryYear" className="text-black dark:text-white arabic-font">
                          السنة *
                        </Label>
                        <Select required={formData.paymentMethod === 'card'}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="السنة" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = new Date().getFullYear() + i
                              return (
                                <SelectItem key={year} value={String(year)}>
                                  {year}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardName" className="text-black dark:text-white arabic-font">
                          اسم حامل البطاقة *
                        </Label>
                        <Input
                          id="cardName"
                          type="text"
                          placeholder="اسم حامل البطاقة"
                          className="mt-2"
                          required={formData.paymentMethod === 'card'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-black dark:text-white arabic-font">
                          CVV *
                        </Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          maxLength="4"
                          className="mt-2"
                          required={formData.paymentMethod === 'card'}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 py-3 text-lg font-medium disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin ml-2"></div>
                      جاري الإرسال...
                    </>
                  ) : (
                    'إرسال الطلب'
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-black dark:text-white mb-6 arabic-font">
                ملخص الطلب
              </h2>

              {/* Fast delivery notice */}
              <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black dark:text-white ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-black dark:text-white text-sm arabic-font">
                        {item.name}
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.size} • {item.color} • {item.quantity} قطعة
                      </div>
                    </div>
                    <div className="text-sm font-bold text-black dark:text-white">
                      {(item.price * item.quantity)} ج.م
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="arabic-font">المجموع الفرعي:</span>
                  <span>{calculateSubtotal()} ج.م</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="arabic-font">الشحن:</span>
                  <span>{calculateShipping()} ج.م</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold text-black dark:text-white">
                    <span className="arabic-font">الإجمالي:</span>
                    <span>{calculateTotal()} ج.م</span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-black dark:text-white mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 arabic-font">
                      معلومات التوصيل
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 arabic-font">
                      سيتم التواصل معك لتأكيد الطلب وتحديد طريقة الدفع والتوصيل
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CheckoutPage
