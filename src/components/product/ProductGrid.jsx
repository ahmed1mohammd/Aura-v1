import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { Button } from '@/components/ui/button.jsx'
import { Search, Filter } from 'lucide-react'
import { useGridColumns } from '../../hooks/use-screen-sizes'

const ProductGrid = () => {
  const [filter, setFilter] = useState('all') // all, men, women
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const gridColumns = useGridColumns()

  // TODO: fetch products data from API here
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Simulate API call - replace with actual API endpoint
        // const response = await fetch('/api/products')
        // const data = await response.json()
        // setProducts(data)
        
        // Temporary: using static data until API is ready
        const { products: staticProducts } = await import('../../data/products')
        setProducts(staticProducts)
        setLoading(false)
      } catch (err) {
        setError('فشل في تحميل المنتجات')
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === 'all' || product.category === filter
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  // تحديد عدد الأعمدة حسب حجم الشاشة
  const getGridCols = () => {
    if (gridColumns === 1) return 'grid-cols-1'
    if (gridColumns === 3) return 'grid-cols-3'
    return 'grid-cols-3' // افتراضي
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 dark:border-t-purple-500 rounded-full animate-spin mx-auto mb-4 shadow-md"></div>
          <p className="text-gray-600 dark:text-gray-400 arabic-font text-lg">جاري تحميل المنتجات...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl text-red-500">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-black dark:text-white mb-3 arabic-font">
            حدث خطأ
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto arabic-font text-sm">
            {error}
          </p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-2 text-sm"
          >
            إعادة المحاولة
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section - Black and white only */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 arabic-font">
            مجموعتنا المميزة
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed arabic-font">
            اكتشف أحدث تصميمات التيشرتات عالية الجودة للرجال والنساء
            <br />
            ألوان مذهلة، أقمشة فاخرة، وتصاميم عصرية
          </p>
        </div>

        {/* Search Bar - Black and white only */}
        <div className="max-w-sm mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2.5 px-4 pr-10 rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 arabic-font text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
          </div>
        </div>

        {/* Filter Buttons - Black and white only */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                filter === 'all' 
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              جميع المنتجات
            </Button>
            <Button
              variant={filter === 'men' ? 'default' : 'ghost'}
              onClick={() => setFilter('men')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                filter === 'men' 
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              رجالي
            </Button>
            <Button
              variant={filter === 'women' ? 'default' : 'ghost'}
              onClick={() => setFilter('women')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                filter === 'women' 
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              حريمي
            </Button>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-500 dark:text-gray-400 text-center text-base arabic-font">
            عرض {filteredProducts.length} منتج
            {filter === 'men' && ' رجالي'}
            {filter === 'women' && ' حريمي'}
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid ${getGridCols()} gap-6 mb-12`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl text-gray-400 dark:text-gray-500">👕</span>
            </div>
            <h3 className="text-xl font-bold text-black dark:text-white mb-3 arabic-font">
              لا توجد منتجات متاحة
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto arabic-font text-sm">
              لا توجد منتجات متاحة في هذه الفئة حالياً. 
              جرب تصفية مختلف أو عد لاحقاً
            </p>
            <Button 
              onClick={() => setFilter('all')}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-2 text-sm"
            >
              عرض جميع المنتجات
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 arabic-font">
              لم تجد ما تبحث عنه؟
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-base max-w-xl mx-auto arabic-font">
              نحن هنا لمساعدتك في العثور على المنتج المثالي. 
              تواصل معنا وسنقدم لك النصائح والتوصيات المناسبة
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-3 text-base"
              >
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductGrid

