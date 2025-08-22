// بيانات المنتجات الافتراضية
import menWhiteTshirt1 from '../assets/products/men-white-tshirt-1.jpeg'
import menWhiteTshirt2 from '../assets/products/men-white-tshirt-2.jpeg'
import menGreenTshirt from '../assets/products/men-green-tshirt.jpg'
import menBlueTshirt from '../assets/products/men-blue-tshirt.jpg'
import womenWhiteTshirt from '../assets/products/women-white-tshirt.jpg'
import womenPinkTshirt from '../assets/products/women-pink-tshirt.jpeg'
import womenMulticolorTshirt from '../assets/products/women-multicolor-tshirt.jpg'
import womenBlackTshirt from '../assets/products/women-black-tshirt.jpg'

// المقاسات المتاحة
export const sizes = [
  { id: 'xs', name: 'XS' },
  { id: 's', name: 'S' },
  { id: 'm', name: 'M' },
  { id: 'l', name: 'L' },
  { id: 'xl', name: 'XL' },
  { id: 'xxl', name: 'XXL' }
]

// الألوان المتاحة
export const colors = [
  { id: 'white', name: 'أبيض', hex: '#FFFFFF' },
  { id: 'black', name: 'أسود', hex: '#000000' },
  { id: 'gray', name: 'رمادي', hex: '#808080' },
  { id: 'navy', name: 'كحلي', hex: '#1e3a8a' },
  { id: 'red', name: 'أحمر', hex: '#dc2626' },
  { id: 'green', name: 'أخضر', hex: '#16a34a' },
  { id: 'blue', name: 'أزرق', hex: '#2563eb' },
  { id: 'pink', name: 'وردي', hex: '#ec4899' }
]

// المحافظات والمدن
export const governorates = [
  {
    id: 'cairo',
    name: 'القاهرة',
    cities: [
      { id: 'nasr_city', name: 'مدينة نصر' },
      { id: 'heliopolis', name: 'مصر الجديدة' },
      { id: 'maadi', name: 'المعادي' },
      { id: 'zamalek', name: 'الزمالك' },
      { id: 'downtown', name: 'وسط البلد' }
    ]
  },
  {
    id: 'giza',
    name: 'الجيزة',
    cities: [
      { id: 'dokki', name: 'الدقي' },
      { id: 'mohandessin', name: 'المهندسين' },
      { id: 'haram', name: 'الهرم' },
      { id: 'october', name: '6 أكتوبر' },
      { id: 'sheikh_zayed', name: 'الشيخ زايد' }
    ]
  },
  {
    id: 'alexandria',
    name: 'الإسكندرية',
    cities: [
      { id: 'miami', name: 'ميامي' },
      { id: 'stanley', name: 'ستانلي' },
      { id: 'sidi_gaber', name: 'سيدي جابر' },
      { id: 'smouha', name: 'سموحة' },
      { id: 'montaza', name: 'المنتزه' }
    ]
  }
]

// بيانات المنتجات
export const products = [
  {
    id: 1,
    name: 'تيشرت رجالي أبيض كلاسيكي',
    price: 299,
    category: 'men',
    images: [menWhiteTshirt1, menWhiteTshirt2, menWhiteTshirt1, menWhiteTshirt2],
    description: 'تيشرت رجالي أبيض عالي الجودة مصنوع من القطن الخالص. مريح ومناسب للاستخدام اليومي.',
    availableSizes: ['s', 'm', 'l', 'xl', 'xxl'],
    availableColors: ['white', 'black', 'gray', 'navy'],
    defaultSize: 'm',
    defaultColor: 'white'
  },
  {
    id: 2,
    name: 'تيشرت رجالي أخضر',
    price: 349,
    category: 'men',
    images: [menGreenTshirt, menGreenTshirt, menGreenTshirt, menGreenTshirt],
    description: 'تيشرت رجالي أخضر أنيق بتصميم عصري. مثالي للإطلالات الكاجوال.',
    availableSizes: ['s', 'm', 'l', 'xl'],
    availableColors: ['green', 'black', 'navy', 'gray'],
    defaultSize: 'm',
    defaultColor: 'green'
  },
  {
    id: 3,
    name: 'تيشرت رجالي أزرق',
    price: 279,
    category: 'men',
    images: [menBlueTshirt, menBlueTshirt, menBlueTshirt, menBlueTshirt],
    description: 'تيشرت رجالي أزرق بتصميم بسيط وأنيق. جودة عالية وراحة فائقة.',
    availableSizes: ['xs', 's', 'm', 'l', 'xl'],
    availableColors: ['blue', 'black', 'white', 'gray'],
    defaultSize: 'm',
    defaultColor: 'blue'
  },
  {
    id: 4,
    name: 'تيشرت حريمي أبيض',
    price: 259,
    category: 'women',
    images: [womenWhiteTshirt, womenWhiteTshirt, womenWhiteTshirt, womenWhiteTshirt],
    description: 'تيشرت حريمي أبيض ناعم ومريح. تصميم أنثوي جذاب ومناسب لجميع المناسبات.',
    availableSizes: ['xs', 's', 'm', 'l', 'xl'],
    availableColors: ['white', 'black', 'pink', 'gray'],
    defaultSize: 's',
    defaultColor: 'white'
  },
  {
    id: 5,
    name: 'تيشرت حريمي وردي',
    price: 329,
    category: 'women',
    images: [womenPinkTshirt, womenPinkTshirt, womenPinkTshirt, womenPinkTshirt],
    description: 'تيشرت حريمي وردي بتصميم عصري وجذاب. مثالي للإطلالات الأنثوية.',
    availableSizes: ['xs', 's', 'm', 'l'],
    availableColors: ['pink', 'white', 'black', 'red'],
    defaultSize: 's',
    defaultColor: 'pink'
  },
  {
    id: 6,
    name: 'تيشرت حريمي متعدد الألوان',
    price: 389,
    category: 'women',
    images: [womenMulticolorTshirt, womenMulticolorTshirt, womenMulticolorTshirt, womenMulticolorTshirt],
    description: 'مجموعة تيشرتات حريمي بألوان متنوعة. جودة ممتازة وتصاميم عملية.',
    availableSizes: ['xs', 's', 'm', 'l', 'xl'],
    availableColors: ['black', 'white', 'gray', 'navy', 'green'],
    defaultSize: 's',
    defaultColor: 'black'
  },
  {
    id: 7,
    name: 'تيشرت حريمي أسود أنيق',
    price: 289,
    category: 'women',
    images: [womenBlackTshirt, womenBlackTshirt, womenBlackTshirt, womenBlackTshirt],
    description: 'تيشرت حريمي أسود أنيق بتصميم كلاسيكي. مثالي للمناسبات الرسمية واليومية.',
    availableSizes: ['xs', 's', 'm', 'l', 'xl'],
    availableColors: ['black', 'white', 'gray', 'navy'],
    defaultSize: 's',
    defaultColor: 'black'
  }
]

