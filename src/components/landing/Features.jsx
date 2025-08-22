import { CheckCircle, Palette, Heart, Zap, Award, Sparkles } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Palette className="w-10 h-10 text-black dark:text-white" />,
      title: "تصاميم فريدة",
      description: "كل تيشيرت مصمم بعناية فائقة ليعكس أحدث اتجاهات الموضة"
    },
    {
      icon: <Heart className="w-10 h-10 text-black dark:text-white" />,
      title: "أقمشة عالية الجودة",
      description: "نستخدم أفضل أنواع القطن والمواد الطبيعية لراحة قصوى"
    },
    {
      icon: <Zap className="w-10 h-10 text-black dark:text-white" />,
      title: "شحن سريع",
      description: "توصيل سريع وآمن لجميع أنحاء المملكة خلال 24-48 ساعة"
    },
    {
      icon: <Award className="w-10 h-10 text-black dark:text-white" />,
      title: "ضمان الجودة",
      description: "ضمان 100% على جميع منتجاتنا مع إمكانية الإرجاع"
    },
    {
      icon: <Sparkles className="w-10 h-10 text-black dark:text-white" />,
      title: "خدمة عملاء متميزة",
      description: "فريق دعم متاح على مدار الساعة لمساعدتك في أي استفسار"
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-black dark:text-white" />,
      title: "أسعار تنافسية",
      description: "أفضل الأسعار مع خصومات حصرية للعملاء الجدد"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 arabic-font">
            لماذا تختار
            <span>
              {' '}Aura-X{' '}
            </span>
            ؟
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto arabic-font">
            نقدم تجربة تسوق استثنائية مع أفضل المنتجات والخدمات
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center arabic-font">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed arabic-font">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-black dark:bg-white rounded-2xl p-10 text-white dark:text-black shadow-xl">
            <h3 className="text-3xl font-bold mb-4 arabic-font">جاهز لتجربة الفرق؟</h3>
            <p className="text-xl mb-8 opacity-90 arabic-font">
               انضم إلى آلاف العملاء الراضين واكتشف عالم Aura-X
            </p>
            <a href="/products" className="inline-block bg-white dark:bg-black text-black dark:text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform arabic-font">
              ابدأ التسوق الآن
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
