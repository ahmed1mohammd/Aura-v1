import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'

const OrderForm = ({ product, selectedSize, selectedColor, quantity, onClose }) => {
  const [formData, setFormData] = useState({
    phone: '',
    governorate: '',
    city: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [governorates, setGovernorates] = useState([])

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

  const selectedGovernorate = governorates.find(g => g.id === formData.governorate)
  const availableCities = selectedGovernorate ? selectedGovernorate.cities : []

  const validateForm = () => {
    const newErrors = {}

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب'
    } else if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone.trim())) {
      newErrors.phone = 'رقم الهاتف غير صحيح (يجب أن يبدأ بـ 010، 011، 012، أو 015)'
    }

    // Governorate validation
    if (!formData.governorate) {
      newErrors.governorate = 'المحافظة مطلوبة'
    }

    // City validation
    if (!formData.city) {
      newErrors.city = 'المدينة مطلوبة'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset city when governorate changes
      ...(field === 'governorate' && { city: '' })
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: send order data to API here
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the order to your backend
      const orderData = {
        product: product.name,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        totalPrice: product.price * quantity,
        customer: formData
      }

      console.log('Order submitted:', orderData)
      
      alert(`تم إرسال طلبك بنجاح!\n\nتفاصيل الطلب:\nالمنتج: ${product.name}\nالسعر الإجمالي: ${(product.price * quantity).toLocaleString()} جنيه مصري\n\nسيتم التواصل معك قريباً على رقم: ${formData.phone}`)
      
      onClose()
    } catch (error) {
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getGovernorateLabel = (govId) => {
    return governorates.find(g => g.id === govId)?.name || ''
  }

  const getCityLabel = (cityId) => {
    return availableCities.find(c => c.id === cityId)?.name || ''
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black dark:text-white arabic-font">
              إتمام الطلب
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="إغلاق"
            >
              ✕
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-black dark:text-white mb-2 arabic-font">ملخص الطلب</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">المنتج:</span>
                <span className="text-black dark:text-white">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">المقاس:</span>
                <span className="text-black dark:text-white">{selectedSize?.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">اللون:</span>
                <span className="text-black dark:text-white">{selectedColor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">الكمية:</span>
                <span className="text-black dark:text-white">{quantity}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                <span className="text-black dark:text-white">الإجمالي:</span>
                <span className="text-black dark:text-white currency-egp">{(product.price * quantity).toLocaleString()} جنيه مصري</span>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2 arabic-font">
                رقم الهاتف *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="01xxxxxxxxx"
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white ${
                  errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                }`}
                dir="ltr"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 arabic-font">{errors.phone}</p>
              )}
            </div>

            {/* Governorate */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2 arabic-font">
                المحافظة *
              </label>
              <select
                value={formData.governorate}
                onChange={(e) => handleInputChange('governorate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white ${
                  errors.governorate ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <option value="">اختر المحافظة</option>
                {governorates.map((gov) => (
                  <option key={gov.id} value={gov.id}>
                    {gov.name}
                  </option>
                ))}
              </select>
              {errors.governorate && (
                <p className="text-red-500 text-sm mt-1 arabic-font">{errors.governorate}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2 arabic-font">
                المدينة *
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                disabled={!formData.governorate}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.city ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <option value="">
                  {formData.governorate ? 'اختر المدينة' : 'اختر المحافظة أولاً'}
                </option>
                {availableCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="text-red-500 text-sm mt-1 arabic-font">{errors.city}</p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-3"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الطلب'}
              </Button>
            </div>
          </form>

          {/* Note */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center arabic-font">
            * سيتم التواصل معك لتأكيد الطلب وتحديد طريقة الدفع والتوصيل
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderForm

