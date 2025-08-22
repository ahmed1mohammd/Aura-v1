import { Button } from '@/components/ui/button.jsx'
import { ArrowRight, Star, Users, Truck, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700"></div>
      
      {/* Floating Elements - Black and white only */}
      <div className="absolute top-16 left-16 w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
      <div className="absolute top-32 right-16 w-48 h-48 bg-gray-300 dark:bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-4 left-32 w-48 h-48 bg-gray-400 dark:bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium mb-4 shadow-lg">
            <Star className="w-3 h-3 ml-2 fill-current" />
            <span className="arabic-font">جودة عالية مع ضمان الجودة</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4 leading-tight arabic-font">
            اكتشف
            <span>
              {' '}Aura-X{' '}
            </span>
            <br />
            <span className="text-3xl md:text-5xl">مجموعة الملابس المميزة</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto leading-relaxed arabic-font">
            تصميمات عصرية، أقمشة فاخرة، وألوان مذهلة. 
            <br />
            اختر من مجموعتنا الواسعة من التيشرتات المميزة
          </p>
          
          {/* CTA Button - Single Container */}
          <div className="flex justify-center items-center mb-8">
            <Link to="/products">
              <Button size="lg" className="text-base px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <span className="arabic-font">تسوق الآن</span>
                <ArrowRight className="mr-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          {/* Stats - Black and white only */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Users className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-1">+10,000</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 arabic-font">عميل راضي</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Truck className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-1 arabic-font">شحن مجاني</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 arabic-font">لجميع الطلبات</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Shield className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-1 arabic-font">ضمان 100%</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 arabic-font">جودة المنتج</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
