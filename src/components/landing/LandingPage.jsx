import Hero from './Hero'
import Features from './Features'
import ProductGrid from '../product/ProductGrid'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 arabic-font">
              منتجاتنا المميزة
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto arabic-font">
              اكتشف أحدث مجموعاتنا من التيشرتات المميزة
            </p>
          </div>
          
          <ProductGrid />
        </div>
      </section>
    </div>
  )
}

export default LandingPage
